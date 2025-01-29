import Elysia from "elysia";
import consola from "consola";
import { createVerifier, VerifierAsync } from "fast-jwt";
import HttpStatus from "../interface/http-status";
import { HttpError, noPermission } from "../errors";

interface User {
  sub: string;
  name: string;
  given_name: string;
  family_name: string;
  preferred_username: string;
  email: string;
  roles: string[];
  [key: string]: any;
}

class KeycloakVerifier {
  static #verifier: typeof VerifierAsync;

  static async verify(token: string) {
    if (!this.#verifier) {
      const response = await fetch(`${process.env.AUTH_REALM_URL}`);
      const result = await response.json();

      this.#verifier = createVerifier({
        key: async () =>
          `-----BEGIN PUBLIC KEY-----\n${result["public_key"]}\n-----END PUBLIC KEY-----`,
      });
    }

    return await this.#verifier(token).catch((e) => consola.warn(e));
  }
}

export function auth() {
  return new Elysia({ name: "auth" })
    .derive({ as: "global" }, async function deriveAuth({ headers }) {
      const auth = headers["authorization"];
      const bearer = auth?.startsWith("Bearer ") ? auth.slice(7) : null;

      if (!bearer) return;

      return { bearer, user: await KeycloakVerifier.verify(bearer) };
    })
    .macro(({ onBeforeHandle }) => ({
      security(opts: { enabled: boolean; roles?: string[] }) {
        if (opts.enabled) {
          onBeforeHandle(authHandle(opts.roles));
        }
      },
    }));
}

export function authHandle(roles?: string[]) {
  return (ctx: { bearer?: string; user?: User }) => {
    if (!ctx.bearer) {
      throw new HttpError(HttpStatus.FORBIDDEN, "Auth required.");
    }

    if (!ctx.user) {
      throw new HttpError(HttpStatus.UNAUTHORIZED, "Auth failed.");
    }

    if (roles?.length && !roles?.some((r) => ctx.user?.roles?.includes(r))) {
      noPermission();
    }
  };
}

import Elysia from "elysia";
import { createVerifier, VerifierAsync } from "fast-jwt";
import { HttpError, noPermission } from "../errors";
import HttpStatus from "../errors/http-status";

interface User {
  sub: string;
  name: string;
  given_name: string;
  family_name: string;
  preferred_username: string;
  email: string;
  roles: string[];
}

let jwtVerify: typeof VerifierAsync | null = null;

async function keycloakAuth(token: string) {
  if (!jwtVerify) {
    const response = await fetch(`${process.env.AUTH_REALM_URL}`, {
      headers: { ["Authorization"]: `Bearer ${token}` },
    });
    const result = await response.json();

    jwtVerify = createVerifier({
      key: async () =>
        `-----BEGIN PUBLIC KEY-----\n${result["public_key"]}\n-----END PUBLIC KEY-----`,
    });
  }

  return await jwtVerify(token);
}

export function auth() {
  return new Elysia({ name: "auth" }).derive(
    { as: "global" },
    async function deriveAuth({ headers }) {
      const auth = headers["authorization"];
      const bearer = auth?.startsWith("Bearer ") ? auth.slice(7) : null;

      if (!bearer) return;

      return { bearer, user: await keycloakAuth(bearer) };
    },
  );
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

import Elysia from "elysia";
import { createDecoder } from "fast-jwt";
import { HttpError, noPermission } from "../errors";
import HttpStatus from "../errors/http-status";

const jwtDecode = createDecoder();

interface User {
  sub: string;
  name: string;
  given_name: string;
  family_name: string;
  preferred_username: string;
  email: string;
  roles: string[];
}

async function keycloakAuth(token: string) {
  const response = await fetch(
    `${process.env.AUTH_REALM_URL}/protocol/openid-connect/userinfo`,
    { headers: { ["Authorization"]: `Bearer ${token}` } },
  );

  if (response.ok) {
    return jwtDecode(token) as User;
  }
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

import Elysia, { t } from "elysia";
import { auth } from "../middlewares/auth";

export const greetRoute = new Elysia({ name: "greet", prefix: "api/v1/greet" })
  .use(auth())
  .get("/", (_ctx) => ({ message: "Hello from Elysia" }), {
    authRequired: true,
    authRoles: [],
  })
  .post("/", ({ body }) => body, {
    body: t.Object({
      username: t.String(),
      password: t.Optional(
        t.String({
          examples: ["example1", "example2"],
        }),
      ),
    }),
  });

import Elysia, { t } from "elysia";
import { auth } from "../middlewares/auth";

export const greetRoute = new Elysia({ name: "greet", prefix: "api/v1/hello" })
  .use(auth())
  .get("/", (_) => ({ message: "Hello from Elysia" }), {
    security: {
      enabled: true,
      roles: [],
    },
  })
  .post("/", ({ body }) => `Hello ${body.subject}`, {
    body: t.Object({
      subject: t.String(),
    }),
  });

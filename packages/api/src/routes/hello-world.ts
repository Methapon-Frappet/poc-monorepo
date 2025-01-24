import Elysia, { t } from "elysia";
import { auth, authHandle } from "../middlewares/auth";

export const greetRoute = new Elysia({ name: "greet", prefix: "api/v1/greet" })
  .use(auth())
  .get(
    "/",
    (_ctx) => {
      // NOTE: do some thing...

      return {
        message: "Hello from Elysia",
      };
    },
    {
      // beforeHandle: [authHandle()],
      response: t.Object({ message: t.String() }),
    },
  )
  .post(
    "/",
    ({ body }) => {
      return body;
    },
    {
      body: t.Object({
        username: t.String(),
        password: t.Optional(t.String()),
      }),
    },
  );

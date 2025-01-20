import Elysia from "elysia";
import { auth, authHandle } from "../middlewares/auth";

export const greetRoute = new Elysia({ name: "greet", prefix: "api/v1/greet" })
  .use(auth())
  .get(
    "/",
    (_ctx) => {
      // NOTE: do some thing...

      return "Hello from Elysia";
    },
    { beforeHandle: [authHandle()] },
  );

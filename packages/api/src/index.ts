import { Elysia } from "elysia";
import { swagger } from "@elysiajs/swagger";
import cors from "@elysiajs/cors";

import consola from "consola";

import { HttpError } from "./errors";
import { helloRoute } from "./routes/hello-world";

const SWAGGER_OPTIONS = {
  documentation: {
    components: {
      securitySchemes: {
        bearerAuth: {
          type: "http",
          scheme: "bearer",
          bearerFormat: "JWT",
        },
      },
    },
  },
} as const;

const app = new Elysia()
  .error("HTTP_ERROR", HttpError)
  .onError(({ code, error, set }) => {
    switch (code) {
      case "HTTP_ERROR":
        set.status = error.status;

        consola.error(error.stack);

        return JSON.parse(error.message);
      case "VALIDATION":
        set.status = error.status;

        consola.warn(error.stack);

        return JSON.parse(error.message);

      case "NOT_FOUND":
        set.status = error.status;

        consola.warn(error.stack);

        return error.message;
      default:
        return error;
    }
  })
  .use(swagger(SWAGGER_OPTIONS))
  .use(cors())
  .use(helloRoute)
  .listen(process.env.APP_PORT || 3000, (server) =>
    console.log(`🦊 Elysia is running at ${server?.hostname}:${server?.port}`),
  );

export type App = typeof app;

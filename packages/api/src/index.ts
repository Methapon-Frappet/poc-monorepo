import { Elysia } from "elysia";
import { swagger } from "@elysiajs/swagger";
import cors from "@elysiajs/cors";
import { greetRoute } from "./routes/hello-world";
import { HttpError } from "./errors";

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

        return { message: error.message };
      case "VALIDATION":
        set.status = error.status;

        return JSON.parse(error.message);
      default:
        return error;
    }
  })
  .use(swagger(SWAGGER_OPTIONS))
  .use(cors())
  .use(greetRoute)
  .listen(3000, (server) =>
    console.log(`🦊 Elysia is running at ${server?.hostname}:${server?.port}`),
  );

export type App = typeof app;

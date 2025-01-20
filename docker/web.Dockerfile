FROM oven/bun AS build

WORKDIR /app

COPY . .

RUN bun install --filter "web"

ENV NODE_ENV=production
ENV VITE_API_URL=ENV_API_URL

RUN bun run --filter 'web' build

FROM alpine AS web

WORKDIR /app

RUN apk add miniserve --repository=https://dl-cdn.alpinelinux.org/alpine/edge/community

COPY --from=build /app/packages/web/dist .
COPY --from=build /app/packages/web/entrypoint.sh ./entrypoint.sh

RUN chmod u+x ./entrypoint.sh

EXPOSE 8080

ENTRYPOINT ["./entrypoint.sh"]

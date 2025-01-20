FROM oven/bun AS base

WORKDIR /app

COPY . .

RUN bun install

ENV NODE_ENV=production

# Build API
FROM base AS build-api
RUN bun build \
  --compile \
  --minify-whitespace \
  --minify-syntax \
  --target bun \
  --outfile server \
  ./packages/api/src/index.ts

# API
FROM gcr.io/distroless/base AS api

WORKDIR /app

COPY --from=build-api /app/server server

ENV NODE_ENV=production

EXPOSE 3000

CMD ["./server"]

# Build Web
FROM base AS build-web

ENV VITE_API_URL=ENV_API_URL

RUN bun run --filter 'web' build

# Web
FROM alpine AS web

WORKDIR /app

RUN apk add miniserve --repository=https://dl-cdn.alpinelinux.org/alpine/edge/community

COPY --from=build-web /app/packages/web/dist .
COPY --from=build-web /app/packages/web/entrypoint.sh ./entrypoint.sh

RUN chmod u+x ./entrypoint.sh

EXPOSE 8080

ENTRYPOINT ["./entrypoint.sh"]

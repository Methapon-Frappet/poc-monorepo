FROM oven/bun AS build

WORKDIR /app

COPY . .

RUN bun install --filter "api"

ENV NODE_ENV=production

RUN bun build \
  --compile \
  --minify-whitespace \
  --minify-syntax \
  --target bun \
  --outfile server \
  ./packages/api/src/index.ts

FROM gcr.io/distroless/base AS api

WORKDIR /app

COPY --from=build /app/server server

ENV NODE_ENV=production

EXPOSE 3000

CMD ["./server"]

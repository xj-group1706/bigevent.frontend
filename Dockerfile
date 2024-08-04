FROM node:lts-alpine as builder

RUN corepack enable

WORKDIR /app

COPY package.json pnpm-lock.yaml ./

RUN --mount=type=cache,id=pnpm,target=/root/.local/share/pnpm/store pnpm fetch
RUN --mount=type=cache,id=pnpm,target=/root/.local/share/pnpm/store pnpm install

COPY . .

RUN pnpm run build

FROM node:20-alpine as runner

WORKDIR /app

COPY --from=builder /app/.output /app/.output

EXPOSE 3000

CMD ["node", ".output/server/index.mjs"]

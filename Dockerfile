FROM node:22-bookworm-slim AS deps
WORKDIR /app

RUN mkdir -p apps/web libs/mopidy

COPY package.json package-lock.json ./
COPY apps/web/package.json ./apps/web/package.json
COPY libs/mopidy/package.json ./libs/mopidy/package.json

RUN npm ci

FROM node:22-bookworm-slim AS builder
WORKDIR /app

ENV NEXT_TELEMETRY_DISABLED=1

COPY --from=deps /app/node_modules ./node_modules
COPY . .

RUN npm run build -w apps/web

FROM node:22-bookworm-slim AS runner
WORKDIR /app

ENV NODE_ENV=production \
    PORT=3000 \
    HOSTNAME=0.0.0.0 \
    NEXT_TELEMETRY_DISABLED=1

COPY --from=builder /app/apps/web/.next/standalone ./
COPY --from=builder /app/apps/web/public ./apps/web/public
COPY --from=builder /app/apps/web/.next/static ./apps/web/.next/static

EXPOSE 3000

CMD ["node", "apps/web/server.js"]

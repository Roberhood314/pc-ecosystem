FROM node:22-alpine AS builder
WORKDIR /app
RUN apk add --no-cache unzip && corepack enable && corepack prepare pnpm@10.15.1 --activate
COPY app-source.b64 /tmp/app-source.b64
RUN base64 -d /tmp/app-source.b64 > /tmp/app-source.zip  && unzip -q /tmp/app-source.zip -d /app  && rm -f /tmp/app-source.b64 /tmp/app-source.zip
RUN pnpm install --frozen-lockfile
ENV NEXT_TELEMETRY_DISABLED=1
RUN pnpm build

FROM node:22-alpine AS runner
WORKDIR /app
RUN corepack enable && corepack prepare pnpm@10.15.1 --activate
ENV NODE_ENV=production
ENV NEXT_TELEMETRY_DISABLED=1
ENV PORT=3000
COPY --from=builder /app /app
EXPOSE 3000
CMD ["pnpm","start","--","-H","0.0.0.0","-p","3000"]

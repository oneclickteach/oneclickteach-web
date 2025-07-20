# ======================= Base ================================
FROM node:20-alpine AS base

WORKDIR /app

RUN npm install -g pnpm@latest

# ======================= Dependencies ========================
FROM base AS deps

COPY package.json pnpm-lock.yaml ./

RUN pnpm install --frozen-lockfile

# ======================= Build ===============================
FROM deps AS builder

ENV NODE_ENV=production

COPY . .

RUN pnpm run build

# ======================= Production ==========================
FROM node:20-alpine AS production

WORKDIR /app

RUN npm install -g pnpm@latest

ENV NODE_ENV=production

COPY --from=deps /app/node_modules ./node_modules
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/public ./public
COPY package.json ./

CMD ["pnpm", "start"]

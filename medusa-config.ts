import { defineConfig, loadEnv } from "@medusajs/framework/utils"

loadEnv(process.env.NODE_ENV || "development", process.cwd())

const isProduction = process.env.NODE_ENV === "production"
const databaseUrl = process.env.DATABASE_URL?.trim()
const redisUrl = process.env.REDIS_URL?.trim()
const workerMode =
  (process.env.MEDUSA_WORKER_MODE as "shared" | "worker" | "server" | undefined) ||
  "shared"

const requireEnv = (name: string, value?: string) => {
  if (value) {
    return value
  }

  if (isProduction) {
    throw new Error(`${name} is required in production`)
  }

  return undefined
}

const modules = [
  ...(redisUrl
    ? [
        {
          resolve: "@medusajs/cache-redis",
          key: "cache-redis",
          options: { redisUrl },
        },
        {
          resolve: "@medusajs/event-bus-redis",
          key: "event-bus-redis",
          options: { redisUrl },
        },
      ]
    : []),
  { 
    resolve: "./src/modules/lookup",
    key: "lookup-module"
  },
  { 
    resolve: "./src/modules/mapping",
    key: "mapping-module"
  },
  { 
    resolve: "./src/modules/combination",
    key: "combination-module"
  },
]

export default defineConfig({
  projectConfig: {
    databaseUrl: requireEnv("DATABASE_URL", databaseUrl),
    databaseExtra: {
      ssl: isProduction ? { rejectUnauthorized: false } : false,
    },
    redisUrl,
    workerMode,
    http: {
      jwtSecret: requireEnv("JWT_SECRET", process.env.JWT_SECRET) || "supersecret",
      cookieSecret:
        requireEnv("COOKIE_SECRET", process.env.COOKIE_SECRET) ||
        "supersecret",
      storeCors:
        process.env.STORE_CORS ||
        "http://localhost:8000,https://docs.medusajs.com",
      adminCors:
        process.env.ADMIN_CORS ||
        "http://localhost:5173,http://localhost:9000,https://docs.medusajs.com",
      authCors:
        process.env.AUTH_CORS ||
        "http://localhost:5173,http://localhost:9000,https://docs.medusajs.com",
    },
  },
  modules,
})
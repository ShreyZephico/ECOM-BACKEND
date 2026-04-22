import { loadEnv, defineConfig } from '@medusajs/framework/utils'

loadEnv(process.env.NODE_ENV || 'development', process.cwd())

module.exports = defineConfig({
  projectConfig: {
    databaseUrl: process.env.DATABASE_URL,
    redisUrl: process.env.REDIS_URL,
    workerMode: process.env.MEDUSA_WORKER_MODE || "shared",  // Added default value
    jwtSecret: process.env.JWT_SECRET || "supersecret",      // :white_check_mark: MOVED to projectConfig level
    cookieSecret: process.env.COOKIE_SECRET || "supersecret", // :white_check_mark: MOVED to projectConfig level
    http: {
      storeCors: process.env.STORE_CORS!,
      adminCors: process.env.ADMIN_CORS!,
      authCors: process.env.AUTH_CORS!,
    },
  },
  admin: {
    disable: process.env.DISABLE_MEDUSA_ADMIN === "true",
  },
  modules: [
    // :white_check_mark: ADDED cache-redis module (you were missing this!)
    {
      resolve: "@medusajs/medusa/cache-redis",
      options: {
        redisUrl: process.env.REDIS_URL,
      },
    },
    {
      resolve: "@medusajs/medusa/event-bus-redis",
      options: {
        redisUrl: process.env.REDIS_URL,
      },
    },
    { resolve: "./src/modules/lookup" },
    { resolve: "./src/modules/mapping" },
    { resolve: "./src/modules/combination" },
  ],
})

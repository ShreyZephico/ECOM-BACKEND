import { loadEnv, defineConfig } from '@medusajs/framework/utils'

loadEnv(process.env.NODE_ENV || 'development', process.cwd())

module.exports = defineConfig({
  projectConfig: {
    databaseUrl: process.env.DATABASE_URL,       // ✅ camelCase
    redisUrl: process.env.REDIS_URL,             // ✅ camelCase

    http: {
      storeCors: process.env.STORE_CORS || "*",  // ✅ camelCase
      adminCors: process.env.ADMIN_CORS || "*",  // ✅ camelCase
      authCors: process.env.AUTH_CORS || "*",    // ✅ camelCase
      jwtSecret: process.env.JWT_SECRET || "supersecret",       // ✅ moved inside http
      cookieSecret: process.env.COOKIE_SECRET || "supersecret", // ✅ moved inside http
    },
  },

  modules: [
    {
      resolve: "@medusajs/medusa/event-bus-redis",
      options: {
        redisUrl: process.env.REDIS_URL,
      },
    },
    // Your existing custom modules
    { resolve: "./src/modules/lookup" },
    { resolve: "./src/modules/mapping" },
    { resolve: "./src/modules/combination" },
  ],
})

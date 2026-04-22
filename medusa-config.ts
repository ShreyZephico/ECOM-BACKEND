import { loadEnv, defineConfig } from '@medusajs/framework/utils'

loadEnv(process.env.NODE_ENV || 'development', process.cwd())

module.exports = defineConfig({
  projectConfig: {
    database_url: process.env.DATABASE_URL,
    redis_url: process.env.REDIS_URL,

    http: {
      store_cors: process.env.STORE_CORS || "*",
      admin_cors: process.env.ADMIN_CORS || "*",
      auth_cors: process.env.AUTH_CORS || "*",
    },

    jwt_secret: process.env.JWT_SECRET || "supersecret",
    cookie_secret: process.env.COOKIE_SECRET || "supersecret",
  },

  modules: [
    // :white_check_mark: ADD THESE TWO REDIS MODULES
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
    // Your existing custom modules
    { resolve: "./src/modules/lookup" },
    { resolve: "./src/modules/mapping" },
    { resolve: "./src/modules/combination" },
  ],
})

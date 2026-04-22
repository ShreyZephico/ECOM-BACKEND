import type { ExecArgs } from "@medusajs/framework/types"

export default async function seedDemoData({ container }: ExecArgs) {
  const logger = container.resolve("logger")

  logger.info(
    "Seed script is intentionally empty. Add version-compatible seed logic before using `npm run seed`."
  )
}

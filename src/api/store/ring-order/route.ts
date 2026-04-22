import type { MedusaRequest, MedusaResponse } from "@medusajs/framework/http"
import { createJewelryOrderWorkflow } from "../../../workflows/order-workflow"

export async function POST(req: MedusaRequest, res: MedusaResponse) {
    console.log("BODY:", JSON.stringify(req.body, null, 2))
    const { result } = await createJewelryOrderWorkflow(req.scope).run({
    input: {
      email: req.body.email,
      full_name: req.body.full_name,
      phone_number: req.body.phone_number,

      // ✅ FIX: pass items array
      items: req.body.items,

      currency_code: req.body.currency_code || "usd",
      shipping_address: req.body.shipping_address,
    },
  })
  console.log("REQ BODY:", JSON.stringify(req.body, null, 2))
  res.json({ order: result.order })
}
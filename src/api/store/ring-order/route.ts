import type { MedusaRequest, MedusaResponse } from "@medusajs/framework/http"
import { createJewelryOrderWorkflow } from "../../../workflows/order-workflow"

type RingOrderRequestBody = {
  email: string
  full_name: string
  phone_number: string
  items: {
    product_name: string
    product_images: string[]
    size: string
    metal: string
    diamond: unknown
    quantity: number
    unit_price: number
  }[]
  currency_code?: string
  shipping_address: {
    first_name: string
    last_name: string
    address_1: string
    address_2?: string
    city: string
    province?: string
    postal_code: string
    country_code: string
    phone?: string
  }
}

export async function POST(req: MedusaRequest, res: MedusaResponse) {
  const body = req.body as RingOrderRequestBody

  console.log("BODY:", JSON.stringify(body, null, 2))

  const { result } = await createJewelryOrderWorkflow(req.scope).run({
    input: {
      email: body.email,
      full_name: body.full_name,
      phone_number: body.phone_number,
      items: body.items,
      currency_code: body.currency_code || "usd",
      shipping_address: body.shipping_address,
    },
  })

  console.log("REQ BODY:", JSON.stringify(body, null, 2))

  res.json({ order: result.order })
}

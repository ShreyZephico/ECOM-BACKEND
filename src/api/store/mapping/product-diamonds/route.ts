import { MedusaRequest, MedusaResponse } from "@medusajs/framework/http"

type Body = {
  product_id: string
  diamond_id: string
  stock?: number
  price_adjustment?: number
}

export async function POST(
  req: MedusaRequest<Body>,
  res: MedusaResponse
) {
  const mappingService = req.scope.resolve("mapping")

  const { product_id, diamond_id, stock = 0, price_adjustment = 0 } = req.body

  if (!product_id || !diamond_id) {
    return res.status(400).json({ message: "product_id and diamond_id required" })
  }

  const created = await mappingService.createProductDiamonds([
    {
      product_id,
      diamond_id,
      stock,
      price_adjustment,
    },
  ])

  res.json({ product_diamond: created[0] })
}

export async function GET(req: MedusaRequest, res: MedusaResponse) {
  const query = req.scope.resolve("query")

  const { product_id } = req.query

  const { data } = await query.graph({
    entity: "product_diamonds",
    fields: [
      "*",
      "diamonds.*", 
      "product.*", 
    ],
    ...(product_id && {
      filters: { product_id },
    }),
  })

  res.json({ product_diamonds: data })
}
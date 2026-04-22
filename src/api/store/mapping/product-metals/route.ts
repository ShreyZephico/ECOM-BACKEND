import { MedusaRequest, MedusaResponse } from "@medusajs/framework/http"

type Body = {
    product_id: string
    metal_id: string
    stock?: number
    price_adjustment?: number
}

export async function POST(
    req: MedusaRequest<Body>,
    res: MedusaResponse
) {
    const mappingService = req.scope.resolve("mapping")

    const { product_id, metal_id, stock = 0, price_adjustment = 0 } = req.body

    if (!product_id || !metal_id) {
        return res.status(400).json({ message: "product_id and metal_id required" })
    }

    const created = await mappingService.createProductMetals([
        {
            product_id,
            metal_id,
            stock,
            price_adjustment,
        },
    ])

    res.json({ product_metal: created[0] })
}

export async function GET(req: MedusaRequest, res: MedusaResponse) {
    const query = req.scope.resolve("query")

    const { product_id } = req.query

    const { data } = await query.graph({
        entity: "product_metals",
        fields: [
            "*",
            "metals.*",
            "product.*",
        ],
        ...(product_id && {
            filters: { product_id },
        }),
    })

    res.json({ product_metals: data })
}
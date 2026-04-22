import { MedusaRequest, MedusaResponse } from "@medusajs/framework/http"

// =========================
// 🔥 GENERATE VARIANTS
// =========================
export async function POST(req: MedusaRequest, res: MedusaResponse) {
  const query = req.scope.resolve("query")
  const combinationService = req.scope.resolve("combination")
  const productService = req.scope.resolve("product")

  const { product_id } = req.body

  if (!product_id) {
    return res.status(400).json({
      message: "product_id is required",
    })
  }

  // =========================
  // 1️⃣ Fetch mappings
  // =========================
  const { data: sizes } = await query.graph({
    entity: "product_sizes",
    fields: ["*"],
    filters: { product_id },
  })

  const { data: metals } = await query.graph({
    entity: "product_metals",
    fields: ["*"],
    filters: { product_id },
  })

  const { data: diamonds } = await query.graph({
    entity: "product_diamonds",
    fields: ["*"],
    filters: { product_id },
  })

  if (!sizes.length || !metals.length || !diamonds.length) {
    return res.json({
      message: "No mappings found to generate variants",
      count: 0,
    })
  }

  // =========================
  // 2️⃣ Generate combinations
  // =========================
  const variants: any[] = []

  for (const s of sizes) {
    for (const m of metals) {
      for (const d of diamonds) {

        const price =
          (s.price_adjustment || 0) +
          (m.price_adjustment || 0) +
          (d.price_adjustment || 0)

        const stock = Math.min(
          s.stock || 0,
          m.stock || 0,
          d.stock || 0
        )

        // =========================
        // 3️⃣ Create Medusa Variant
        // =========================
        const medusaVariant = await productService.createProductVariants([
          {
            product_id,

            title: `Size ${s.size_id} / ${m.metal_id} / ${d.diamond_id}`,

            prices: [
              {
                amount: price,
                currency_code: "inr",
              },
            ],

            inventory_quantity: stock,
          },
        ])

        // =========================
        // 4️⃣ Store custom variant
        // =========================
        variants.push({
          product_id,
          size_id: s.size_id,
          metal_id: m.metal_id,
          diamond_id: d.diamond_id,
          price,
          stock,
          medusa_variant_id: medusaVariant[0].id,
        })
      }
    }
  }

  // =========================
  // 5️⃣ Save to DB
  // =========================
  const created = await combinationService.createCustoProductVariants(variants)

  res.json({
    message: "Variants generated",
    count: created.length,
  })
}


// =========================
// 🔥 GET VARIANTS
// =========================
export async function GET(req: MedusaRequest, res: MedusaResponse) {
  const query = req.scope.resolve("query")

  const product_id =
    typeof req.query.product_id === "string"
      ? req.query.product_id
      : undefined


  const { data } = await query.graph({
    entity: "custo_product_variants",
    fields: [
      "*",
      "size.*",
      "metals.*",
      "diamonds.*",
      "product.*",
    ],
  })

  res.json({ product_variants: data })
}
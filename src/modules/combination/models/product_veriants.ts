import { model } from "@medusajs/framework/utils"

const CustoProductVariant  = model.define("custo_product_variants", {
  id: model.id().primaryKey(),

  product_id: model.text(),
  size_id: model.text(),
  metal_id: model.text(),
  diamond_id: model.text(),

  price: model.number(),
  stock: model.number(),
  medusa_variant_id: model.text().nullable(),
})

export default CustoProductVariant 
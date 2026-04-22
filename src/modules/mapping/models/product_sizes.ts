import { model } from "@medusajs/framework/utils"



const ProductSize = model.define("product_size", {
  id: model.id().primaryKey(),

  product_id: model.text(), 

    size_id: model.text(),

  status: model.text().default("active"),
  stock: model.number().default(0),
  price_adjustment: model.number().default(0),
})

export default ProductSize


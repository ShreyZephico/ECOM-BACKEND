import { model } from "@medusajs/framework/utils"



const ProductMetal = model.define("product_metal", {
  id: model.id().primaryKey(),

  product_id: model.text(), 

    metal_id: model.text(),

  status: model.text().default("active"),
  stock: model.number().default(0),
  price_adjustment: model.number().default(0),
})

export default ProductMetal


import { model } from "@medusajs/framework/utils"



const ProductDiamond = model.define("product_diamonds", {
  id: model.id().primaryKey(),

  product_id: model.text(), 

    diamond_id: model.text(),

  status: model.text().default("active"),
  stock: model.number().default(0),
  price_adjustment: model.number().default(0),
})

export default ProductDiamond


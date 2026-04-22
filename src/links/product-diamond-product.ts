import { defineLink } from "@medusajs/framework/utils"
import ProductModule from "@medusajs/medusa/product"
import MappingModule from "../modules/mapping" // default export = Module object

export default defineLink(
  {
    linkable: MappingModule.linkable.productDiamonds,
    field: "product_id",
  },
  ProductModule.linkable.product,
  {
    readOnly: true,
  }
)
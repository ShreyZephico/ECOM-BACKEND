import { defineLink } from "@medusajs/framework/utils"

import ProductModule from "@medusajs/medusa/product"
import CombinationModule from "../modules/combination"
export default defineLink(
  {
    linkable: CombinationModule.linkable.custoProductVariants,
    field: "product_id",
  },
  ProductModule.linkable.product,
  {
    readOnly: true,
  }
)
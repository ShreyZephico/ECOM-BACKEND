// src/links/custo-product-variant-product-variant.ts
import { defineLink } from "@medusajs/framework/utils"
import CombinationModule from "../modules/combination"
import ProductModule from "@medusajs/medusa/product"

export default defineLink(
  {
    linkable: CombinationModule.linkable.custoProductVariants,
    field: "medusa_variant_id", // your field that stores the ProductVariant ID
  },
  ProductModule.linkable.productVariant,
  {
    readOnly: true,
  }
)
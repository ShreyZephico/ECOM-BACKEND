import { defineLink } from "@medusajs/framework/utils"
import CombinationModule from "../modules/combination"
import LookupModule from "../modules/lookup"

export default defineLink(
  {
    linkable: CombinationModule.linkable.custoProductVariants, // fix spelling too
    field: "metal_id",
  },
  LookupModule.linkable.metals, // ✅ CORRECT
  {
    readOnly: true,
  }
)
import { defineLink } from "@medusajs/framework/utils"
import CombinationModule from "../modules/combination"
import LookupModule from "../modules/lookup"

export default defineLink(
  {
    linkable: CombinationModule.linkable.custoProductVariants,
    field: "size_id",
  },
  LookupModule.linkable.size, // ✅ CORRECT
  {
    readOnly: true,
  }
)
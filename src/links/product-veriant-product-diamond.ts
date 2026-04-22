import { defineLink } from "@medusajs/framework/utils"
import CombinationModule from "../modules/combination"
import LookupModule from "../modules/lookup"

export default defineLink(
  {
    linkable: CombinationModule.linkable.custoProductVariants, // fix typo too
    field: "diamond_id",
  },
  LookupModule.linkable.diamonds, // ✅ CORRECT
  {
    readOnly: true,
  }
)
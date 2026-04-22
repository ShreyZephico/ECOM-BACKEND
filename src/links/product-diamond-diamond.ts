import { defineLink } from "@medusajs/framework/utils"
import MappingModule from "../modules/mapping"
import LookupModule from "../modules/lookup"

export default defineLink(
  {
    linkable: MappingModule.linkable.productDiamonds,
    field: "diamond_id",
  },
  LookupModule.linkable.diamonds,
  {
    readOnly: true,
  }
)
import { defineLink } from "@medusajs/framework/utils"
import MappingModule from "../modules/mapping"
import LookupModule from "../modules/lookup"

export default defineLink(
  {
    linkable: MappingModule.linkable.productMetal,
    field: "metal_id",
  },
  LookupModule.linkable.metals,
  {
    readOnly: true,
  }
)
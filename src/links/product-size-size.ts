import { defineLink } from "@medusajs/framework/utils"
import MappingModule from "../modules/mapping"
import LookupModule from "../modules/lookup"

export default defineLink(
  {
    linkable: MappingModule.linkable.productSize,
    field: "size_id",
  },
  LookupModule.linkable.size,
  {
    readOnly: true,
  }
)
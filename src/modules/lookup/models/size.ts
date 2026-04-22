import { model } from "@medusajs/framework/utils"

const Size = model.define("size",{
    id: model.id().primaryKey(),
    size: model.float(),
    mm: model.float(),
})

export default Size
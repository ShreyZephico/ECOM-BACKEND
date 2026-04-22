import {model} from "@medusajs/framework/utils"

const Diamonds = model.define("diamonds",{

    id : model.id().primaryKey(),
    quality:model.text(),
    karets : model.number(),


})

export default Diamonds
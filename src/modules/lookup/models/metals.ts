import {model} from "@medusajs/framework/utils"
import { title } from "process"

const Metals = model.define("metals",{

    id : model.id().primaryKey(),
    title : model.text(),


})

export default Metals
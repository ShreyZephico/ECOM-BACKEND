import { MedusaService } from "@medusajs/framework/utils"
import CustoProductVariant  from "./models/product_veriants"

class CombinationService extends MedusaService({
  CustoProductVariant ,
}) {}

export default CombinationService
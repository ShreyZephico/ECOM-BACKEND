import { MedusaService } from "@medusajs/framework/utils";
import ProductSize from "./models/product_sizes"
import ProductMetal from "./models/product_metals";
import ProductDiamond from "./models/product_diamonds";
class MappingService extends MedusaService({
    ProductSize,
    ProductMetal,
    ProductDiamond
})
{


}

export default MappingService
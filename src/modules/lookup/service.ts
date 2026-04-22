import { MedusaService } from "@medusajs/framework/utils";
import Size from "./models/size"
import Diamonds from "./models/diamonds";
import Metals from "./models/metals";

class LookupService extends MedusaService({
    Size,
    Diamonds,
    Metals,


})
{


}

export default LookupService
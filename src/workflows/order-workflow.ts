import {
  createWorkflow,
  WorkflowResponse,
  createStep,
  StepResponse,
} from "@medusajs/framework/workflows-sdk"
import { Modules } from "@medusajs/framework/utils"

type JewelryOrderInput = {
  email: string
  full_name: string
  phone_number: string

  items: {
    product_name: string
    product_images: string[]
    size: string
    metal: string
    diamond: any
    quantity: number
    unit_price: number
  }[]

  shipping_address: {
    first_name: string
    last_name: string
    address_1: string
    address_2?: string
    city: string
    province?: string
    postal_code: string
    country_code: string
    phone?: string
  }

  currency_code?: string
}

const createJewelryOrderStep = createStep(
  "create-jewelry-order-step",
  async (input: JewelryOrderInput, { container }) => {
    const orderModuleService = container.resolve(Modules.ORDER)

    // ✅ define items BEFORE createOrders
    const items = input.items.map((item) => ({
      title: item.product_name,
      quantity: item.quantity,
      unit_price: item.unit_price,

      metadata: {
        product_images: item.product_images,
        size: item.size,
        metal: item.metal,
        diamond: item.diamond,
        full_name: input.full_name,
        phone_number: input.phone_number,
      },
    }))

    // ✅ now pass items
    const order = await orderModuleService.createOrders({
      currency_code: input.currency_code || "usd",
      email: input.email,

      shipping_address: {
        first_name: input.shipping_address.first_name,
        last_name: input.shipping_address.last_name,
        address_1: input.shipping_address.address_1,
        address_2: input.shipping_address.address_2 || "",
        city: input.shipping_address.city,
        province: input.shipping_address.province || "",
        postal_code: input.shipping_address.postal_code,
        country_code: input.shipping_address.country_code,
        phone: input.phone_number,
      },

      items, // ✅ THIS was missing earlier
      shipping_methods: [],
    })

    return new StepResponse({ order }, order.id)
  },

  async (orderId, { container }) => {
    if (!orderId) return
    const orderModuleService = container.resolve(Modules.ORDER)
    await orderModuleService.softDeleteOrders([orderId])
  }
)

export const createJewelryOrderWorkflow = createWorkflow(
  "create-jewelry-order",
  (input: JewelryOrderInput) => {
    const { order } = createJewelryOrderStep(input)
    return new WorkflowResponse({ order })
  }
)
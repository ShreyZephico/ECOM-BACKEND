import { MedusaRequest, MedusaResponse } from "@medusajs/framework/http"

type CreateSizeBody = {
  size: number
  mm?: number
}

export async function POST(
  req: MedusaRequest<CreateSizeBody>,
  res: MedusaResponse
) {
  const lookupService = req.scope.resolve("lookup")

  const { size, mm } = req.body

  if (size == null) {
    return res.status(400).json({ message: "size is required" })
  }

  const created = await lookupService.createSizes([
    { size, mm },
  ])

  res.json({ size: created[0] })
}

export async function GET(req: MedusaRequest, res: MedusaResponse) {
  const lookupService = req.scope.resolve("lookup")

  const sizes = await lookupService.listSizes()

  res.json({ sizes })
}
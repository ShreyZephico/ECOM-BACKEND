import { MedusaRequest, MedusaResponse } from "@medusajs/framework/http"

type CreateMetalBody = {
  title: string
}

export async function POST(
  req: MedusaRequest<CreateMetalBody>,
  res: MedusaResponse
) {
  const lookupService = req.scope.resolve("lookup")

  const { title } = req.body

  if (!title) {
    return res.status(400).json({ message: "title is required" })
  }

  const created = await lookupService.createMetals([
    { title },
  ])

  res.json({ metal: created[0] })
}

export async function GET(req: MedusaRequest, res: MedusaResponse) {
  const lookupService = req.scope.resolve("lookup")

  const metals = await lookupService.listMetals()

  res.json({ metals })
}
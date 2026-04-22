import { MedusaRequest, MedusaResponse } from "@medusajs/framework/http"

type CreateDiamondBody = {
  quality: string
  karets: number
}

export async function POST(
  req: MedusaRequest<CreateDiamondBody>,
  res: MedusaResponse
) {
  const lookupService = req.scope.resolve("lookup")

  const { quality, karets } = req.body

  if (!quality) {
    return res.status(400).json({ message: "quality is required" })
  }

  if (karets == null) {
    return res.status(400).json({ message: "carats is required" })
  }

  const created = await lookupService.createDiamonds([
    { quality, karets },
  ])

  res.json({ diamond: created[0] })
}

export async function GET(req: MedusaRequest, res: MedusaResponse) {
  const lookupService = req.scope.resolve("lookup")

  const diamonds = await lookupService.listDiamonds()

  res.json({ diamonds })
}
import { NextResponse } from "next/server"
import { getBloodBankStock } from "@/app/actions/bloodbank"

export async function POST(req) {
  const { hospitalId } = await req.json()
  if (!hospitalId) return NextResponse.json({ error: "Missing hospitalId" }, { status: 400 })
  const stocks = await getBloodBankStock(hospitalId)
  return NextResponse.json(stocks)
}

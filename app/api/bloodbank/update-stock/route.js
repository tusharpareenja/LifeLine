import { NextResponse } from "next/server"
import { updateBloodStock } from "@/app/actions/bloodbank"

export async function POST(req) {
  const { hospitalId, bloodType, quantity } = await req.json()
  if (!hospitalId || !bloodType || typeof quantity !== "number") {
    return NextResponse.json({ error: "Missing fields" }, { status: 400 })
  }
  const updated = await updateBloodStock({ hospitalId, bloodType, quantity })
  return NextResponse.json(updated)
}

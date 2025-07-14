import { NextResponse } from "next/server"
import { notifyDonors } from "@/app/actions/bloodbank"

export async function POST(req) {
  const { hospitalId, bloodType } = await req.json()
  if (!hospitalId || !bloodType) {
    return NextResponse.json({ error: "Missing fields" }, { status: 400 })
  }
  const result = await notifyDonors({ hospitalId, bloodType })
  return NextResponse.json(result)
}

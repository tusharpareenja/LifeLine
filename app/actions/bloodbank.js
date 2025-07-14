"use server"
import prisma from "@/app/db/db"

// Get all blood group stocks for a hospital
export async function getBloodBankStock(hospitalId) {
  return await prisma.bloodBankStock.findMany({
    where: { hospitalId },
    orderBy: { bloodType: "asc" },
  })
}

// Map display blood type (e.g. "A+") to Prisma enum (e.g. "A_POSITIVE")
const BLOOD_TYPE_MAP = {
  "A+": "A_POSITIVE",
  "A-": "A_NEGATIVE",
  "B+": "B_POSITIVE",
  "B-": "B_NEGATIVE",
  "O+": "O_POSITIVE",
  "O-": "O_NEGATIVE",
  "AB+": "AB_POSITIVE",
  "AB-": "AB_NEGATIVE",
}

// Add a new blood group stock for a hospital
export async function addBloodStock({ hospitalId, bloodType, quantity, threshold = 5 }) {
  // Accept both display and enum values for bloodType
  let enumType = bloodType
  if (BLOOD_TYPE_MAP[bloodType]) {
    enumType = BLOOD_TYPE_MAP[bloodType]
  }
  const created = await prisma.bloodBankStock.create({
    data: { hospitalId, bloodType: enumType, quantity, threshold },
  })
  return created
}

// Update the stock for a specific blood group in a hospital (or create if not exists)
export async function updateBloodStock({ hospitalId, bloodType, quantity, threshold }) {
  const updated = await prisma.bloodBankStock.upsert({
    where: {
      hospitalId_bloodType: {
        hospitalId,
        bloodType,
      },
    },
    update: threshold !== undefined ? { quantity, threshold } : { quantity },
    create: { hospitalId, bloodType, quantity, threshold: threshold ?? 5 },
  })
  return updated
}

// Send notification to all patients of a given blood type (simulate message sending)
export async function notifyDonors({ bloodType, hospitalId }) {
  // Find all patients with the given blood type
  const patients = await prisma.patient.findMany({
    where: {
      bloodType,
      hospitalId,
    },
    include: {
      user: true,
    },
  })

  // Simulate sending a message (replace with real SMS/email integration as needed)
  for (const patient of patients) {
    // Example: sendEmail(patient.user.email, ...)
    // Example: sendSMS(patient.phone, ...)
    // For now, just log
    console.log(`Notify ${patient.user.email || patient.phone || patient.name} about urgent need for ${bloodType}`)
  }

  return { count: patients.length }
}

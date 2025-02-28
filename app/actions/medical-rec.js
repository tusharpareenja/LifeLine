// app/actions/medical-record.ts
"use server";

import { revalidatePath } from "next/cache";
import db from "../db/db";


// Create a new medical record
export async function createMedicalRecord(data) {
  try {
    
    // Verify doctor has permission to create records
    if (data.doctorId) {
      const doctor = await db.doctor.findUnique({
        where: { id: data.doctorId },
        select: { userId: true }
      });

      if (!doctor || doctor.userId !== session.user.id) {
        return { success: false, error: "Unauthorized to create medical records" };
      }
    }

    // Create medical record
    const recordData = {
      diagnosis: data.diagnosis,
      prescription: data.prescription,
      reportUrl: data.reportUrl,
      consultationDate: data.consultationDate ? new Date(data.consultationDate) : new Date(),
      patient: {
        connect: { id: data.patientId }
      }
    };

    // Add doctor if provided
    if (data.doctorId) {
      recordData.doctor = {
        connect: { id: data.doctorId }
      };
    }

    // Add hospital if provided
    if (data.hospitalId) {
      const hospital = await db.hospital.findUnique({
        where: { id: data.hospitalId }
      });

      if (!hospital) {
        return { success: false, error: "Hospital not found" };
      }

      recordData.hospital = {
        connect: { id: data.hospitalId }
      };
    }

    const newRecord = await db.medicalRecord.create({
      data: recordData
    });

    revalidatePath(`/patients/${data.patientId}`);
    if (data.doctorId) revalidatePath(`/doctors/${data.doctorId}`);
    return { success: true, data: newRecord };
  } catch (error) {
    console.error("Failed to create medical record:", error);
    return { success: false, error: "Failed to create medical record" };
  }
}

// // Get medical records for a patient
// export async function getPatientMedicalRecords
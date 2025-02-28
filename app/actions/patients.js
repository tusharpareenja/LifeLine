// app/actions/patient.ts
"use server";

import { revalidatePath } from "next/cache";
import db  from '../db/db'
import DoctorSearch from "../patient/components/doctor-section";

// Create a new patient
export async function createPatient(data) {
  try {
    const newPatient = await db.patient.create({
      data: {
        name: data.name,
        phone: data.phone,
        dob: new Date(data.dob),
        gender: data.gender,
        bloodType: data.bloodType , // Cast to enum
        allergy: data.allergy,
        surgery: data.surgery,
        medicalIssue: data.medicalIssue,
        emergencyContact: data.emergencyContact,
        user: {
          connect: {
            id: session.user.id
          }
        }
      }
    });

    revalidatePath("/patients");
    return { success: true, data: newPatient };
  } catch (error) {
    console.error("Failed to create patient:", error);
    return { success: false, error: "Failed to create patient" };
  }
}

// Get all patients (with optional filtering)
export async function getPatients(id) {
  try {

    const patients = await db.patient.findUnique({
      where : {
        id
      },
      include: {
        user: {
          select: {
            name: true,
            email: true
          }
        }
      }
    });
    return { success: true, data: patients };
  } catch (error) {
    console.error("Failed to fetch patients:", error);
    return { success: false, error: "Failed to fetch patients" };
  }
}

// Get a single patient by ID
export async function getPatientById(id) {
  try {
    const patient = await db.patient.findUnique({
      where: { id },
      include: {
        user: {
          select: {
            name: true,
            email: true
          }
        },
        hospitals : true,
        doctors : true,
        medicalRecords: true,
        familyHistory: true,
        appointments: {
          include: {
            doctor: {
              include: {
                user: {
                  select: { name: true }
                }
              }
            },
            hospital: true
          }
        }
      }
    });

    if (!patient) {
      return { success: false, error: "Patient not found" };
    }

    return { success: true, data: patient };
  } catch (error) {
    console.error("Failed to fetch patient:", error);
    return { success: false, error: "Failed to fetch patient" };
  }
}

// Update patient information
export async function updatePatient(
  id,
  data
) {
  try {
    // Verify ownership
    const patient = await db.patient.findUnique({
      where: { id },
      select: { userId: true }
    });

    if (!patient || patient.userId !== session.user.id) {
      return { success: false, error: "Unauthorized to update this patient" };
    }

    const updatedPatient = await db.patient.update({
      where: { id },
      data: {
        ...data,
        dob: data.dob ? new Date(data.dob) : undefined
      }
    });

    revalidatePath(`/patients/${id}`);
    revalidatePath("/patients");
    return { success: true, data: updatedPatient };
  } catch (error) {
    console.error("Failed to update patient:", error);
    return { success: false, error: "Failed to update patient" };
  }
}

// Delete a patient
export async function deletePatient(id) {
  try {
    // Verify ownership
    const patient = await db.patient.findUnique({
      where: { id },
      select: { userId: true }
    });

    if (!patient || patient.userId !== session.user.id) {
      return { success: false, error: "Unauthorized to delete this patient" };
    }

    await db.patient.delete({
      where: { id }
    });

    revalidatePath("/patients");
    return { success: true };
  } catch (error) {
    console.error("Failed to delete patient:", error);
    return { success: false, error: "Failed to delete patient" };
  }
}

// Add a patient to a hospital
export async function addPatientToHospital(patientId, hospitalId) {
  try {
    // First check if the hospital exists
    const hospital = await db.hospital.findUnique({
      where: { id: hospitalId }
    });

    if (!hospital) {
      return { success: false, error: "Hospital not found" };
    }

    // Check if the patient is already connected to this hospital
    const existingRelation = await db.patient.findFirst({
      where: {
        id: patientId,
        hospitals: {
          some: {
            id: hospitalId
          }
        }
      }
    });

    if (existingRelation) {
      return { success: false, error: "Patient already associated with this hospital" };
    }

    // Add the relation
    await db.patient.update({
      where: { id: patientId },
      data: {
        hospitals: {
          connect: {
            id: hospitalId
          }
        }
      }
    });

    revalidatePath(`/patients/${patientId}`);
    revalidatePath(`/hospitals/${hospitalId}`);
    return { success: true };
  } catch (error) {
    console.error("Failed to add patient to hospital:", error);
    return { success: false, error: "Failed to add patient to hospital" };
  }
}
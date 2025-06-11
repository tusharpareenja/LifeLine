// app/actions/patient.ts
"use server";

import { revalidatePath } from "next/cache";
import db  from '../db/db'
import DoctorSearch from "../patient/components/doctor-section";

// Create a new patient
export async function createPatient(data) {
  try {
    const session = await getServerSession(authOptions);
    if (!session) {
      return { success: false, error: "Unauthorized" };
    }

    const validBloodTypes = [
      "A_POSITIVE", "A_NEGATIVE",
      "B_POSITIVE", "B_NEGATIVE",
      "AB_POSITIVE", "AB_NEGATIVE",
      "O_POSITIVE", "O_NEGATIVE"
    ];

    // Ensure all additional fields are passed as strings (empty string if missing)
    const newPatient = await db.patient.create({
      data: {
        name: data.name,
        phone: data.phone,
        dob: new Date(data.dob),
        gender: data.gender,
        bloodType: validBloodTypes.includes(data.bloodType) ? data.bloodType : undefined,
        allergy: data.allergy ?? "",
        surgery: data.surgery ?? "",
        medicalIssue: data.medicalIssue ?? "",
        emergencyContact: data.emergencyContact ?? "",
        yearlyIncome: data.yearlyIncome ?? "",
        geneticDiseases: data.geneticDiseases ?? "",
        longTermMedication: data.longTermMedication ?? "",
        hasSubsidy: typeof data.hasSubsidy === "boolean"  ?? "",
        subsidyType: data.subsidyType ?? "",
        subsidyDetails: data.subsidyDetails ?? "",
                city: data.city ?? "",
        address: data.address ?? "",
        state: data.state ?? "",
        user: {
          connect: {
            id: session.user.id
          }
        }
      }
    });

    console.log(newPatient);
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
export async function getPatientById(id) {  try {
    let patient;
    
    // First try to find by patientId
    patient = await db.patient.findUnique({
      where: { id },
      include: {
        user: {
          select: {
            name: true,
            email: true,
            image: true
          }
        },
        hospital: true,
        doctors: true,
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
        },
        emergencyRequests: true,
        prescriptions: true,
        beds: true
      }
    });

    // If not found, try to find by userId
    if (!patient) {
      patient = await db.patient.findUnique({
        where: { userId: id },
        include: {
          user: {
            select: {
              name: true,
              email: true,
              image: true
            }
          },
          hospitals: true,
          doctors: true,
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
    }

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

// Get patients with subsidy
export async function getPatientsWithSubsidy() {
  try {
    const patients = await db.patient.findMany({
      where: {
        hasSubsidy: true
      },
      include: {
        user: {
          select: {
            name: true,
            email: true
          }
        },
        hospitals: true
      }
    });

    if (!patients || patients.length === 0) {
      return {
        success: true,
        data: [],
        message: "No patients with subsidy found"
      };
    }

    console.log(patients);
    return { success: true, data: patients };
  } catch (error) {
    console.error("Failed to fetch patients with subsidy:", error);
    return { success: false, error: "Failed to fetch patients with subsidy" };
  }
}


"use server";

import { revalidatePath } from "next/cache";
import { PrismaClient } from "@prisma/client";
import { id } from "ethers";

const db = new PrismaClient();

export const registerHospital = async (additionalData) => {
  try {
    console.log("Additional Data:", additionalData);

    // Check if additionalData is provided
    if (!additionalData) {
      throw new Error("No data provided");
    }

    // Create the user and hospital
    const user = await db.user.create({
      data: {
        email: additionalData.email,
        password: additionalData.password, // Ensure you hash the password before saving
        name: additionalData.name,
        role: "HOSPITAL",
        hospital: {
          create: {
            name: additionalData.name,
            address: additionalData.address,
            phone: additionalData.phone,
            totalBeds: additionalData.totalBeds,
            availableBeds: additionalData.availableBeds,
            icuBeds: additionalData.icuBeds,
            ventilators: additionalData.ventilators,
            latitude: additionalData.latitude,
            longitude: additionalData.longitude
          }
        }
      }
    });

    // revalidatePath("/hospitals");
    return { success: true, data: user };
  } catch (error) {
    console.error("Failed to create user:", error);
    return { success: false, error: error.message || "Failed to create user" };
  }
};
export const Loginnn = async ({email, password , role}) => {
  try {

    const user = await db.user.findUnique({
      where: { email , role },
      include: {
        hospital: true,
        patient: true,
        doctor: true
      },
    });

    if (!user) {
      throw new Error("User not found");
    }

    if (user.password !== password) {
      throw new Error("Invalid password");
    }

    return { success: true, data: user };
  } catch (error) {
    console.error("Failed to login:", error);
    return { success: false, error: error.message || "Failed to login" };
  }
}

export async function createPatient({data, hospitalId}) {
  console.log(data , hospitalId)
  try {
    // Create the user first
    const newUser = await db.user.create({
      data: {
        email: data.user.email, // Ensure email is provided in the data
        password: data.password, 
        name: data.user.name,
        role: "PATIENT", // Set the role to PATIENT
      },
    });

    console.log(newUser)

    // Create the patient and connect to the newly created user and the hospital
    const newPatient = await db.patient.create({
      data: {
        name: data.user.name,
        phone: data.user.phone,
        dob: new Date(data.dob), // Convert string to Date
        gender: data.gender,
        bloodType: data.bloodType, // Ensure this matches your enum
        allergy: data.allergy,
        surgery: data.surgery,
        medicalIssue: data.medicalIssue,
        emergencyContact: data.emergencyContact,
        yearlyIncome: data.yearlyIncome ?? "",
        geneticDiseases: data.geneticDiseases ?? "",
        longTermMedication: data.longTermMedication ?? "",
        hasSubsidy: data.hasSubsidy === "Yes" ? true : false,
        subsidyType: data.subsidyType ?? "",
        subsidyDetails: data.subsidyDetails ?? "",
        city: data.city ?? "",
        address: data.address ?? "",
        state: data.state ?? "",
        user: {
          connect: {
            id: newUser.id, // Connect to the newly created user
          },
        },
        hospital: {
          connect: {
            id: hospitalId, // Connect to the hospital (affiliated hospital)
          },
        },
      },
      include: {
        user: true, // Include the user in the response
        hospital: true, // Include the hospital in the response
      },
    });
    console.log(newPatient)

    // Revalidate the patients page to reflect the new patient
    // revalidatePath("/patients");

    return { success: true, data: newPatient };
  } catch (error) {
    console.error("Failed to create patient:", error);
    return { success: false, error: "Failed to create patient" };
  }
}

// Get all patients (with optional filtering)
export async function getPatients(id) {
  try {
    console.log(id)
    const patients = await db.patient.findMany({
      where: {
        hospitalId: id
      },
      include: {
        user: {
          select: {
            name: true,
            email: true
          }
        },
        hospital: true
      }
    });
    console.log(patients)
    return { success: true, data: patients };
  } catch (error) {
    console.error("Failed to fetch patients:", error);
    return { success: false, error: "Failed to fetch patients" };
  }
}[]

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

// Get nearby hospitals within a certain distance (in km) from a given lat/lng
export async function getNearbyHospitals(latitude, longitude, distanceKm = 10) {
  // Haversine formula in raw SQL for Postgres
  // Returns hospitals with distance in km
  const hospitals = await db.$queryRaw`
    SELECT id, name, address, latitude, longitude,
      available_beds, total_beds, icu_beds, ventilators,
      (6371 * acos(
        cos(radians(${latitude})) *
        cos(radians(latitude)) *
        cos(radians(longitude) - radians(${longitude})) +
        sin(radians(${latitude})) *
        sin(radians(latitude))
      )) AS distance
    FROM "hospitals"
    WHERE latitude IS NOT NULL AND longitude IS NOT NULL
      AND (6371 * acos(
        cos(radians(${latitude})) *
        cos(radians(latitude)) *
        cos(radians(longitude) - radians(${longitude})) +
        sin(radians(${latitude})) *
        sin(radians(latitude))
      )) < ${distanceKm}
    ORDER BY distance ASC
    LIMIT 50;
  `;

  // For each hospital, get average hospitalRating from feedback table
  const hospitalsWithFeedback = await Promise.all(
    hospitals.map(async (h) => {
      // Get average hospitalRating for this hospital
      const avgResult = await db.feedback.aggregate({
        _avg: { hospitalRating: true },
        where: { hospitalId: h.id },
      });
      return {
        id: h.id,
        name: h.name,
        address: h.address,
        distance: h.distance,
        availableBeds: h.available_beds,
        totalBeds: h.total_beds,
        icuBeds: h.icu_beds,
        ventilators: h.ventilators,
        averageHospitalRating: avgResult._avg.hospitalRating ?? null,
      };
    })
  );
  return hospitalsWithFeedback;
}
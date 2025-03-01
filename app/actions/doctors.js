// app/actions/doctor.ts
"use server";

import { revalidatePath } from "next/cache";
import db from "../db/db";

// Create a new doctor
export async function createDoctor(data) {
  try {
    console.log(data)
    // Check if the hospital exists
    const hospital = await db.hospital.findUnique({
      where: { id: data.hospitalId }
    });

    if (!hospital) {
      return { success: false, error: "Hospital not found" };
    }
    const user = await db.user.create({
      data: {
        email: data.email,
        password: data.password,
        name: data.name,
        role: "DOCTOR"
      }
    })

    const newDoctor = await db.doctor.create({
      data: {
        specialization: data.specialization,
        experience: data.experience || 0,
        availability: data.availability !== undefined ? data.availability : true,
        user: {
          connect: {
            id: user.id
          }
        },
        hospital: {
          connect: {
            id: data.hospitalId
          }
        }
      }, include : {
        user : true
      }
    });

    revalidatePath("/doctors");
    revalidatePath(`/hospitals/${data.hospitalId}`);
    return { success: true, data: newDoctor };
  } catch (error) {
    console.error("Failed to create doctor:", error);
    return { success: false, error: "Failed to create doctor" };
  }
}

// Get all doctors (with optional filtering)
export async function getDoctors() {
  try {
    const where = {};
    
    
    
  

    const doctors = await db.doctor.findMany({
      
      include: {
        user: {
          select: {
            name: true,
            email: true
          }
        },
        hospital: {
          select: {
            id: true,
            name: true
          }
        }
      }
    });
    return { success: true, data: doctors };
  } catch (error) {
    console.error("Failed to fetch doctors:", error);
    return { success: false, error: "Failed to fetch doctors" };
  }
}

// Get a single doctor by ID
export async function getDoctorById(id) {
  try {
    const doctor = await db.doctor.findUnique({
      where: { id },
      include: {
        user: true,
        hospital: true,
        appointments: true,
        medicalRecords: true
      }
    });

    if (!doctor) {
      return { success: false, error: "Doctor not found" };
    }

    return { success: true, data: doctor };
  } catch (error) {
    console.error("Failed to fetch doctor:", error);
    return { success: false, error: "Failed to fetch doctor" };
  }
}

// Update doctor information
export async function updateDoctor(
  id,
  data
) {
  try {
    // Verify ownership
    const doctor = await db.doctor.findUnique({
      where: { id },
      select: { userId: true }
    });

    if (!doctor || doctor.userId !== session.user.id) {
      return { success: false, error: "Unauthorized to update this doctor profile" };
    }

    // Prepare update data
    const updateData = {
      specialization: data.specialization,
      experience: data.experience,
      availability: data.availability
    };

    // Add hospital connection if provided
    if (data.hospitalId) {
      // Check if hospital exists
      const hospital = await db.hospital.findUnique({
        where: { id: data.hospitalId }
      });

      if (!hospital) {
        return { success: false, error: "Hospital not found" };
      }

      updateData.hospital = {
        connect: { id: data.hospitalId }
      };
    }

    const updatedDoctor = await db.doctor.update({
      where: { id },
      data: updateData
    });

    revalidatePath(`/doctors/${id}`);
    revalidatePath("/doctors");
    return { success: true, data: updatedDoctor };
  } catch (error) {
    console.error("Failed to update doctor:", error);
    return { success: false, error: "Failed to update doctor" };
  }
}

// Delete a doctor
export async function deleteDoctor(id) {
  try {
    // Verify ownership
    const doctor = await db.doctor.findUnique({
      where: { id },
      select: { userId: true, hospitalId: true }
    });

    if (!doctor || doctor.userId !== session.user.id) {
      return { success: false, error: "Unauthorized to delete this doctor profile" };
    }

    await db.doctor.delete({
      where: { id }
    });

    revalidatePath("/doctors");
    revalidatePath(`/hospitals/${doctor.hospitalId}`);
    return { success: true };
  } catch (error) {
    console.error("Failed to delete doctor:", error);
    return { success: false, error: "Failed to delete doctor" };
  }
}

// Toggle doctor availability
export async function toggleDoctorAvailability(id) {
  try {
    // Verify ownership
    const doctor = await db.doctor.findUnique({
      where: { id },
      select: { userId: true, availability: true }
    });

    if (!doctor || doctor.userId !== session.user.id) {
      return { success: false, error: "Unauthorized to update this doctor profile" };
    }

    const updatedDoctor = await db.doctor.update({
      where: { id },
      data: {
        availability: !doctor.availability
      }
    });

    revalidatePath(`/doctors/${id}`);
    revalidatePath("/doctors");
    return { success: true, data: updatedDoctor };
  } catch (error) {
    console.error("Failed to toggle doctor availability:", error);
    return { success: false, error: "Failed to update doctor availability" };
  }
}
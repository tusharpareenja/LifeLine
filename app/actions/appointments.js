// app/actions/appointment.ts
"use server";

import { revalidatePath } from "next/cache";
import db from "../db/db";

// Create a new appointment
export async function createAppointment(data) {
  try {

    // Verify that patient exists
    const patient = await db.patient.findUnique({
      where: { id: data.patientId }
    });

    if (!patient) {
      return { success: false, error: "Patient not found" };
    }

    // Verify that doctor exists
    const doctor = await db.doctor.findUnique({
      where: { id: data.doctorId }
    });

    if (!doctor) {
      return { success: false, error: "Doctor not found" };
    }

    // Create appointment data
    const appointmentData = {
      date: new Date(data.appointmentDate), // Use 'date' as per Prisma schema
      consultationType: data.consultationType,
      patient: {
        connect: { id: data.patientId }
      },
      doctor: {
        connect: { id: data.doctorId }
      }
    };

    // Add hospital if provided
    if (data.hospitalId) {
      const hospital = await db.hospital.findUnique({
        where: { id: data.hospitalId }
      });

      if (!hospital) {
        return { success: false, error: "Hospital not found" };
      }

      appointmentData.hospital = {
        connect: { id: data.hospitalId }
      };
    } else {
      // Use doctor's hospital if not provided
      appointmentData.hospital = {
        connect: { id: doctor.hospitalId }
      };
    }

    const newAppointment = await db.appointment.create({
      data: appointmentData
    });

    console.log("Appointment created:", newAppointment); // Debug log

    revalidatePath("/appointments");
    revalidatePath(`/patients/${data.patientId}`);
    revalidatePath(`/doctors/${data.doctorId}`);
    return { success: true, data: newAppointment };
  } catch (error) {
    console.error("Failed to create appointment:", error);
    return { success: false, error: "Failed to create appointment" };
  }
}

// Get all appointments (with filtering options)
export async function getAppointments(filter) {
  try {
    const where = {};
    
    if (filter?.patientId) {
      where.patientId = filter.patientId;
    }
    
    if (filter?.doctorId) {
      where.doctorId = filter.doctorId;
    }
    
    if (filter?.hospitalId) {
      where.hospitalId = filter.hospitalId;
    }
    
    // Case-insensitive status filter for completed tab
    if (filter?.status) {
      where.status = { equals: filter.status, mode: 'insensitive' };
    }
    
    if (filter?.date) {
      const date = new Date(filter.date);
      const nextDay = new Date(date);
      nextDay.setDate(nextDay.getDate() + 1);
      
      where.date = {
        gte: date,
        lt: nextDay
      };
    }

    const appointments = await db.appointment.findMany({
      where,
      include: {
        patient: {
          include: {
            user: {
              select: { name: true, email: true }
            }
          }
        },
        doctor: {
          include: {
            user: {
              select: { name: true, email: true }
            }
          }
        },
        hospital: {
          select: { id: true, name: true }
        }
      },
      orderBy: {
        date: 'asc'
      }
    });
    
    return { success: true, data: appointments };
  } catch (error) {
    console.error("Failed to fetch appointments:", error);
    return { success: false, error: "Failed to fetch appointments" };
  }
}

// Get a single appointment by ID
export async function getAppointmentById(id) {
  try {
    const appointment = await db.appointment.findUnique({
      where: { id },
      include: {
        patient: {
          include: {
            user: {
              select: { name: true, email: true }
            }
          }
        },
        doctor: {
          include: {
            user: {
              select: { name: true, email: true, image: true }
            }
          }
        },
        hospital: true
      }
    });

    if (!appointment) {
      return { success: false, error: "Appointment not found" };
    }

    return { success: true, data: appointment };
  } catch (error) {
    console.error("Failed to fetch appointment:", error);
    return { success: false, error: "Failed to fetch appointment" };
  }
}

// Update appointment status
// status: 'SCHEDULED' | 'COMPLETED' | 'CANCELLED'
export async function updateAppointmentStatus(id, status) {
  try {
    // Only update status, no user check for simplicity
    const updatedAppointment = await db.appointment.update({
      where: { id },
      data: { status: status.toUpperCase() }
    });
    revalidatePath(`/appointments/${id}`);
    revalidatePath("/appointments");
    return { success: true, data: updatedAppointment };
  } catch (error) {
    console.error("Failed to update appointment status:", error);
    return { success: false, error: "Failed to update appointment status" };
  }
}

// Reschedule appointment
export async function rescheduleAppointment(
  id,
  newDate
) {
  try {

    // Fetch the appointment
    const appointment = await db.appointment.findUnique({
      where: { id },
      include: {
        doctor: {
          select: { userId: true }
        },
        patient: {
          select: { userId: true }
        }
      }
    });

    if (!appointment) {
      return { success: false, error: "Appointment not found" };
    }

    // Check if user is the doctor or patient
    if (appointment.doctor.userId !== session.user.id && 
        appointment.patient.userId !== session.user.id) {
      return { success: false, error: "Unauthorized to reschedule this appointment" };
    }

    const updatedAppointment = await db.appointment.update({
      where: { id },
      data: { 
        appointmentDate: new Date(newDate),
        status: 'SCHEDULED' // Reset to scheduled if it was cancelled
      }
    });

    revalidatePath(`/appointments/${id}`);
    revalidatePath("/appointments");
    return { success: true, data: updatedAppointment };
  } catch (error) {
    console.error("Failed to reschedule appointment:", error);
    return { success: false, error: "Failed to reschedule appointment" };
  }
}

// Delete appointment
export async function deleteAppointment(id) {
  try {

    // Fetch the appointment
    const appointment = await db.appointment.findUnique({
      where: { id },
      include: {
        doctor: {
          select: { userId: true }
        },
        patient: {
          select: { userId: true }
        }
      }
    });

    if (!appointment) {
      return { success: false, error: "Appointment not found" };
    }

    // Check if user is the doctor or patient
    if (appointment.doctor.userId !== session.user.id && 
        appointment.patient.userId !== session.user.id) {
      return { success: false, error: "Unauthorized to delete this appointment" };
    }

    await db.appointment.delete({
      where: { id }
    });

    revalidatePath("/appointments");
    return { success: true };
  } catch (error) {
    console.error("Failed to delete appointment:", error);
    return { success: false, error: "Failed to delete appointment" };
  }
}

// Get all appointments for a specific patient (optionally only future/upcoming)
export async function getAppointmentsByPatientId(patientId, { onlyUpcoming = false } = {}) {
  try {
    if (!patientId) {
      return { success: false, error: "No patientId provided" };
    }
    const now = new Date();
    const where = {
      patientId,
    };
    if (onlyUpcoming) {
      where.date = { gt: now };
      where.status = { notIn: ["CANCELLED", "COMPLETED"] };
    }
    const appointments = await db.appointment.findMany({
      where,
      include: {
        patient: {
          include: {
            user: { select: { name: true, email: true } }
          }
        },
        doctor: {
          include: {
            user: { select: { name: true, email: true } }
          }
        },
        hospital: { select: { id: true, name: true } }
      },
      orderBy: { date: 'asc' }
    });
    return { success: true, data: appointments };
  } catch (error) {
    console.error("Failed to fetch appointments by patientId:", error);
    return { success: false, error: "Failed to fetch appointments by patientId" };
  }
}
'use server'

import { revalidatePath } from 'next/cache'
import prisma from '../db/db'
const db = prisma

// Patient Actions
export async function createPatient(data) {
  try {
    const patient = await db.patient.create({
      data: {
        ...data,
      },
    })
    revalidatePath('/patients')
    return { success: true, data: patient }
  } catch (error) {
    console.error('Create patient error:', error)
    return { success: false, error: 'Failed to create patient' }
  }
}

export async function updatePatient(id, data) {
  try {
    const patient = await db.patient.update({
      where: { id },
      data,
    })
    revalidatePath('/patients')
    return { success: true, data: patient }
  } catch (error) {
    console.error('Update patient error:', error)
    return { success: false, error: 'Failed to update patient' }
  }
}

export async function deletePatient(id) {
  try {
    await db.patient.delete({
      where: { id },
    })
    revalidatePath('/patients')
    return { success: true }
  } catch (error) {
    console.error('Delete patient error:', error)
    return { success: false, error: 'Failed to delete patient' }
  }
}

export async function getPatient(id) {
  try {
    const patient = await db.patient.findUnique({
      where: { id },
      include: {
        user: true,
        medicalRecords: true,
        appointments: true,
      },
    })
    return { success: true, data: patient }
  } catch (error) {
    console.error('Get patient error:', error)
    return { success: false, error: 'Failed to fetch patient' }
  }
}



// Hospital Actions
export async function createHospital(data) {
  try {
    const hospital = await db.hospital.create({
      data: {
        ...data,
      },
    })
    revalidatePath('/hospitals')
    return { success: true, data: hospital }
  } catch (error) {
    console.error('Create hospital error:', error)
    return { success: false, error: 'Failed to create hospital' }
  }
}

export async function updateHospital(id, data) {
  try {
    const hospital = await db.hospital.update({
      where: { id },
      data,
    })
    revalidatePath('/hospitals')
    return { success: true, data: hospital }
  } catch (error) {
    console.error('Update hospital error:', error)
    return { success: false, error: 'Failed to update hospital' }
  }
}

export async function deleteHospital(id) {
  try {
    await db.hospital.delete({
      where: { id },
    })
    revalidatePath('/hospitals')
    return { success: true }
  } catch (error) {
    console.error('Delete hospital error:', error)
    return { success: false, error: 'Failed to delete hospital' }
  }
}

// Doctor Actions
export async function createDoctor(data) {
  try {
    const doctor = await db.doctor.create({
      data: {
        ...data,
      },
    })
    revalidatePath('/doctors')
    return { success: true, data: doctor }
  } catch (error) {
    console.error('Create doctor error:', error)
    return { success: false, error: 'Failed to create doctor' }
  }
}

export async function updateDoctor(id, data) {
  try {
    const doctor = await db.doctor.update({
      where: { id },
      data,
    })
    revalidatePath('/doctors')
    return { success: true, data: doctor }
  } catch (error) {
    console.error('Update doctor error:', error)
    return { success: false, error: 'Failed to update doctor' }
  }
}

export async function deleteDoctor(id) {
  try {
    await db.doctor.delete({
      where: { id },
    })
    revalidatePath('/doctors')
    return { success: true }
  } catch (error) {
    console.error('Delete doctor error:', error)
    return { success: false, error: 'Failed to delete doctor' }
  }
}

// Appointment Actions
export async function createAppointment(data) {
  try {
    const appointment = await db.appointment.create({
      data: {
        ...data,
      },
    })
    revalidatePath('/appointments')
    return { success: true, data: appointment }
  } catch (error) {
    console.error('Create appointment error:', error)
    return { success: false, error: 'Failed to create appointment' }
  }
}

export async function updateAppointment(id, data) {
  try {
    const appointment = await db.appointment.update({
      where: { id },
      data,
    })
    revalidatePath('/appointments')
    return { success: true, data: appointment }
  } catch (error) {
    console.error('Update appointment error:', error)
    return { success: false, error: 'Failed to update appointment' }
  }
}

export async function deleteAppointment(id) {
  try {
    await db.appointment.delete({
      where: { id },
    })
    revalidatePath('/appointments')
    return { success: true }
  } catch (error) {
    console.error('Delete appointment error:', error)
    return { success: false, error: 'Failed to delete appointment' }
  }
}

// Emergency Request Actions
export async function createEmergencyRequest(data) {
  try {
    const request = await db.emergencyRequest.create({
      data: {
        ...data,
      },
    })
    revalidatePath('/emergency-requests')
    return { success: true, data: request }
  } catch (error) {
    console.error('Create emergency request error:', error)
    return { success: false, error: 'Failed to create emergency request' }
  }
}

export async function updateEmergencyRequest(id, data) {
  try {
    const request = await db.emergencyRequest.update({
      where: { id },
      data,
    })
    revalidatePath('/emergency-requests')
    return { success: true, data: request }
  } catch (error) {
    console.error('Update emergency request error:', error)
    return { success: false, error: 'Failed to update emergency request' }
  }
}

// Prescription Actions
export async function createPrescription(data) {
  try {
    const prescription = await db.prescription.create({
      data: {
        ...data,
      },
    })
    revalidatePath('/prescriptions')
    return { success: true, data: prescription }
  } catch (error) {
    console.error('Create prescription error:', error)
    return { success: false, error: 'Failed to create prescription' }
  }
}

export async function updatePrescription(id, data) {
  try {
    const prescription = await db.prescription.update({
      where: { id },
      data,
    })
    revalidatePath('/prescriptions')
    return { success: true, data: prescription }
  } catch (error) {
    console.error('Update prescription error:', error)
    return { success: false, error: 'Failed to update prescription' }
  }
}

export async function deletePrescription(id) {
  try {
    await db.prescription.delete({
      where: { id },
    })
    revalidatePath('/prescriptions')
    return { success: true }
  } catch (error) {
    console.error('Delete prescription error:', error)
    return { success: false, error: 'Failed to delete prescription' }
  }
}
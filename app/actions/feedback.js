"use server";

import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

// Add feedback for doctor or hospital
export async function addFeedback({
  appointmentId,
  patientId,
  doctorId,
  hospitalId,
  doctorRating,
  hospitalRating,
  servicesRating,
  message,
}) {
  // Ratings are expected as float, but schema uses Int. If you want float, update schema to Float.
  // For now, will accept float and round to nearest int for storage.
  const feedback = await prisma.feedback.create({
    data: {
      appointmentId,
      patientId,
      doctorId,
      hospitalId,
      doctorRating: doctorRating ? Math.round(doctorRating) : null,
      hospitalRating: hospitalRating ? Math.round(hospitalRating) : null,
      servicesRating: servicesRating ? Math.round(servicesRating) : null,
      message,
    },
  });
  return feedback;
}

// Get average feedback for a doctor
export async function getDoctorFeedback(doctorId) {
  const feedbacks = await prisma.feedback.findMany({
    where: { doctorId },
    select: {
      doctorRating: true,
      servicesRating: true,
      message: true,
      createdAt: true,
      patient: { select: { name: true, id: true } },
    },
  });
  // Calculate average doctorRating and servicesRating
  const doctorRatings = feedbacks.map(f => f.doctorRating).filter(r => r != null);
  const servicesRatings = feedbacks.map(f => f.servicesRating).filter(r => r != null);
  const avgDoctorRating = doctorRatings.length ? (doctorRatings.reduce((a, b) => a + b, 0) / doctorRatings.length) : null;
  const avgServicesRating = servicesRatings.length ? (servicesRatings.reduce((a, b) => a + b, 0) / servicesRatings.length) : null;
  return {
    averageDoctorRating: avgDoctorRating,
    averageServicesRating: avgServicesRating,
    feedbacks,
  };
}

// Get average feedback for a hospital
export async function getHospitalFeedback(hospitalId) {
  const feedbacks = await prisma.feedback.findMany({
    where: { hospitalId },
    select: {
      hospitalRating: true,
      servicesRating: true,
      message: true,
      createdAt: true,
      patient: { select: { name: true, id: true } },
    },
  });
  // Calculate average hospitalRating and servicesRating
  const hospitalRatings = feedbacks.map(f => f.hospitalRating).filter(r => r != null);
  const servicesRatings = feedbacks.map(f => f.servicesRating).filter(r => r != null);
  const avgHospitalRating = hospitalRatings.length ? (hospitalRatings.reduce((a, b) => a + b, 0) / hospitalRatings.length) : null;
  const avgServicesRating = servicesRatings.length ? (servicesRatings.reduce((a, b) => a + b, 0) / servicesRatings.length) : null;
  return {
    averageHospitalRating: avgHospitalRating,
    averageServicesRating: avgServicesRating,
    feedbacks,
  };
}

"use server";
import { revalidatePath } from "next/cache";
import prisma from "@/app/db/db";

// Add a new bed
export async function addBed(data) {
  try {
    const { id, type, room, status, patientId, hospitalId } = data;
    // Check hospital exists
    const hospital = await prisma.hospital.findUnique({ where: { id: hospitalId } });
    if (!hospital) {
      return { success: false, error: "Hospital not found" };
    }
    const bed = await prisma.bed.create({
      data: {
        id,
        type,
        room,
        status: status || "AVAILABLE",
        patientId: patientId || null,
        hospitalId,
      },
      include: { hospital: true }, // Only include valid relations
    });
    revalidatePath("/hospital/bed-management");
    revalidatePath(`/hospitals/${hospitalId}`);
    return { success: true, data: bed };
  } catch (error) {
    console.error("Failed to add bed:", error);
    return { success: false, error: error?.message || "Failed to add bed" };
  }
}

// Get all beds for a hospital (optionally filter by status/type)
export async function getBeds(hospitalId, status, type) {
  try {
    const where = { hospitalId };
    if (status) where.status = status;
    if (type) where.type = type;
    const beds = await prisma.bed.findMany({
      where,
      include: { patient: true, hospital: true },
      orderBy: { id: "asc" },
    });
    return { success: true, data: beds };
  } catch (error) {
    console.error("Failed to fetch beds:", error);
    return { success: false, error: "Failed to fetch beds" };
  }
}

// Get a single bed by bed id
export async function getBedById(id) {
  try {
    const bed = await prisma.bed.findUnique({
      where: { id },
      include: { patient: true, hospital: true },
    });
    if (!bed) {
      return { success: false, error: "Bed not found" };
    }
    return { success: true, data: bed };
  } catch (error) {
    console.error("Failed to fetch bed by id:", error);
    return { success: false, error: "Failed to fetch bed by id" };
  }
}

// Update a bed's status/type/room/patient (by bed id)
export async function updateBed(id, data) {
  try {
    const updateData = {
      ...(data.status && { status: data.status }),
      ...(data.type && { type: data.type }),
      ...(data.room && { room: data.room }),
      ...(typeof data.patient === "string" && { patientName: data.patient }),
    };

    const bed = await prisma.bed.update({
      where: { id },
      data: updateData,
      include: { hospital: true },
    });

    revalidatePath("/hospital/bed-management");
    revalidatePath(`/hospitals/${bed.hospitalId}`);
    return { success: true, data: bed };
  } catch (error) {
    console.error("Failed to update bed:", error);
    return { success: false, error: error?.message || "Failed to update bed" };
  }
}

// Delete a bed
export async function deleteBed(id) {
  try {
    const bed = await prisma.bed.delete({
      where: { id },
    });
    revalidatePath("/hospital/bed-management");
    revalidatePath(`/hospitals/${bed.hospitalId}`);
    return { success: true };
  } catch (error) {
    console.error("Failed to delete bed:", error);
    return { success: false, error: "Failed to delete bed" };
  }
}

// Get beds for public/nearby hospitals
export async function getNearbyBeds(hospitalIds, status) {
  try {
    const where = { hospitalId: { in: hospitalIds } };
    if (status) where.status = status;
    const beds = await prisma.bed.findMany({
      where,
      include: { patient: true, hospital: true },
      orderBy: [{ hospitalId: "asc" }, { id: "asc" }],
    });
    return { success: true, data: beds };
  } catch (error) {
    console.error("Failed to fetch nearby beds:", error);
    return { success: false, error: "Failed to fetch nearby beds" };
  }
}

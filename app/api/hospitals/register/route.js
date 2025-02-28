import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import db from '../../../db/db'

const prisma = new PrismaClient();

export async function POST(request) {
  console.log("POST request received:", request.method, request.url);
  try {
    // Log the raw request object
    console.log("Request object:", request);

    // Parse request body
    console.log("Attempting to parse request body...");
    const body = await request.json();
    console.log("Parsed body:", body);

    // Check if body is null
    if (body === null) {
      console.log("Body is null");
      return NextResponse.json(
        { error: "Request body cannot be null" },
        { status: 400 }
      );
    }

    // Ensure body is a non-empty object
    console.log("Checking body type and content...");
    console.log("Body type:", typeof body, "Is array:", Array.isArray(body));
    if (typeof body !== "object" || Array.isArray(body) || Object.keys(body).length === 0) {
      console.log("Body validation failed:", body);
      return NextResponse.json(
        { error: "Request body must be a non-empty JSON object" },
        { status: 400 }
      );
    }

    // Validate required fields
    const requiredFields = ["name", "address", "phone", "totalBeds", "availableBeds"];
    console.log("Validating required fields:", requiredFields);
    for (const field of requiredFields) {
      if (!body[field]) {
        console.log(`Missing required field: ${field}`);
        return NextResponse.json(
          { error: `${field} is required` },
          { status: 400 }
        );
      }
    }

    // Log the data before Prisma operation
    console.log("Data to be sent to Prisma:", {
      name: body.name,
      address: body.address,
      phone: body.phone,
      totalBeds: parseInt(body.totalBeds),
      availableBeds: parseInt(body.availableBeds),
      icuBeds: body.icuBeds ? parseInt(body.icuBeds) : 0,
      ventilators: body.ventilators ? parseInt(body.ventilators) : 0,
    });

    // Store hospital in the database
    const newHospital = await prisma.hospital.create({
      data: {
        name: body.name,
        address: body.address,
        phone: body.phone,
        totalBeds: parseInt(body.totalBeds),
        availableBeds: parseInt(body.availableBeds),
        icuBeds: body.icuBeds ? parseInt(body.icuBeds) : 0,
        ventilators: body.ventilators ? parseInt(body.ventilators) : 0,
      },
    });
    console.log("Hospital created successfully:", newHospital);

    return NextResponse.json(
      { message: "Hospital registered successfully", hospitalId: newHospital.id },
      { status: 201 }
    );
  } catch (error) {
    console.error("Error registering hospital:", error);
    return NextResponse.json(
      { error: "Failed to register hospital" },
      { status: 500 }
    );
  } finally {
    console.log("Disconnecting Prisma...");
    await prisma.$disconnect();
  }
}
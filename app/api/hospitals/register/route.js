import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function POST(request) {
  try {
    // Parse request body
    const body = await request.json();

    // Validate required fields
    const requiredFields = ['name', 'address', 'phone', 'totalBeds', 'availableBeds'];
    for (const field of requiredFields) {
      if (!body[field]) {
        return NextResponse.json(
          { error: `${field} is required` },
          { status: 400 }
        );
      }
    }

    // Check if phone number is already registered
    const phoneExists = await prisma.hospital.findUnique({
      where: { phone: body.phone },
    });

    if (phoneExists) {
      return NextResponse.json(
        { error: 'Phone number already registered' },
        { status: 409 }
      );
    }

    // Create new hospital entry
    const newHospital = await prisma.hospital.create({
      data: {
        name: body.name,
        address: body.address,
        phone: body.phone,
        totalBeds: parseInt(body.totalBeds),
        availableBeds: parseInt(body.availableBeds),
        icuBeds: parseInt(body.icuBeds) || 0,
        ventilators: parseInt(body.ventilators) || 0,
      },
    });

    return NextResponse.json(
      {
        message: 'Hospital registered successfully',
        hospitalId: newHospital.id,
      },
      { status: 201 }
    );
  } catch (error) {
    console.error('Error registering hospital:', error);
    return NextResponse.json(
      { error: 'Failed to register hospital' },
      { status: 500 }
    );
  } finally {
    await prisma.$disconnect();
  }
}

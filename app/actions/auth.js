import prisma from "../db/db";

export const Register = async ({ email, password, name, role, additionalData }) => {
  try {
    // Create the user
    const user = await prisma.user.create({
      data: {
        email,
        password,
        name,
        role,
      },
    });

    // Create role-specific records
    if (role === "PATIENT") {
      await prisma.patient.create({
        data: {
          userId: user.id,
          name: additionalData.name,
          dob: additionalData.dob,
          gender: additionalData.gender,
          bloodType: additionalData.bloodType,
          allergy: additionalData.allergy,
          surgery: additionalData.surgery,
          medicalIssue: additionalData.medicalIssue,
          emergencyContact: additionalData.emergencyContact,
        },
      });
    } else if (role === "DOCTOR") {
      await prisma.doctor.create({
        data: {
          userId: user.id,
          hospitalId: additionalData.hospitalId,
          specialization: additionalData.specialization,
          experience: additionalData.experience,
          availability: additionalData.availability,
        },
      });
    } else if (role === "HOSPITAL") {
      await prisma.hospital.create({
        data: {
          userId: user.id,
          name: additionalData.name,
          address: additionalData.address,
          phone: additionalData.phone,
          totalBeds: additionalData.totalBeds,
          availableBeds: additionalData.availableBeds,
          icuBeds: additionalData.icuBeds,
          ventilators: additionalData.ventilators,
        },
      });
    }

    return {
      success: true,
      data: user,
    };
  } catch (error) {
    console.log(error);
    return {
      success: false,
      error: error.message,
    };
  }
};

export const Login = async ({ email, password }) => {
  try {
    // Find the user
    const user = await prisma.user.findFirst({
      where: {
        email,
        password,
      },
      include: {
        patient: true,
        doctor: true,
        hospital: true,
      },
    });

    if (!user) {
      return {
        success: false,
        error: "Invalid email or password",
      };
    }

    // Return role-specific data
    let roleData = null;
    if (user.role === "PATIENT" && user.patient) {
      roleData = user.patient;
    } else if (user.role === "DOCTOR" && user.doctor) {
      roleData = user.doctor;
    } else if (user.role === "HOSPITAL" && user.hospital) {
      roleData = user.hospital;
    }

    return {
      success: true,
      data: {
        user,
        roleData,
      },
    };
  } catch (error) {
    console.log(error);
    return {
      success: false,
      error: error.message,
    };
  }
};
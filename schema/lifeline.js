import { pgTable, uuid, varchar, text, integer, timestamp, boolean, json } from "drizzle-orm/pg-core";


// ✅ 1. Users Table (Common for Patients, Doctors, Admins)
export const users = pgTable("users", {
  userId: uuid("user_id").defaultRandom().primaryKey(),
  fullName: varchar("full_name", { length: 255 }).notNull(),
  email: varchar("email", { length: 255 }).unique().notNull(),
  passwordHash: text("password_hash").notNull(),
  phone: varchar("phone", { length: 20 }).unique(),
  role: text("role", { enum: ["Patient", "Doctor", "Admin", "HospitalAdmin"] })
  .notNull()
  .default("Patient"),

  profilePic: text("profile_pic"),
  createdAt: timestamp("created_at").defaultNow(),
});

// ✅ 2. Patients Table
export const patients = pgTable("patients", {
  patientId: uuid("patient_id").defaultRandom().primaryKey(),
  userId: uuid("user_id").unique().notNull().references(() => users.userId, { onDelete: "cascade" }),
  dob: timestamp("dob").notNull(),
  gender: text("gender", { enum: ["Male", "Female", "Other"] }).notNull(),
  bloodType: text("blood_type", { enum: ["A+", "A-", "B+", "B-", "O+", "O-", "AB+", "AB-"] }),
  allergy: text("allergy"),
  surgery: text("surgery"),
  medical_issue: text("medical_issue"),
  emergencyContact: varchar("emergency_contact", { length: 255 }),
});


export const hospitals = pgTable("hospitals", {
  hospitalId: uuid("hospital_id").defaultRandom().primaryKey(),
  name: varchar("name", { length: 255 }).notNull(),
  address: text("address").notNull(),
  phone: varchar("phone", { length: 20 }).unique().notNull(),
  totalBeds: integer("total_beds").default(0),
  availableBeds: integer("available_beds").default(0),
  icuBeds: integer("icu_beds").default(0),
  ventilators: integer("ventilators").default(0),
  createdAt: timestamp("created_at").defaultNow(),
});

// ✅ 3. Doctors Table
export const doctors = pgTable("doctors", {
  doctorId: uuid("doctor_id").defaultRandom().primaryKey(),
  userId: uuid("user_id").unique().notNull().references(() => users.userId, { onDelete: "cascade" }),
  specialization: varchar("specialization", { length: 255 }).notNull(),
  hospitalId: uuid("hospital_id").references(() => hospitals.hospitalId, { onDelete: "set null" }),
  experience: integer("experience").notNull(),
  availability: boolean("availability").default(true),
});

// ✅ 4. Hospitals Table


// ✅ 5. Medical Records Table
export const medicalRecords = pgTable("medical_records", {
  recordId: uuid("record_id").defaultRandom().primaryKey(),
  patientId: uuid("patient_id").notNull().references(() => patients.patientId, { onDelete: "cascade" }),
  doctorId: uuid("doctor_id").references(() => doctors.doctorId, { onDelete: "set null" }),
  hospitalId: uuid("hospital_id").references(() => hospitals.hospitalId, { onDelete: "set null" }),
  diagnosis: text("diagnosis").notNull(),
  prescription: text("prescription"),
  reportUrl: text("report_url"),
  consultationDate: timestamp("consultation_date").defaultNow(),
});

// ✅ 6. Family Medical History Table
export const familyHistory = pgTable("family_history", {
  familyId: uuid("family_id").defaultRandom().primaryKey(),
  patientId: uuid("patient_id").notNull().references(() => patients.patientId, { onDelete: "cascade" }),
  relativeName: varchar("relative_name", { length: 255 }),
  relationship: text("relationship", { enum: ["Father", "Mother", "Sibling", "Grandparent", "Other"] }),
  condition: text("condition").notNull(),
});

// ✅ 7. Appointments Table
export const appointments = pgTable("appointments", {
  appointmentId: uuid("appointment_id").defaultRandom().primaryKey(),
  patientId: uuid("patient_id").notNull().references(() => patients.patientId, { onDelete: "cascade" }),
  doctorId: uuid("doctor_id").notNull().references(() => doctors.doctorId, { onDelete: "cascade" }),
  hospitalId: uuid("hospital_id").references(() => hospitals.hospitalId, { onDelete: "set null" }),
  appointmentDate: timestamp("appointment_date").notNull(),
  status: text("status", { enum: ["Scheduled", "Completed", "Cancelled"] }).default("Scheduled"),
  consultationType: text("consultation_type", { enum: ["In-Person", "Video"] }),
});

// ✅ 8. Emergency Requests Table
export const emergencyRequests = pgTable("emergency_requests", {
  requestId: uuid("request_id").defaultRandom().primaryKey(),
  patientId: uuid("patient_id").notNull().references(() => patients.patientId, { onDelete: "cascade" }),
  hospitalId: uuid("hospital_id").notNull().references(() => hospitals.hospitalId, { onDelete: "cascade" }),
  urgencyLevel: text("urgency_level", { enum: ["Low", "Medium", "High", "Critical"] }),
  status: text("status", { enum: ["Pending", "Accepted", "Rejected"] }).default("Pending"),
  createdAt: timestamp("created_at").defaultNow(),
});

// ✅ 9. Prescriptions Table
export const prescriptions = pgTable("prescriptions", {
  prescriptionId: uuid("prescription_id").defaultRandom().primaryKey(),
  patientId: uuid("patient_id").notNull().references(() => patients.patientId, { onDelete: "cascade" }),
  doctorId: uuid("doctor_id").notNull().references(() => doctors.doctorId, { onDelete: "cascade" }),
  issuedDate: timestamp("issued_date").defaultNow(),
  medicines: json("medicines").notNull(), // Store medicines as a JSON object
});

// ✅ Define Relations


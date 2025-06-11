-- CreateEnum
CREATE TYPE "BedType" AS ENUM ('General', 'ICU', 'Emergency', 'Pediatric', 'Cardiac', 'Surgical');

-- CreateEnum
CREATE TYPE "BedStatus" AS ENUM ('Available', 'Occupied', 'Reserved', 'Maintenance');

-- CreateTable
CREATE TABLE "beds" (
    "bed_id" TEXT NOT NULL,
    "hospital_id" TEXT NOT NULL,
    "type" "BedType" NOT NULL DEFAULT 'General',
    "status" "BedStatus" NOT NULL DEFAULT 'Available',
    "room" TEXT NOT NULL,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "beds_pkey" PRIMARY KEY ("bed_id")
);

-- AddForeignKey
ALTER TABLE "beds" ADD CONSTRAINT "beds_hospital_id_fkey" FOREIGN KEY ("hospital_id") REFERENCES "hospitals"("id") ON DELETE CASCADE ON UPDATE CASCADE;

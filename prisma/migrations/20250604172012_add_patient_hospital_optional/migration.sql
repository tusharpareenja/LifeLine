/*
  Warnings:

  - You are about to drop the `_HospitalToPatient` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "_HospitalToPatient" DROP CONSTRAINT "_HospitalToPatient_A_fkey";

-- DropForeignKey
ALTER TABLE "_HospitalToPatient" DROP CONSTRAINT "_HospitalToPatient_B_fkey";

-- AlterTable
ALTER TABLE "patients" ADD COLUMN     "hospital_id" TEXT;

-- DropTable
DROP TABLE "_HospitalToPatient";

-- AddForeignKey
ALTER TABLE "patients" ADD CONSTRAINT "patients_hospital_id_fkey" FOREIGN KEY ("hospital_id") REFERENCES "hospitals"("id") ON DELETE CASCADE ON UPDATE CASCADE;

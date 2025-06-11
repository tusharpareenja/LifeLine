-- AlterTable
ALTER TABLE "beds" ADD COLUMN     "patient_id" TEXT;

-- AddForeignKey
ALTER TABLE "beds" ADD CONSTRAINT "beds_patient_id_fkey" FOREIGN KEY ("patient_id") REFERENCES "patients"("id") ON DELETE SET NULL ON UPDATE CASCADE;

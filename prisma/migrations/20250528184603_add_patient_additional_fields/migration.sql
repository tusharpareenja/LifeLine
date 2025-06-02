/*
  Warnings:

  - The `hasSubsidy` column on the `patients` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- AlterTable
ALTER TABLE "patients" DROP COLUMN "hasSubsidy",
ADD COLUMN     "hasSubsidy" BOOLEAN;

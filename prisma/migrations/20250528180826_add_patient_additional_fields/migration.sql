-- AlterTable
ALTER TABLE "patients" ADD COLUMN     "geneticDiseases" TEXT,
ADD COLUMN     "hasSubsidy" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "longTermMedication" TEXT,
ADD COLUMN     "subsidyDetails" TEXT,
ADD COLUMN     "subsidyType" TEXT,
ADD COLUMN     "yearlyIncome" TEXT;

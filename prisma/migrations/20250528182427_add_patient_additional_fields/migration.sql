-- AlterTable
ALTER TABLE "patients" ALTER COLUMN "hasSubsidy" DROP NOT NULL,
ALTER COLUMN "hasSubsidy" DROP DEFAULT,
ALTER COLUMN "hasSubsidy" SET DATA TYPE TEXT;

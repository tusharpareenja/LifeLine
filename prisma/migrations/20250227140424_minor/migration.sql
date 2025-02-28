-- AlterTable
ALTER TABLE "doctors" ALTER COLUMN "specialization" DROP NOT NULL,
ALTER COLUMN "experience" SET DEFAULT 0;

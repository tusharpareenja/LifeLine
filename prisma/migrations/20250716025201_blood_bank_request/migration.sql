-- CreateTable
CREATE TABLE "blood_bank_request" (
    "id" TEXT NOT NULL,
    "hospitalId" TEXT NOT NULL,
    "bloodType" "BloodType" NOT NULL,
    "quantity" INTEGER NOT NULL DEFAULT 1,
    "status" "RequestStatus" NOT NULL DEFAULT 'Pending',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "blood_bank_request_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "blood_bank_request" ADD CONSTRAINT "blood_bank_request_hospitalId_fkey" FOREIGN KEY ("hospitalId") REFERENCES "hospitals"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "blood_bank_request" ADD CONSTRAINT "blood_bank_request_hospitalId_bloodType_fkey" FOREIGN KEY ("hospitalId", "bloodType") REFERENCES "blood_bank_stock"("hospitalId", "bloodType") ON DELETE CASCADE ON UPDATE CASCADE;

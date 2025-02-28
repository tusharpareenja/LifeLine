-- CreateTable
CREATE TABLE "_DoctorToPatient" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL,

    CONSTRAINT "_DoctorToPatient_AB_pkey" PRIMARY KEY ("A","B")
);

-- CreateIndex
CREATE INDEX "_DoctorToPatient_B_index" ON "_DoctorToPatient"("B");

-- AddForeignKey
ALTER TABLE "_DoctorToPatient" ADD CONSTRAINT "_DoctorToPatient_A_fkey" FOREIGN KEY ("A") REFERENCES "doctors"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_DoctorToPatient" ADD CONSTRAINT "_DoctorToPatient_B_fkey" FOREIGN KEY ("B") REFERENCES "patients"("id") ON DELETE CASCADE ON UPDATE CASCADE;

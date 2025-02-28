/*
  Warnings:

  - You are about to drop the `credetials` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
DROP TABLE "credetials";

-- CreateTable
CREATE TABLE "credentials" (
    "user_id" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "phone" TEXT,
    "role" "Role" NOT NULL DEFAULT 'Patient',
    "profile_pic" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "credentials_pkey" PRIMARY KEY ("user_id")
);

-- CreateIndex
CREATE UNIQUE INDEX "credentials_email_key" ON "credentials"("email");

-- CreateIndex
CREATE UNIQUE INDEX "credentials_phone_key" ON "credentials"("phone");

/*
  Warnings:

  - The primary key for the `credentials` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `user_id` on the `credentials` table. All the data in the column will be lost.
  - The required column `id` was added to the `credentials` table with a prisma-level default value. This is not possible if the table is not empty. Please add this column as optional, then populate it before making it required.

*/
-- AlterTable
ALTER TABLE "credentials" DROP CONSTRAINT "credentials_pkey",
DROP COLUMN "user_id",
ADD COLUMN     "id" TEXT NOT NULL,
ADD CONSTRAINT "credentials_pkey" PRIMARY KEY ("id");

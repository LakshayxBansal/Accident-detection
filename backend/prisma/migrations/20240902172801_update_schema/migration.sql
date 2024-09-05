/*
  Warnings:

  - You are about to drop the column `timestamp` on the `Accident` table. All the data in the column will be lost.
  - You are about to drop the column `bday` on the `User` table. All the data in the column will be lost.
  - You are about to drop the `Notification` table. If the table is not empty, all the data it contains will be lost.
  - A unique constraint covering the columns `[contact]` on the table `User` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `scooterId` to the `Accident` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updatedAt` to the `Scooter` table without a default value. This is not possible if the table is not empty.
  - Made the column `model` on table `Scooter` required. This step will fail if there are existing NULL values in that column.
  - Added the required column `updatedAt` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Notification" DROP CONSTRAINT "Notification_accidentId_fkey";

-- AlterTable
ALTER TABLE "Accident" DROP COLUMN "timestamp",
ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "scooterId" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Scooter" ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL,
ALTER COLUMN "model" SET NOT NULL;

-- AlterTable
ALTER TABLE "User" DROP COLUMN "bday",
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL;

-- DropTable
DROP TABLE "Notification";

-- CreateIndex
CREATE UNIQUE INDEX "User_contact_key" ON "User"("contact");

-- AddForeignKey
ALTER TABLE "Accident" ADD CONSTRAINT "Accident_scooterId_fkey" FOREIGN KEY ("scooterId") REFERENCES "Scooter"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

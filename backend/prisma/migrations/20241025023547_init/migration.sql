/*
  Warnings:

  - You are about to drop the `Contact` table. If the table is not empty, all the data it contains will be lost.
  - A unique constraint covering the columns `[contact]` on the table `User` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `contact` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Contact" DROP CONSTRAINT "Contact_userId_fkey";

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "contact" TEXT NOT NULL;

-- DropTable
DROP TABLE "Contact";

-- CreateIndex
CREATE UNIQUE INDEX "User_contact_key" ON "User"("contact");

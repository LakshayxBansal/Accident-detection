/*
  Warnings:

  - A unique constraint covering the columns `[vehicleNumber]` on the table `Scooter` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Scooter_vehicleNumber_key" ON "Scooter"("vehicleNumber");

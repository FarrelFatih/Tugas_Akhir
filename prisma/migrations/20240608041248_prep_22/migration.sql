/*
  Warnings:

  - You are about to drop the column `deletedAt` on the `FlightDataSQL` table. All the data in the column will be lost.
  - You are about to drop the column `updateAt` on the `FlightDataSQL` table. All the data in the column will be lost.
  - You are about to drop the column `deletedAt` on the `FlightEmissionSQL` table. All the data in the column will be lost.
  - You are about to drop the column `updateAt` on the `FlightEmissionSQL` table. All the data in the column will be lost.
  - You are about to drop the column `deletedAt` on the `FlightPriceSQL` table. All the data in the column will be lost.
  - You are about to drop the column `updateAt` on the `FlightPriceSQL` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "FlightDataSQL" DROP COLUMN "deletedAt",
DROP COLUMN "updateAt";

-- AlterTable
ALTER TABLE "FlightEmissionSQL" DROP COLUMN "deletedAt",
DROP COLUMN "updateAt";

-- AlterTable
ALTER TABLE "FlightPriceSQL" DROP COLUMN "deletedAt",
DROP COLUMN "updateAt";

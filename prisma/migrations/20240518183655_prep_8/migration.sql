/*
  Warnings:

  - You are about to drop the `FlightDataSQL` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `FlightEmissionSQL` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `FlightMergedSQL` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `FlightPriceSQL` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "FlightDataSQL" DROP CONSTRAINT "FlightDataSQL_flightPriceSQLId_fkey";

-- DropForeignKey
ALTER TABLE "FlightEmissionSQL" DROP CONSTRAINT "FlightEmissionSQL_flightDataSQLId_fkey";

-- DropTable
DROP TABLE "FlightDataSQL";

-- DropTable
DROP TABLE "FlightEmissionSQL";

-- DropTable
DROP TABLE "FlightMergedSQL";

-- DropTable
DROP TABLE "FlightPriceSQL";

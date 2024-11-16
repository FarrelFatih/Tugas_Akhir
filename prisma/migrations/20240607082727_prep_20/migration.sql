/*
  Warnings:

  - Added the required column `updated_at` to the `FlightDataSQL` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updated_at` to the `FlightEmissionSQL` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updated_at` to the `FlightPriceSQL` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "FlightDataSQL" ADD COLUMN     "updated_at" TIMESTAMP(3) NOT NULL;

-- AlterTable
ALTER TABLE "FlightEmissionSQL" ADD COLUMN     "updated_at" TIMESTAMP(3) NOT NULL;

-- AlterTable
ALTER TABLE "FlightPriceSQL" ADD COLUMN     "updated_at" TIMESTAMP(3) NOT NULL;

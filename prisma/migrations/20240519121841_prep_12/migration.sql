/*
  Warnings:

  - You are about to drop the column `aircraft_type` on the `FlightMergedSQL` table. All the data in the column will be lost.
  - You are about to drop the column `airline_name` on the `FlightMergedSQL` table. All the data in the column will be lost.
  - You are about to drop the column `avg_co2_emission_for_this_route` on the `FlightMergedSQL` table. All the data in the column will be lost.
  - You are about to drop the column `co2_emissions` on the `FlightMergedSQL` table. All the data in the column will be lost.
  - You are about to drop the column `co2_percentage` on the `FlightMergedSQL` table. All the data in the column will be lost.
  - You are about to drop the column `dest_airport_code` on the `FlightMergedSQL` table. All the data in the column will be lost.
  - You are about to drop the column `dest_country` on the `FlightMergedSQL` table. All the data in the column will be lost.
  - You are about to drop the column `flight_number` on the `FlightMergedSQL` table. All the data in the column will be lost.
  - You are about to drop the column `from_airport_code` on the `FlightMergedSQL` table. All the data in the column will be lost.
  - You are about to drop the column `from_country` on the `FlightMergedSQL` table. All the data in the column will be lost.
  - You are about to drop the column `scan_date` on the `FlightMergedSQL` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "FlightMergedSQL" DROP COLUMN "aircraft_type",
DROP COLUMN "airline_name",
DROP COLUMN "avg_co2_emission_for_this_route",
DROP COLUMN "co2_emissions",
DROP COLUMN "co2_percentage",
DROP COLUMN "dest_airport_code",
DROP COLUMN "dest_country",
DROP COLUMN "flight_number",
DROP COLUMN "from_airport_code",
DROP COLUMN "from_country",
DROP COLUMN "scan_date",
ADD COLUMN     "flight_data" JSONB;

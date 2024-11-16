/*
  Warnings:

  - You are about to drop the `FlightEmissionSQL` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `FlightPriceSQL` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "FlightDataSQL" DROP CONSTRAINT "FlightDataSQL_flightPriceSQLId_fkey";

-- DropForeignKey
ALTER TABLE "FlightEmissionSQL" DROP CONSTRAINT "FlightEmissionSQL_flightDataSQLId_fkey";

-- DropTable
DROP TABLE "FlightEmissionSQL";

-- DropTable
DROP TABLE "FlightPriceSQL";

-- CreateTable
CREATE TABLE "FligthPriceSQL" (
    "id" SERIAL NOT NULL,
    "price" INTEGER,
    "currency" TEXT,

    CONSTRAINT "FligthPriceSQL_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "FligthEmissionSQL" (
    "id" SERIAL NOT NULL,
    "co2_emissions" INTEGER,
    "avg_co2_emission_for_this_route" INTEGER,
    "co2_percentage" TEXT,
    "flightDataSQLId" INTEGER NOT NULL,

    CONSTRAINT "FligthEmissionSQL_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "FlightDataSQL" ADD CONSTRAINT "FlightDataSQL_flightPriceSQLId_fkey" FOREIGN KEY ("flightPriceSQLId") REFERENCES "FligthPriceSQL"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "FligthEmissionSQL" ADD CONSTRAINT "FligthEmissionSQL_flightDataSQLId_fkey" FOREIGN KEY ("flightDataSQLId") REFERENCES "FlightDataSQL"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

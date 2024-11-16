/*
  Warnings:

  - You are about to drop the `FligthEmissionSQL` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `FligthPriceSQL` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "FlightDataSQL" DROP CONSTRAINT "FlightDataSQL_flightPriceSQLId_fkey";

-- DropForeignKey
ALTER TABLE "FligthEmissionSQL" DROP CONSTRAINT "FligthEmissionSQL_flightDataSQLId_fkey";

-- DropTable
DROP TABLE "FligthEmissionSQL";

-- DropTable
DROP TABLE "FligthPriceSQL";

-- CreateTable
CREATE TABLE "FlightPriceSQL" (
    "id" SERIAL NOT NULL,
    "price" INTEGER,
    "currency" TEXT,

    CONSTRAINT "FlightPriceSQL_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "FlightEmissionSQL" (
    "id" SERIAL NOT NULL,
    "co2_emissions" INTEGER,
    "avg_co2_emission_for_this_route" INTEGER,
    "co2_percentage" TEXT,
    "flightDataSQLId" INTEGER NOT NULL,

    CONSTRAINT "FlightEmissionSQL_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "FlightDataSQL" ADD CONSTRAINT "FlightDataSQL_flightPriceSQLId_fkey" FOREIGN KEY ("flightPriceSQLId") REFERENCES "FlightPriceSQL"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "FlightEmissionSQL" ADD CONSTRAINT "FlightEmissionSQL_flightDataSQLId_fkey" FOREIGN KEY ("flightDataSQLId") REFERENCES "FlightDataSQL"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

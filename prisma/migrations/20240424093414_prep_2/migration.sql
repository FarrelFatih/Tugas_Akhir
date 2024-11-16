/*
  Warnings:

  - You are about to drop the `flight_data_SQL` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
DROP TABLE "flight_data_SQL";

-- CreateTable
CREATE TABLE "FLightDataSQL" (
    "id" SERIAL NOT NULL,
    "from_airport_code" TEXT NOT NULL,
    "from_country" TEXT NOT NULL,
    "dest_airport_code" TEXT NOT NULL,
    "dest_country" TEXT NOT NULL,
    "aircraft_type" TEXT NOT NULL,
    "airline_name" TEXT NOT NULL,
    "flight_number" TEXT NOT NULL,
    "scan_date" TEXT NOT NULL,

    CONSTRAINT "FLightDataSQL_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "FlightDataSQL" (
    "id" SERIAL NOT NULL,
    "from_airport_code" TEXT NOT NULL,
    "from_country" TEXT NOT NULL,
    "dest_airport_code" TEXT NOT NULL,
    "dest_country" TEXT NOT NULL,
    "aircraft_type" TEXT NOT NULL,
    "airline_name" TEXT NOT NULL,
    "flight_number" TEXT NOT NULL,
    "scan_date" TEXT NOT NULL,

    CONSTRAINT "FlightDataSQL_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "FlightPriceSQL" (
    "id" SERIAL NOT NULL,
    "price" INTEGER NOT NULL,
    "currency" TEXT NOT NULL,
    "flightDataSQLId" INTEGER NOT NULL,

    CONSTRAINT "FlightPriceSQL_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "FlightEmissionSQL" (
    "id" SERIAL NOT NULL,
    "co2_emissions" INTEGER NOT NULL,
    "avg_co2_emission_for_this_route" INTEGER NOT NULL,
    "co2_percentage" TEXT NOT NULL,
    "flightDataSQLId" INTEGER NOT NULL,

    CONSTRAINT "FlightEmissionSQL_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "FLightDataSQL_id_key" ON "FLightDataSQL"("id");

-- CreateIndex
CREATE UNIQUE INDEX "FlightDataSQL_id_key" ON "FlightDataSQL"("id");

-- AddForeignKey
ALTER TABLE "FlightPriceSQL" ADD CONSTRAINT "FlightPriceSQL_flightDataSQLId_fkey" FOREIGN KEY ("flightDataSQLId") REFERENCES "FlightDataSQL"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "FlightEmissionSQL" ADD CONSTRAINT "FlightEmissionSQL_flightDataSQLId_fkey" FOREIGN KEY ("flightDataSQLId") REFERENCES "FlightDataSQL"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

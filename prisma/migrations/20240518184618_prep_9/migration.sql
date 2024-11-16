-- CreateTable
CREATE TABLE "FlightPriceSQL" (
    "id" SERIAL NOT NULL,
    "price" INTEGER,
    "currency" TEXT,

    CONSTRAINT "FlightPriceSQL_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "FlightDataSQL" (
    "id" SERIAL NOT NULL,
    "from_airport_code" TEXT,
    "from_country" TEXT,
    "dest_airport_code" TEXT,
    "dest_country" TEXT,
    "aircraft_type" TEXT,
    "airline_name" TEXT,
    "flight_number" TEXT,
    "scan_date" TEXT,
    "flightPriceSQLId" INTEGER NOT NULL,

    CONSTRAINT "FlightDataSQL_pkey" PRIMARY KEY ("id")
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

-- CreateTable
CREATE TABLE "FlightMergedSQL" (
    "id" SERIAL NOT NULL,
    "price" INTEGER,
    "currency" TEXT,
    "from_airport_code" TEXT,
    "from_country" TEXT,
    "dest_airport_code" TEXT,
    "dest_country" TEXT,
    "aircraft_type" TEXT,
    "airline_name" TEXT,
    "flight_number" TEXT,
    "scan_date" TEXT,
    "co2_emissions" INTEGER,
    "avg_co2_emission_for_this_route" INTEGER,
    "co2_percentage" TEXT,

    CONSTRAINT "FlightMergedSQL_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "FlightDataSQL_id_key" ON "FlightDataSQL"("id");

-- AddForeignKey
ALTER TABLE "FlightDataSQL" ADD CONSTRAINT "FlightDataSQL_flightPriceSQLId_fkey" FOREIGN KEY ("flightPriceSQLId") REFERENCES "FlightPriceSQL"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "FlightEmissionSQL" ADD CONSTRAINT "FlightEmissionSQL_flightDataSQLId_fkey" FOREIGN KEY ("flightDataSQLId") REFERENCES "FlightDataSQL"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

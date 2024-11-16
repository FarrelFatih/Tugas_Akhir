-- CreateTable
CREATE TABLE "FlightMergedSQL" (
    "id" SERIAL NOT NULL,
    "price" INTEGER NOT NULL,
    "currency" TEXT NOT NULL,
    "from_airport_code" TEXT NOT NULL,
    "from_country" TEXT NOT NULL,
    "dest_airport_code" TEXT NOT NULL,
    "dest_country" TEXT NOT NULL,
    "aircraft_type" TEXT NOT NULL,
    "airline_name" TEXT NOT NULL,
    "flight_number" TEXT NOT NULL,
    "scan_date" TEXT NOT NULL,
    "co2_emissions" INTEGER NOT NULL,
    "avg_co2_emission_for_this_route" INTEGER NOT NULL,
    "co2_percentage" TEXT NOT NULL,

    CONSTRAINT "FlightMergedSQL_pkey" PRIMARY KEY ("id")
);

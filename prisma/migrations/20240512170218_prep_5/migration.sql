-- CreateTable
CREATE TABLE "FlightInformationSQL" (
    "id" SERIAL NOT NULL,
    "price" INTEGER NOT NULL,
    "currency" TEXT NOT NULL,
    "from_country" TEXT NOT NULL,
    "dest_country" TEXT NOT NULL,
    "airline_name" TEXT NOT NULL,
    "co2_emissions" INTEGER NOT NULL,
    "c02_percentage" TEXT NOT NULL,

    CONSTRAINT "FlightInformationSQL_pkey" PRIMARY KEY ("id")
);

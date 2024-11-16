-- CreateTable
CREATE TABLE "flight_data_SQL" (
    "id" SERIAL NOT NULL,
    "from_airport_code" TEXT NOT NULL,
    "from_country" TEXT NOT NULL,
    "dest_airport_code" TEXT NOT NULL,
    "dest_country" TEXT NOT NULL,
    "aircraft_type" TEXT NOT NULL,
    "airline_name" TEXT NOT NULL,
    "flight_number" TEXT NOT NULL,
    "scan_date" TEXT NOT NULL,

    CONSTRAINT "flight_data_SQL_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "flight_data_SQL_id_key" ON "flight_data_SQL"("id");

/*
  Warnings:

  - You are about to drop the column `flightDataSQLId` on the `FlightPriceSQL` table. All the data in the column will be lost.
  - Added the required column `flightPriceSQLId` to the `FlightDataSQL` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "FlightPriceSQL" DROP CONSTRAINT "FlightPriceSQL_flightDataSQLId_fkey";

-- AlterTable
ALTER TABLE "FlightDataSQL" ADD COLUMN     "flightPriceSQLId" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "FlightPriceSQL" DROP COLUMN "flightDataSQLId";

-- AddForeignKey
ALTER TABLE "FlightDataSQL" ADD CONSTRAINT "FlightDataSQL_flightPriceSQLId_fkey" FOREIGN KEY ("flightPriceSQLId") REFERENCES "FlightPriceSQL"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

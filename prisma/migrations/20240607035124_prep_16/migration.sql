/*
  Warnings:

  - You are about to drop the `DBCompareSQL` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `scan_date` to the `FlightMergedSQL` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "FlightMergedSQL" ADD COLUMN     "scan_date" TIMESTAMP(3) NOT NULL;

-- DropTable
DROP TABLE "DBCompareSQL";

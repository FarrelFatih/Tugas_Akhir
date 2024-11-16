/*
  Warnings:

  - You are about to drop the column `scan_date` on the `FlightMergedSQL` table. All the data in the column will be lost.
  - Added the required column `updated_at` to the `FlightMergedSQL` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "FlightMergedSQL" DROP COLUMN "scan_date",
ADD COLUMN     "updated_at" TIMESTAMP(3) NOT NULL;

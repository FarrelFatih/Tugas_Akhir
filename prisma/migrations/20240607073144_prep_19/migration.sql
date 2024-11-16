/*
  Warnings:

  - Made the column `updated_at` on table `FlightMergedSQL` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "FlightMergedSQL" ALTER COLUMN "updated_at" SET NOT NULL;

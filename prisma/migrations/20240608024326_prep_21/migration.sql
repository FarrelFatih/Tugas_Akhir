/*
  Warnings:

  - You are about to drop the column `updated_at` on the `FlightDataSQL` table. All the data in the column will be lost.
  - You are about to drop the column `updated_at` on the `FlightEmissionSQL` table. All the data in the column will be lost.
  - You are about to drop the column `updated_at` on the `FlightMergedSQL` table. All the data in the column will be lost.
  - You are about to drop the column `updated_at` on the `FlightPriceSQL` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "FlightDataSQL" DROP COLUMN "updated_at",
ADD COLUMN     "deletedAt" TIMESTAMP(3),
ADD COLUMN     "updateAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP;

-- AlterTable
ALTER TABLE "FlightEmissionSQL" DROP COLUMN "updated_at",
ADD COLUMN     "deletedAt" TIMESTAMP(3),
ADD COLUMN     "updateAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP;

-- AlterTable
ALTER TABLE "FlightMergedSQL" DROP COLUMN "updated_at";

-- AlterTable
ALTER TABLE "FlightPriceSQL" DROP COLUMN "updated_at",
ADD COLUMN     "deletedAt" TIMESTAMP(3),
ADD COLUMN     "updateAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP;

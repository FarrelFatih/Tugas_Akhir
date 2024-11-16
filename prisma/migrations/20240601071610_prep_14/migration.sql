/*
  Warnings:

  - You are about to drop the `SyncState` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
DROP TABLE "SyncState";

-- CreateTable
CREATE TABLE "DBCompareSQL" (
    "id" SERIAL NOT NULL,
    "price" INTEGER,
    "currency" TEXT,
    "flight_data" JSONB,

    CONSTRAINT "DBCompareSQL_pkey" PRIMARY KEY ("id")
);

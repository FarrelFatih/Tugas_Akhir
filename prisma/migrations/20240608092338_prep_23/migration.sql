-- CreateTable
CREATE TABLE "SyncTimeSQL" (
    "id" SERIAL NOT NULL,
    "lastSync" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "SyncTimeSQL_pkey" PRIMARY KEY ("id")
);

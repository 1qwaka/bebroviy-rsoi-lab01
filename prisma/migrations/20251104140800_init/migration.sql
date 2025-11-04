-- CreateTable
CREATE TABLE "Person" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "age" INTEGER,
    "address" TEXT,
    "work" TEXT,

    CONSTRAINT "Person_pkey" PRIMARY KEY ("id")
);

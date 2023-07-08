-- CreateTable
CREATE TABLE "Pre_register" (
    "id" SERIAL NOT NULL,
    "misidn" TEXT,
    "code" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Pre_register_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Pre_register_misidn_key" ON "Pre_register"("misidn");

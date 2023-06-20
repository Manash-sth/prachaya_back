/*
  Warnings:

  - A unique constraint covering the columns `[profileid,threadid]` on the table `Like` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Like_profileid_threadid_key" ON "Like"("profileid", "threadid");

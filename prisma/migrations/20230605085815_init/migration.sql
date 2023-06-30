/*
  Warnings:

  - You are about to drop the column `firstname` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `lastname` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `middlename` on the `User` table. All the data in the column will be lost.
  - Added the required column `firstname` to the `Profile` table without a default value. This is not possible if the table is not empty.
  - Added the required column `lastname` to the `Profile` table without a default value. This is not possible if the table is not empty.
  - Added the required column `middlename` to the `Profile` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Profile" ADD COLUMN     "firstname" TEXT NOT NULL,
ADD COLUMN     "lastname" TEXT NOT NULL,
ADD COLUMN     "middlename" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "User" DROP COLUMN "firstname",
DROP COLUMN "lastname",
DROP COLUMN "middlename";

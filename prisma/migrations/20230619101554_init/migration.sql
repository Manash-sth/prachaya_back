/*
  Warnings:

  - You are about to drop the column `avatar` on the `User` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Profile" ADD COLUMN     "avatar" TEXT NOT NULL DEFAULT 'https://res.cloudinary.com/ddqyll9ug/image/upload/v1687169464/avatarAsset_1_fqp1pi.png';

-- AlterTable
ALTER TABLE "User" DROP COLUMN "avatar";

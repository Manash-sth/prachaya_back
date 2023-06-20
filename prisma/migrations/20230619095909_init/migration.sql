/*
  Warnings:

  - The `del_user_info` column on the `Profile` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `del_user_info` column on the `User` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- AlterTable
ALTER TABLE "Profile" DROP COLUMN "del_user_info",
ADD COLUMN     "del_user_info" JSONB;

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "avatar" TEXT NOT NULL DEFAULT '',
DROP COLUMN "del_user_info",
ADD COLUMN     "del_user_info" JSONB;

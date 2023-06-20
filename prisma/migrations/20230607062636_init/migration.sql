-- AlterTable
ALTER TABLE "Profile" ADD COLUMN     "del_user_info" TEXT;

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "del_user_info" TEXT,
ALTER COLUMN "misidn" DROP NOT NULL,
ALTER COLUMN "email" DROP NOT NULL;

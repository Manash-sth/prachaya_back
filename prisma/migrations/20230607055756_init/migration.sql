-- DropForeignKey
ALTER TABLE "Comment" DROP CONSTRAINT "Comment_parentid_fkey";

-- DropForeignKey
ALTER TABLE "Thread" DROP CONSTRAINT "Thread_categoryId_fkey";

-- DropForeignKey
ALTER TABLE "Thread" DROP CONSTRAINT "Thread_creatorid_fkey";

-- AddForeignKey
ALTER TABLE "Thread" ADD CONSTRAINT "Thread_creatorid_fkey" FOREIGN KEY ("creatorid") REFERENCES "Profile"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Thread" ADD CONSTRAINT "Thread_categoryId_fkey" FOREIGN KEY ("categoryId") REFERENCES "Category"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Comment" ADD CONSTRAINT "Comment_parentid_fkey" FOREIGN KEY ("parentid") REFERENCES "Comment"("id") ON DELETE CASCADE ON UPDATE CASCADE;

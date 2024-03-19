-- DropForeignKey
ALTER TABLE "Chat" DROP CONSTRAINT "Chat_ownerPhone_fkey";

-- DropIndex
DROP INDEX "User_name_key";

-- AddForeignKey
ALTER TABLE "Chat" ADD CONSTRAINT "Chat_ownerPhone_fkey" FOREIGN KEY ("ownerPhone") REFERENCES "User"("phone") ON DELETE RESTRICT ON UPDATE CASCADE;

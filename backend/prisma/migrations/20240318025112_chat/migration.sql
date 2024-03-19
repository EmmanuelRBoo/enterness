/*
  Warnings:

  - You are about to drop the column `userId` on the `Chat` table. All the data in the column will be lost.
  - You are about to drop the column `with` on the `Chat` table. All the data in the column will be lost.
  - Added the required column `ownerPhone` to the `Chat` table without a default value. This is not possible if the table is not empty.
  - Added the required column `userPhone` to the `Chat` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Chat" DROP CONSTRAINT "Chat_userId_fkey";

-- AlterTable
ALTER TABLE "Chat" DROP COLUMN "userId",
DROP COLUMN "with",
ADD COLUMN     "ownerPhone" TEXT NOT NULL,
ADD COLUMN     "userPhone" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "Chat" ADD CONSTRAINT "Chat_ownerPhone_fkey" FOREIGN KEY ("ownerPhone") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

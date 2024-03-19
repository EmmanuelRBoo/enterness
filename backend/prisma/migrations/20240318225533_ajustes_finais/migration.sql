/*
  Warnings:

  - Added the required column `ownerName` to the `Chat` table without a default value. This is not possible if the table is not empty.
  - Added the required column `userName` to the `Chat` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Chat" ADD COLUMN     "ownerName" TEXT NOT NULL,
ADD COLUMN     "userName" TEXT NOT NULL;

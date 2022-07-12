/*
  Warnings:

  - You are about to drop the `Companies` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `_CompaniesToUser` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "_CompaniesToUser" DROP CONSTRAINT "_CompaniesToUser_A_fkey";

-- DropForeignKey
ALTER TABLE "_CompaniesToUser" DROP CONSTRAINT "_CompaniesToUser_B_fkey";

-- AlterTable
ALTER TABLE "User" ALTER COLUMN "phone_number" SET DATA TYPE TEXT;

-- DropTable
DROP TABLE "Companies";

-- DropTable
DROP TABLE "_CompaniesToUser";

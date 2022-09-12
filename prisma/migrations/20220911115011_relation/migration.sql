/*
  Warnings:

  - You are about to drop the `AuthorsOnPost` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `userId` to the `Post` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `Post` ADD COLUMN `userId` INTEGER NOT NULL;

-- DropTable
DROP TABLE `AuthorsOnPost`;

/*
  Warnings:

  - A unique constraint covering the columns `[id,username]` on the table `User` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `userName` to the `Comments` table without a default value. This is not possible if the table is not empty.
  - Added the required column `userName` to the `Post` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `comments` ADD COLUMN `userName` VARCHAR(191) NOT NULL;

-- AlterTable
ALTER TABLE `post` ADD COLUMN `userName` VARCHAR(191) NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX `User_id_username_key` ON `User`(`id`, `username`);

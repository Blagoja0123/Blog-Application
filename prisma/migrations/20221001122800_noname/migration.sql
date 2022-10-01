/*
  Warnings:

  - You are about to drop the column `userName` on the `comments` table. All the data in the column will be lost.
  - You are about to drop the column `userName` on the `post` table. All the data in the column will be lost.

*/
-- DropIndex
DROP INDEX `User_id_username_key` ON `user`;

-- AlterTable
ALTER TABLE `comments` DROP COLUMN `userName`;

-- AlterTable
ALTER TABLE `post` DROP COLUMN `userName`;

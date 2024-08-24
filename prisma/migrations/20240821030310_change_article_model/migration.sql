/*
  Warnings:

  - You are about to drop the column `tagsId` on the `Article` table. All the data in the column will be lost.
  - You are about to drop the `Tag` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `_ArticleToTag` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE `_ArticleToTag` DROP FOREIGN KEY `_ArticleToTag_A_fkey`;

-- DropForeignKey
ALTER TABLE `_ArticleToTag` DROP FOREIGN KEY `_ArticleToTag_B_fkey`;

-- AlterTable
ALTER TABLE `Article` DROP COLUMN `tagsId`;

-- DropTable
DROP TABLE `Tag`;

-- DropTable
DROP TABLE `_ArticleToTag`;

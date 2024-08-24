/*
  Warnings:

  - You are about to drop the `_ArticleToCategory` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE `_ArticleToCategory` DROP FOREIGN KEY `_ArticleToCategory_A_fkey`;

-- DropForeignKey
ALTER TABLE `_ArticleToCategory` DROP FOREIGN KEY `_ArticleToCategory_B_fkey`;

-- DropTable
DROP TABLE `_ArticleToCategory`;

-- AddForeignKey
ALTER TABLE `Article` ADD CONSTRAINT `Article_categoryId_fkey` FOREIGN KEY (`categoryId`) REFERENCES `Category`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

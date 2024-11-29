/*
  Warnings:

  - You are about to drop the column `nickename` on the `User` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `User` DROP COLUMN `nickename`,
    ADD COLUMN `nickname` VARCHAR(191) NULL;

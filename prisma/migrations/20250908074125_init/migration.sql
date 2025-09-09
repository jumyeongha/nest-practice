/*
  Warnings:

  - Added the required column `status` to the `vote` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `vote` ADD COLUMN `status` VARCHAR(16) NOT NULL;

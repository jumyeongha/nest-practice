/*
  Warnings:

  - Added the required column `vote_count` to the `candidate` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `candidate` ADD COLUMN `vote_count` INTEGER NOT NULL;

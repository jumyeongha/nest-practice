/*
  Warnings:

  - You are about to drop the column `ended_at` on the `candidate` table. All the data in the column will be lost.
  - You are about to drop the column `started_at` on the `candidate` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `candidate` DROP COLUMN `ended_at`,
    DROP COLUMN `started_at`;

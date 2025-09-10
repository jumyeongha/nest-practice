/*
  Warnings:

  - You are about to drop the column `voteed_at` on the `voting_log` table. All the data in the column will be lost.
  - Added the required column `voted_at` to the `voting_log` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `voting_log` DROP COLUMN `voteed_at`,
    ADD COLUMN `voted_at` DATETIME(3) NOT NULL;

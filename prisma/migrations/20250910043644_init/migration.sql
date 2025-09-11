/*
  Warnings:

  - You are about to drop the column `end_at` on the `candidate` table. All the data in the column will be lost.
  - You are about to drop the column `start_at` on the `candidate` table. All the data in the column will be lost.
  - You are about to drop the column `end_at` on the `vote` table. All the data in the column will be lost.
  - You are about to drop the column `start_at` on the `vote` table. All the data in the column will be lost.
  - You are about to drop the column `vote_at` on the `voting_log` table. All the data in the column will be lost.
  - Added the required column `ended_at` to the `candidate` table without a default value. This is not possible if the table is not empty.
  - Added the required column `started_at` to the `candidate` table without a default value. This is not possible if the table is not empty.
  - Added the required column `ended_at` to the `vote` table without a default value. This is not possible if the table is not empty.
  - Added the required column `started_at` to the `vote` table without a default value. This is not possible if the table is not empty.
  - Added the required column `voteed_at` to the `voting_log` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `candidate` DROP COLUMN `end_at`,
    DROP COLUMN `start_at`,
    ADD COLUMN `ended_at` DATETIME(3) NOT NULL,
    ADD COLUMN `started_at` DATETIME(3) NOT NULL;

-- AlterTable
ALTER TABLE `vote` DROP COLUMN `end_at`,
    DROP COLUMN `start_at`,
    ADD COLUMN `ended_at` DATETIME(3) NOT NULL,
    ADD COLUMN `started_at` DATETIME(3) NOT NULL;

-- AlterTable
ALTER TABLE `voting_log` DROP COLUMN `vote_at`,
    ADD COLUMN `voteed_at` DATETIME(3) NOT NULL;

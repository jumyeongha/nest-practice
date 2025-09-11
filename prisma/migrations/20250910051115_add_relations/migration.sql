-- AddForeignKey
ALTER TABLE `candidate` ADD CONSTRAINT `candidate_star_id_fkey` FOREIGN KEY (`star_id`) REFERENCES `star`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

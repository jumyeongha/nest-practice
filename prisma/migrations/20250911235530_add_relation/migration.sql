-- AddForeignKey
ALTER TABLE `candidate` ADD CONSTRAINT `candidate_vote_id_fkey` FOREIGN KEY (`vote_id`) REFERENCES `vote`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `voting_log` ADD CONSTRAINT `voting_log_candidate_id_fkey` FOREIGN KEY (`candidate_id`) REFERENCES `candidate`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `voting_log` ADD CONSTRAINT `voting_log_vote_id_fkey` FOREIGN KEY (`vote_id`) REFERENCES `vote`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `voting_log` ADD CONSTRAINT `voting_log_user_id_fkey` FOREIGN KEY (`user_id`) REFERENCES `user`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

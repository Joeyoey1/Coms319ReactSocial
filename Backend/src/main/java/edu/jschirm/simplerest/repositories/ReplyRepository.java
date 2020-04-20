package edu.jschirm.simplerest.repositories;

import edu.jschirm.simplerest.models.Reply;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ReplyRepository extends JpaRepository<Reply, Long> {
}

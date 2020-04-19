package edu.jschirm.simplerest.repositories;

import edu.jschirm.simplerest.models.Post;
import org.springframework.data.jpa.repository.JpaRepository;

public interface PostRepository extends JpaRepository<Post, Long> {
}

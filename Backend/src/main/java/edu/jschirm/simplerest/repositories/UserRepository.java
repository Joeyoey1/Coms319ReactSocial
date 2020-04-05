package edu.jschirm.simplerest.repositories;

import edu.jschirm.simplerest.models.User;
import org.springframework.data.jpa.repository.JpaRepository;

public interface UserRepository extends JpaRepository<User, Long> {
}

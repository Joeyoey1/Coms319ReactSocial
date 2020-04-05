package edu.jschirm.simplerest.repositories;

import edu.jschirm.simplerest.models.Interest;
import org.springframework.data.jpa.repository.JpaRepository;

public interface InterestRepository extends JpaRepository<Interest, Long> {
}

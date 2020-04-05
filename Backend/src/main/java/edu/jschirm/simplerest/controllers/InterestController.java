package edu.jschirm.simplerest.controllers;


import edu.jschirm.simplerest.models.Interest;
import edu.jschirm.simplerest.repositories.InterestRepository;
import org.springframework.web.bind.annotation.*;

import java.util.Collection;
import java.util.stream.Collectors;

@RestController
public class InterestController {


    private final InterestRepository interestRepository;

    public InterestController(InterestRepository instance) {
        this.interestRepository = instance;
    }


    @PostMapping("/createinterest")
    public Interest createInterest(@RequestBody Interest interest) {
        for (Interest interest1 : this.interestRepository.findAll()) {
            if (interest1.getTitle().equalsIgnoreCase(interest.getTitle())) {
                return null;
            }
        }
        return this.interestRepository.save(interest);
    }

    @GetMapping("/interest/title-search/{title}")
    public Collection<Interest> searchByTitle(@PathVariable String title) {
        return this.interestRepository.findAll().stream().filter(obj -> obj.getTitle().toLowerCase().contains(title.toLowerCase())).collect(Collectors.toList());
    }


    @GetMapping("/interest/location-search/{location}")
    public Collection<Interest> searchByLocation(@PathVariable String location) {
        return this.interestRepository.findAll().stream().filter(obj -> obj.getLocation().toLowerCase().contains(location.toLowerCase())).collect(Collectors.toList());
    }


    @GetMapping("/interest/desription-search/{description}")
    public Collection<Interest> searchByDescription(@PathVariable String description) {
        return this.interestRepository.findAll().stream().filter(obj -> obj.getDescription().toLowerCase().contains(description.toLowerCase())).collect(Collectors.toList());
    }


    @GetMapping("/interest/search/{phrase}")
    public Collection<Interest> searchPhrase(@PathVariable String phrase) {
        return this.interestRepository.findAll().stream().filter(obj -> obj.getDescription().toLowerCase().contains(phrase.toLowerCase()) || obj.getTitle().toLowerCase().contains(phrase.toLowerCase()) || obj.getLocation().toLowerCase().contains(phrase.toLowerCase())).collect(Collectors.toList());
    }

}

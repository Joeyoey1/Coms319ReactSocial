package edu.jschirm.simplerest.controllers;

import edu.jschirm.simplerest.exceptions.UserNotFoundException;
import edu.jschirm.simplerest.models.User;
import edu.jschirm.simplerest.repositories.UserRepository;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
public class UserController {

    private final UserRepository userRepository;


    public UserController(UserRepository instance) {
        this.userRepository = instance;
    }

//    @GetMapping("/users")
//    public List<User> all() {
//        return this.userRepository.findAll();
//    }

    /**
     * This takes in a new user and checks to see if the username is already taken
     * @param newUser
     * @return either the User object or null if the username is take.
     */
    @PostMapping("/createuser")
    public User newUser(@RequestBody User newUser) {
        for (User user : this.userRepository.findAll()) {
            if (user.getUsername().equalsIgnoreCase(newUser.getUsername())) {
                return null;
            }
        }
        return this.userRepository.save(newUser);
    }

//    @GetMapping("/users/{id}")
//    public User one(@PathVariable Long id) {
//        return this.userRepository.findById(id).orElseThrow(() -> new UserNotFoundException(id));
//    }

//    @PutMapping("/users/{id}")
//    public User replaceUserById(@RequestBody User newUser, @PathVariable Long id) {
//        return this.userRepository.findById(id).map(user -> {
//            user.setUsername(newUser.getUsername());
//            user.setPassword(newUser.getPassword());
//            user.setDisplayName(newUser.getDisplayName());
//            return userRepository.save(user);
//        }).orElseGet(() -> {
//            newUser.setId(id);
//            return userRepository.save(newUser);
//        });
//    }

//    @DeleteMapping("/users/{id}")
//    public void deleteUser(@PathVariable Long id) {
//        this.userRepository.deleteById(id);
//    }

    /**
     * This requires a base user object and attempts to log in if  possible.
     * @param attempt
     * @return either the successfully logged in user object or a failed login null.
     */
    @GetMapping("/login")
    public User attemptLogin(@RequestBody User attempt) {
        for (User user : this.userRepository.findAll()) {
            if (user.getUsername().equalsIgnoreCase(attempt.getUsername())) {
                if (user.getPassword().equals(attempt.getPassword())) {
                    return user;
                }
            }
        }
        return null;
    }

}

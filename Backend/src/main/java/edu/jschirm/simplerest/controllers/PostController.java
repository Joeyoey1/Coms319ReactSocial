package edu.jschirm.simplerest.controllers;

import edu.jschirm.simplerest.models.Post;
import edu.jschirm.simplerest.models.User;
import edu.jschirm.simplerest.repositories.PostRepository;
import edu.jschirm.simplerest.repositories.UserRepository;
import org.springframework.web.bind.annotation.*;

import java.sql.Date;
import java.time.Instant;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@CrossOrigin
@RestController
public class PostController {

    private final PostRepository postRepository;
    private final UserRepository userRepository;


    public PostController(PostRepository instance, UserRepository instance2) {
        this.postRepository = instance;
        this.userRepository = instance2;
    }

    @GetMapping("/posts/search/{phrase}")
    public List<Post> getPostsWith(@PathVariable String phrase) {
        return this.postRepository.findAll().stream().filter(obj -> obj.getTitle().toLowerCase().contains(phrase.toLowerCase()) || obj.getContent().toLowerCase().contains(phrase.toLowerCase()) || obj.getAuthor().getDisplayName().toLowerCase().contains(phrase.toLowerCase())).collect(Collectors.toList());
    }

    @PostMapping("/posts/newpost/{id}")
    public Post createNewPost(@RequestBody Post newPost, @PathVariable long id) {
        Optional<User> authorMaybe = this.userRepository.findById(id);
        if (authorMaybe.isPresent()) {
            User author = authorMaybe.get();
            newPost.setAuthor(author);
            this.postRepository.save(newPost);
            author.getPosts().add(newPost);
            this.userRepository.save(author);
            return newPost;
        } else {
            return null;
        }
    }

    @GetMapping("/posts")
    public List<Post> getPosts() {
        return this.postRepository.findAll().stream().sorted((p1, p2) -> (int) (p1.getId() - p2.getId())).collect(Collectors.toList());
    }


    @PostMapping("/posts")
    public List<Post> getPostsByUser(@RequestBody User user) {
        return this.postRepository.findAll().stream().filter(post -> post.getAuthor().getUsername().equalsIgnoreCase(user.getUsername()) || post.getAuthor().getDisplayName().equalsIgnoreCase(user.getDisplayName())).collect(Collectors.toList());
    }

}

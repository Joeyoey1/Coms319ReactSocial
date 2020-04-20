package edu.jschirm.simplerest.controllers;

import edu.jschirm.simplerest.models.Post;
import edu.jschirm.simplerest.models.Reply;
import edu.jschirm.simplerest.models.User;
import edu.jschirm.simplerest.repositories.PostRepository;
import edu.jschirm.simplerest.repositories.ReplyRepository;
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
    private final ReplyRepository replyRepository;


    public PostController(PostRepository instance, UserRepository instance2, ReplyRepository instance3) {
        this.postRepository = instance;
        this.userRepository = instance2;
        this.replyRepository = instance3;
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
        return this.postRepository.findAll().stream().sorted((p1, p2) -> (int) (p2.getId() - p1.getId())).collect(Collectors.toList());
    }

    @GetMapping("/post/like/{postId}/{userId}")
    public Post like(@PathVariable long postId, @PathVariable long userId) {
        Optional<Post> maybePost = this.postRepository.findById(postId);
        Optional<User> maybeUser = this.userRepository.findById(userId);
        if (maybePost.isPresent() && maybeUser.isPresent()) {
            Post post = maybePost.get();
            boolean remove = false;
            for (User user : post.getLikes()) {
                if (user.getId() == userId) {
                    remove = true;
                    break;
                }
            }
            if (remove) {
                post.getLikes().removeIf(user -> user.getId() == userId);
            } else {
                post.getLikes().add(maybeUser.get());
            }
            return this.postRepository.save(post);
        }
        return null;
    }


    @GetMapping("/post/dislike/{postId}/{userId}")
    public Post disLike(@PathVariable long postId, @PathVariable long userId) {
        Optional<Post> maybePost = this.postRepository.findById(postId);
        Optional<User> maybeUser = this.userRepository.findById(userId);
        if (maybePost.isPresent() && maybeUser.isPresent()) {
            Post post = maybePost.get();
            boolean remove = false;
            for (User user : post.getDislikes()) {
                if (user.getId() == userId) {
                    remove = true;
                    break;
                }
            }
            if (remove) {
                post.getDislikes().removeIf(user -> user.getId() == userId);
            } else {
                post.getDislikes().add(maybeUser.get());
            }
            return this.postRepository.save(post);
        }
        return null;
    }


    @GetMapping("/post/{id}")
    public Post getPostById(@PathVariable long id) {
        Optional<Post> maybePost = this.postRepository.findById(id);
        return maybePost.orElse(null);
    }


    @PostMapping("/posts")
    public List<Post> getPostsByUser(@RequestBody User user) {
        return this.postRepository.findAll().stream().filter(post -> post.getAuthor().getUsername().equalsIgnoreCase(user.getUsername()) || post.getAuthor().getDisplayName().equalsIgnoreCase(user.getDisplayName())).collect(Collectors.toList());
    }

    @PostMapping("/post/comment/{postId}/{userId}")
    public Post makeComment(@RequestBody Reply reply, @PathVariable long postId, @PathVariable long userId) {
        Optional<User> authorMaybe = this.userRepository.findById(userId);
        Optional<Post> postMaybe = this.postRepository.findById(postId);
        if (authorMaybe.isPresent() && postMaybe.isPresent()) {
            User author = authorMaybe.get();
            Post post = postMaybe.get();
            reply.setAuthor(author);
            this.replyRepository.save(reply);
            post.getComments().add(reply);
            return this.postRepository.save(post);
        } else {
            return null;
        }
    }


}

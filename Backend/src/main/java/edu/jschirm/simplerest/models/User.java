package edu.jschirm.simplerest.models;

import com.fasterxml.jackson.annotation.*;
import lombok.Data;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.List;


@Data
@Entity
public class User {

    private @Id
    @GeneratedValue
    Long id;
    private String username;
    private String displayName;
    private String password;

    @OneToMany(cascade = CascadeType.ALL)
    private List<Post> posts = new ArrayList<>();

    @JsonIgnoreProperties({"following", "followers"})
    @ManyToMany(cascade = CascadeType.ALL)
    private List<User> followers = new ArrayList<>();

    @JsonIgnoreProperties({"following", "followers"})
    @ManyToMany(cascade = CascadeType.ALL)
    private List<User> following = new ArrayList<>();


    public User() {
    }

    public User(String username, String password) {
        this.username = username;
        this.password = password;
        this.posts = new ArrayList<>();
        this.followers = new ArrayList<>();
        this.following = new ArrayList<>();
    }

    public User(String username, String password, String displayName) {
        this.username = username;
        this.password = password;
        this.displayName = displayName;
        this.posts = new ArrayList<>();
        this.followers = new ArrayList<>();
        this.following = new ArrayList<>();
    }


}

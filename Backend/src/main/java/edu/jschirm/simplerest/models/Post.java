package edu.jschirm.simplerest.models;


import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonIdentityInfo;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.ObjectIdGenerators;
import lombok.Data;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.List;


@Data
@Entity
public class Post {

    private @Id @GeneratedValue Long id;
    private String title;
    private String content;

    @JsonIgnoreProperties({"followers", "posts", "following", "password"})
    @ManyToMany(cascade = CascadeType.ALL)
    private List<User> likes = new ArrayList<>();

    @JsonIgnoreProperties({"followers", "posts", "following", "password"})
    @ManyToMany(cascade = CascadeType.ALL)
    private List<User> dislikes = new ArrayList<>();

    @OneToMany(cascade = CascadeType.ALL)
    private List<Reply> comments = new ArrayList<>();


    @JsonIgnoreProperties({"followers", "posts", "following", "password"})
    @ManyToOne(cascade = CascadeType.ALL, optional = false)
    private User author;



    public Post() {}

}

package edu.jschirm.simplerest.models;


import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonIdentityInfo;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.ObjectIdGenerators;
import lombok.Data;

import javax.persistence.*;


@Data
@Entity
public class Post {

    private @Id @GeneratedValue Long id;
    private String title;
    private String content;
    @JsonIgnoreProperties({"followers", "posts", "following", "password"})
    @ManyToOne(cascade = CascadeType.ALL, optional = false)
    private User author;

    public Post() {}

}

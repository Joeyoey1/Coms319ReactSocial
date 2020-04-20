package edu.jschirm.simplerest.models;


import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import lombok.Data;

import javax.persistence.*;

@Data
@Entity
public class Reply {

    private @Id @GeneratedValue Long id;
    private String content;

    @JsonIgnoreProperties({"followers", "posts", "following", "password"})
    @ManyToOne(cascade = CascadeType.ALL, optional = false)
    private User author;

    public Reply() {}



}

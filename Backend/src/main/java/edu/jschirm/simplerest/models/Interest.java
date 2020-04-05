package edu.jschirm.simplerest.models;

import lombok.Data;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;

@Data
@Entity
public class Interest {

    private @Id @GeneratedValue Long id;
    private String title;
    private String location;
    private String description;

    public Interest() {}

}

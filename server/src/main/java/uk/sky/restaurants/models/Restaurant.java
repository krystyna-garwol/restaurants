package uk.sky.restaurants.models;

import lombok.Getter;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Document
@Getter
public class Restaurant {

    @Id
    private String id;
    private String name;
    private String city;
    private String type;
}

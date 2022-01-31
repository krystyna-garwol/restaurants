package uk.sky.restaurants.models;

import lombok.Getter;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Document("menus")
@Getter
public class MenuItem {

    @Id
    private String id;
    private String name;
    private String course;
    private Double price;
    private Integer inStock;
    private String restaurantId;
}

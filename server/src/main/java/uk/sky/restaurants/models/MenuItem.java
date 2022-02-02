package uk.sky.restaurants.models;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Document
@Getter
@Setter
@AllArgsConstructor
public class MenuItem {

    @Id
    private String id;
    private String name;
    private String course;
    private Double price;
    private Integer inStock;
    private String restaurantId;
}

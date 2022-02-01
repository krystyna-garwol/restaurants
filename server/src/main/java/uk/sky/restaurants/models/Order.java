package uk.sky.restaurants.models;

import lombok.Getter;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Document
@Getter
public class Order {

    @Id
    private String id;
    private String name;
    private Integer quantity;
    private Double price;
    private String restaurantId;
    private Boolean completed;
    private String userId;
}

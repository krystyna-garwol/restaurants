package uk.sky.restaurants.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import uk.sky.restaurants.models.Restaurant;
import uk.sky.restaurants.services.RestaurantService;

import java.util.List;

@RestController
@RequestMapping("/restaurants")
public class RestaurantController {

    @Autowired
    RestaurantService restaurantService;

    @GetMapping("")
    public ResponseEntity<List<Restaurant>> getAllRestaurants() {
        List<Restaurant> restaurants = restaurantService.getAllRestaurants();
        return new ResponseEntity<>(restaurants, HttpStatus.OK);
    }

    @PostMapping("")
    public ResponseEntity<Restaurant> addRestaurant(@RequestBody Restaurant restaurant) {
        List<Restaurant> restaurants = restaurantService.getAllRestaurantsByName(restaurant.getName());
        for(Restaurant r : restaurants) {
            if(r.getCity().equals(restaurant.getCity()) && r.getType().equals(restaurant.getType())) {
                return new ResponseEntity<>(HttpStatus.CONFLICT);
            }
        }
        Restaurant newRestaurant = restaurantService.addRestaurant(restaurant);
        return new ResponseEntity<>(newRestaurant, HttpStatus.OK);
    }
}

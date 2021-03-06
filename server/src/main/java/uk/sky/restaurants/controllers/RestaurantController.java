package uk.sky.restaurants.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import uk.sky.restaurants.exceptions.RestaurantException;
import uk.sky.restaurants.models.Restaurant;
import uk.sky.restaurants.services.RestaurantService;
import uk.sky.restaurants.services.StorageService;

import java.util.List;

@RestController
@RequestMapping("/restaurants")
public class RestaurantController {

    @Autowired
    private RestaurantService restaurantService;

    @Autowired
    private StorageService storageService;

    @GetMapping("")
    public ResponseEntity<List<Restaurant>> getAllRestaurants() {
        List<Restaurant> restaurants = restaurantService.getAllRestaurants();
        return new ResponseEntity<>(restaurants, HttpStatus.OK);
    }

    @PostMapping(value="", consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public ResponseEntity addRestaurant(@RequestPart("data") Restaurant restaurant, @RequestPart("file") MultipartFile file) {
        List<Restaurant> restaurants = restaurantService.getAllRestaurantsByName(restaurant.getName());
        for(Restaurant r : restaurants) {
            if(r.getCity().equals(restaurant.getCity()) && r.getType().equals(restaurant.getType())) {
                throw new RestaurantException();
            }
        }
        Restaurant newRestaurant = restaurantService.addRestaurant(restaurant);
        String restaurantId = newRestaurant.getId();
        String imageUrl = storageService.uploadFile(file);
        Restaurant updatedRestaurant = restaurantService.updateRestaurantImage(restaurantId, imageUrl);
        return new ResponseEntity<>(updatedRestaurant, HttpStatus.OK);
    }
}

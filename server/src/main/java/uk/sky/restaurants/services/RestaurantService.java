package uk.sky.restaurants.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import uk.sky.restaurants.models.Restaurant;
import uk.sky.restaurants.repositories.RestaurantRepository;

import java.util.List;
import java.util.Optional;

@Service
public class RestaurantService {

    @Autowired
    private RestaurantRepository restaurantRepository;

    public List<Restaurant> getAllRestaurants() {
        return restaurantRepository.findAll();
    }

    public Restaurant addRestaurant(Restaurant restaurant) {
        return restaurantRepository.save(restaurant);
    }

    public List<Restaurant> getAllRestaurantsByName(String name) {
        return restaurantRepository.findAllByName(name);
    }

    public Restaurant updateRestaurantImage(String id, String imageUrl) {
        Optional<Restaurant> existing = restaurantRepository.findById(id);
        existing.get().setImage(imageUrl);
        return restaurantRepository.save(existing.get());
    }
}

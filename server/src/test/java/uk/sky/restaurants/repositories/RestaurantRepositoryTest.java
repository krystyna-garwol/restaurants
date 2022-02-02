package uk.sky.restaurants.repositories;

import org.junit.jupiter.api.MethodOrderer;
import org.junit.jupiter.api.Order;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.TestMethodOrder;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.data.mongo.DataMongoTest;
import uk.sky.restaurants.models.Restaurant;

import java.util.List;

import static org.assertj.core.api.Assertions.assertThat;

@DataMongoTest
@TestMethodOrder(MethodOrderer.OrderAnnotation.class)
public class RestaurantRepositoryTest {

    @Autowired
    private RestaurantRepository restaurantRepository;

    private Restaurant restaurant = new Restaurant("1", "Cento Uno", "Surbiton", "italian", null);

    @Test
    @Order(1)
    public void whenSaveCalled_restaurantIsSaved() {
        Restaurant savedRestaurant = restaurantRepository.save(restaurant);
        assertThat(restaurant).isEqualTo(savedRestaurant);
    }

    @Test
    @Order(2)
    public void whenFindAllByNameCalled_returnsAsExpected() {
        List<Restaurant> restaurants = restaurantRepository.findAllByName(restaurant.getName());
        Restaurant restaurantOne = restaurants.get(0);
        assertThat(restaurant.getName()).isEqualTo(restaurantOne.getName());
    }
}

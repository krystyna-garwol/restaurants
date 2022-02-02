package uk.sky.restaurants.services;

import org.junit.jupiter.api.BeforeAll;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.TestInstance;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import uk.sky.restaurants.models.Restaurant;
import uk.sky.restaurants.repositories.RestaurantRepository;

import java.util.ArrayList;
import java.util.List;

import static org.assertj.core.api.Assertions.assertThat;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.ArgumentMatchers.anyString;
import static org.mockito.Mockito.when;

@TestInstance(TestInstance.Lifecycle.PER_CLASS)
@ExtendWith(MockitoExtension.class)
public class RestaurantServiceTest {

    @Mock
    private RestaurantRepository restaurantRepository;

    @InjectMocks
    private RestaurantService restaurantService;

    private List<Restaurant> restaurants = new ArrayList<>();
    private Restaurant restaurant = new Restaurant("1", "Cento Uno", "Surbiton", "italian", null);

    @BeforeAll
    public void beforeAll() {
        restaurants.add(restaurant);
    }

    @Test
    public void whenAddRestaurant_restaurantIsSaved() {
        when(restaurantRepository.save(any())).thenReturn(restaurant);
        Restaurant newRestaurant = restaurantService.addRestaurant(restaurant);
        assertThat(restaurant).isEqualTo(newRestaurant);
    }

    @Test
    public void whenGetAllRestaurantsCalled_returnsAsExpected() {
        when(restaurantRepository.findAll()).thenReturn(restaurants);
        List<Restaurant> allRestaurants = restaurantService.getAllRestaurants();
        assertThat(restaurants).isEqualTo(allRestaurants);
    }

    @Test
    public void whenGetAllRestaurantsByNameCalled_returnsAsExpected() {
        when(restaurantRepository.findAllByName(anyString())).thenReturn(restaurants);
        List<Restaurant> allRestaurants =restaurantService.getAllRestaurantsByName(restaurant.getName());
        assertThat(restaurants).isEqualTo(allRestaurants);
    }
}

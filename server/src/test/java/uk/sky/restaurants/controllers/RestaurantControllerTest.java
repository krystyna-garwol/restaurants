package uk.sky.restaurants.controllers;

import org.junit.jupiter.api.BeforeAll;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.TestInstance;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.test.web.servlet.MockMvc;
import uk.sky.restaurants.models.Restaurant;
import uk.sky.restaurants.services.RestaurantService;
import uk.sky.restaurants.services.StorageService;

import java.util.ArrayList;
import java.util.List;

import static org.mockito.Mockito.when;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.result.MockMvcResultHandlers.print;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@AutoConfigureMockMvc
@WebMvcTest(controllers = RestaurantController.class)
@TestInstance(TestInstance.Lifecycle.PER_CLASS)
public class RestaurantControllerTest {

    @Autowired
    private MockMvc mockMvc;

    @MockBean
    private RestaurantService restaurantService;

    @MockBean
    private StorageService storageService;

    private List<Restaurant> restaurants = new ArrayList<>();
    private Restaurant restaurant = new Restaurant("1", "Cento Uno", "Surbiton", "italian", null);

    @BeforeAll
    public void beforeAll() {
        restaurants.add(restaurant);
    }

    @Test
    public void whenGetAllRestaurantsCalled_returnsAsExpected() throws Exception {
        when(restaurantService.getAllRestaurants()).thenReturn(restaurants);
        mockMvc.perform(get("/restaurants"))
                .andDo(print())
                .andExpect(status().isOk())
                .andExpect(jsonPath("$[0].name").value(restaurant.getName()));
    }

}

package uk.sky.restaurants.repositories;

import org.junit.jupiter.api.MethodOrderer;
import org.junit.jupiter.api.Order;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.TestMethodOrder;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.data.mongo.DataMongoTest;
import uk.sky.restaurants.models.MenuItem;

import java.util.List;

import static org.assertj.core.api.Assertions.assertThat;


@DataMongoTest
@TestMethodOrder(MethodOrderer.OrderAnnotation.class)
public class MenuRepositoryTest {

    @Autowired
    private MenuRepository menuRepository;

    private MenuItem menuItem = new MenuItem("1", "Dough Balls", "Starter", 4.99, 51, "123");

    @Test
    @Order(1)
    public void whenSaveCalled_restaurantIsSaved() {
        MenuItem savedMenuItem = menuRepository.save(menuItem);
        assertThat(menuItem).isEqualTo(savedMenuItem);
    }

    @Test
    @Order(2)
    public void whenFindAllByName_ReturnsAsExpected() {
        List<MenuItem> menuItems = menuRepository.findAllByName(menuItem.getName());
        MenuItem menuItemOne = menuItems.get(0);
        assertThat(menuItem.getName()).isEqualTo(menuItemOne.getName());
    }

    @Test
    @Order(3)
    public void whenFindAllByRestaurantId_ReturnsAsExpected() {
        List<MenuItem> menuItems = menuRepository.findAllByRestaurantId(menuItem.getRestaurantId());
        MenuItem menuItemOne = menuItems.get(0);
        assertThat(menuItem.getRestaurantId()).isEqualTo(menuItemOne.getRestaurantId());
    }
}

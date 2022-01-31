package uk.sky.restaurants.repositories;

import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;
import uk.sky.restaurants.models.MenuItem;

import java.util.List;

@Repository
public interface MenuRepository extends MongoRepository<MenuItem, String> {
    List<MenuItem> findAllByName(String name);
    List<MenuItem> findAllByRestaurantId(String restaurantId);
}

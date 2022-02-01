package uk.sky.restaurants.repositories;

import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;
import uk.sky.restaurants.models.Order;

import java.util.List;

@Repository
public interface OrderRepository extends MongoRepository<Order, String> {

    List<Order> findAllByUserId(String userId);
    List<Order> findAllByNameAndUserId(String name, String userId);
}

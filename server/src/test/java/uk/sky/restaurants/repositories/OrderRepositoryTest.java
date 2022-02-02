package uk.sky.restaurants.repositories;

import org.junit.jupiter.api.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.data.mongo.DataMongoTest;
import uk.sky.restaurants.models.Order;

import java.util.List;

import static org.assertj.core.api.Assertions.assertThat;

@DataMongoTest
@TestMethodOrder(MethodOrderer.OrderAnnotation.class)
public class OrderRepositoryTest {

    @Autowired
    private OrderRepository orderRepository;

    private Order order = new Order("1", "Dough Balls", 2, 4.99, "Cento Uno", false, "123");

    @Test
    @org.junit.jupiter.api.Order(1)
    public void whenSaveCalled_orderIsSaved() {
        Order savedOrder = orderRepository.save(order);
        assertThat(order).isEqualTo(savedOrder);
    }

    @Test
    @org.junit.jupiter.api.Order(2)
    public void whenFindAllByUserIdCalled_returnsAsExpected() {
        List<Order> orders = orderRepository.findAllByUserId(order.getUserId());
        Order orderOne = orders.get(0);
        assertThat(orderOne.getUserId()).isEqualTo(order.getUserId());
    }

    @Test
    @org.junit.jupiter.api.Order(3)
    public void whenFindAllByNameAndUserId_returnsAsExpected() {
        List<Order> orders = orderRepository.findAllByNameAndUserId(order.getName(), order.getUserId());
        Order orderOne = orders.get(0);
        assertThat(orderOne.getName()).isEqualTo(order.getName());
        assertThat(orderOne.getUserId()).isEqualTo(order.getUserId());
    }
}

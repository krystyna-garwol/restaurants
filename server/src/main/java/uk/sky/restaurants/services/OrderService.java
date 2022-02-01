package uk.sky.restaurants.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import uk.sky.restaurants.models.Order;
import uk.sky.restaurants.repositories.OrderRepository;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
public class OrderService {

    @Autowired
    private OrderRepository orderRepository;

    public List<Order> getAllOrdersByUserId(String userId) {
        return orderRepository.findAllByUserId(userId);
    }

    public List<Order> getAllByNameAndUserId(String name, String userId) {
        return orderRepository.findAllByNameAndUserId(name, userId);
    }

    public Order addOrder(Order order) {
        return orderRepository.save(order);
    }

    public Order updateOrder(Order order) {
        System.out.println(order);
        Optional<Order> existing = orderRepository.findById(order.getId());
        existing.get().setQuantity(order.getQuantity());
        return orderRepository.save(existing.get());
    }

    public void completeOrders(List<Order> orders) {
        List<String> ordersId = new ArrayList<>();
        orders.forEach(order -> ordersId.add(order.getId()));
        ordersId.forEach(id -> {
            Optional<Order> existing = orderRepository.findById(id);
            existing.get().setCompleted(true);
            orderRepository.save(existing.get());
        });
    }

    public void deleteOrder(String orderId) {
        orderRepository.deleteById(orderId);
    }
}

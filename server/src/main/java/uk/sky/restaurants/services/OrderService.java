package uk.sky.restaurants.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import uk.sky.restaurants.exceptions.StockException;
import uk.sky.restaurants.models.MenuItem;
import uk.sky.restaurants.models.Order;
import uk.sky.restaurants.repositories.OrderRepository;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
public class OrderService {

    @Autowired
    private OrderRepository orderRepository;

    @Autowired
    private MenuService menuService;

    public List<Order> getPendingOrdersByUserId(String userId) {
        List<Order> pendingOrders = new ArrayList<>();
        List<Order> orders = orderRepository.findAllByUserId(userId);
        orders.forEach(order -> {
            if(order.getCompleted() == false) {
                pendingOrders.add(order);
            }
        });
        return pendingOrders;
    }

    public List<Order> getAllByNameAndUserId(String name, String userId) {
        return orderRepository.findAllByNameAndUserId(name, userId);
    }

    public Order addOrder(Order order) {
        MenuItem menuItem = menuService.getMenuItemByNameAndRestaurantId(order.getName(), order.getRestaurantId());
        int stockDiff = menuItem.getInStock() - order.getQuantity();
        int itemsAvailable = order.getQuantity() + stockDiff;
        if(stockDiff > 0 || menuItem.getInStock().equals(order.getQuantity())) {
            return orderRepository.save(order);
        }
        throw new StockException(itemsAvailable);
    }

    public Order updateOrder(Order order) {
        System.out.println(order.getCompleted());
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

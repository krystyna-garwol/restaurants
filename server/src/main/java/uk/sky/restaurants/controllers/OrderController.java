package uk.sky.restaurants.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import uk.sky.restaurants.models.Order;
import uk.sky.restaurants.services.OrderService;

import java.util.List;

@RestController
@RequestMapping("/orders")
public class OrderController {

    @Autowired
    private OrderService orderService;

    @GetMapping("")
    public ResponseEntity<List<Order>> getAllOrdersByUserId(@RequestHeader("userId") String userId) {
        List<Order> orders = orderService.getAllOrdersByUserId(userId);
        return new ResponseEntity<>(orders, HttpStatus.OK);
    }

    @PostMapping("")
    public ResponseEntity<Order> addOrder(@RequestBody Order order) {
        List<Order> existing = orderService.getAllByNameAndUserId(order.getName(), order.getUserId());
        if(existing.size() != 0) {
            for(Order o : existing) {
                if(o.getName().equals(order.getName()) && o.getCompleted().equals(order.getCompleted())) {
                    return new ResponseEntity<>(HttpStatus.CONFLICT);
                }
            }
        }
        Order newOrder = orderService.addOrder(order);
        return new ResponseEntity<>(newOrder, HttpStatus.OK);
    }

    @PutMapping("")
    public ResponseEntity<Order> updateOrder(@RequestBody Order order) {
        Order updatedOrder = orderService.updateOrder(order);
        return new ResponseEntity<>(updatedOrder, HttpStatus.OK);
    }

    @PutMapping("/completed")
    public ResponseEntity<String> completeOrders(@RequestBody List<Order> orders) {
        orderService.completeOrders(orders);
        return new ResponseEntity<>("Orders status updated to completed.", HttpStatus.OK);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<String> deleteOrder(@PathVariable String id) {
        orderService.deleteOrder(id);
        return new ResponseEntity<>("Order deleted", HttpStatus.OK);
    }

}

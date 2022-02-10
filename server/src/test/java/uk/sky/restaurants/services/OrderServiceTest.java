package uk.sky.restaurants.services;

import org.junit.jupiter.api.*;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import uk.sky.restaurants.models.MenuItem;
import uk.sky.restaurants.models.Order;
import uk.sky.restaurants.repositories.OrderRepository;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import static org.assertj.core.api.Assertions.assertThat;
import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.ArgumentMatchers.anyString;
import static org.mockito.Mockito.*;

@TestInstance(TestInstance.Lifecycle.PER_CLASS)
@ExtendWith(MockitoExtension.class)
@TestMethodOrder(MethodOrderer.OrderAnnotation.class)
public class OrderServiceTest {

    @Mock
    private OrderRepository orderRepository;

    @Mock
    private MenuService menuService;

    @InjectMocks
    private OrderService orderService;

    private List<Order> orders = new ArrayList<>();
    private Order order = new Order("1", "Dough Balls", 2, 4.99, "12345", false, "123");
    private MenuItem menuItem = new MenuItem("1", "Dough Balls", "Starter", 4.99, 51, "12345");

    @BeforeAll
    public void beforeAll() {
        orders.add(order);
    }

    @Test
    @org.junit.jupiter.api.Order(1)
    public void whenAddOrderCalled_orderIsSaved() {
        when(menuService.getMenuItemByNameAndRestaurantId(anyString(), anyString())).thenReturn(menuItem);
        when(orderRepository.save(any())).thenReturn(order);
        Order newOrder = orderService.addOrder(order);
        assertThat(order).isEqualTo(newOrder);
    }

    @Test
    @org.junit.jupiter.api.Order(2)
    public void whenGetAllByNameAndUserIdCalled_returnsAsExpected() {
        when(orderRepository.findAllByNameAndUserId(anyString(), anyString())).thenReturn(orders);
        List<Order> retrievedOrders = orderService.getAllByNameAndUserId(order.getName(), order.getId());
        assertThat(orders).isEqualTo(retrievedOrders);
    }

    @Test
    @org.junit.jupiter.api.Order(3)
    public void whenGetPendingOrdersByUserIdCalled_returnsAsExpected() {
        when(orderRepository.findAllByUserId(anyString())).thenReturn(orders);
        System.out.println(orders);
        List<Order> pendingOrders = orderService.getPendingOrdersByUserId(order.getUserId());
        assertThat(orders).isEqualTo(pendingOrders);
    }

    @Test
    @org.junit.jupiter.api.Order(4)
    public void whenUpdateOrderCalled_orderIsUpdated() {
        when(orderRepository.findById(anyString())).thenReturn(Optional.of(order));
        order.setQuantity(4);
        when(orderRepository.save(any())).thenReturn(order);
        Order updatedOrder = orderService.updateOrder(order);
        assertThat(order.getQuantity()).isEqualTo(4);
        assertThat(updatedOrder.getQuantity()).isEqualTo(4);
        assertEquals(order, updatedOrder);
    }

    @Test
    @org.junit.jupiter.api.Order(5)
    public void whenCompleteOrdersCalled_ordersAreUpdated() {
        when(orderRepository.findById(anyString())).thenReturn(Optional.ofNullable(order));
        order.setCompleted(true);
        orderService.completeOrders(orders);
        assertThat(orders.get(0)).isEqualTo(order);
    }

    @Test
    @org.junit.jupiter.api.Order(6)
    public void whenDeleteOrderCalled_orderIsDeleted() {
        orderService.deleteOrder(order.getId());
        verify(orderRepository, times(1)).deleteById(order.getId());
    }

}

package uk.sky.restaurants.services;

import org.mockito.InjectMocks;
import org.mockito.Mock;
import uk.sky.restaurants.repositories.OrderRepository;

public class OrderServiceTest {

    @Mock
    private OrderRepository orderRepository;

    @InjectMocks
    private OrderService orderService;

}

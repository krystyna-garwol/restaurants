package uk.sky.restaurants.controllers;

import com.fasterxml.jackson.databind.ObjectMapper;
import org.junit.jupiter.api.BeforeAll;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.TestInstance;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.http.MediaType;
import org.springframework.security.test.context.support.WithMockUser;
import org.springframework.test.web.servlet.MockMvc;
import uk.sky.restaurants.models.Order;
import uk.sky.restaurants.services.OrderService;

import java.util.ArrayList;
import java.util.List;

import static org.mockito.ArgumentMatchers.any;
import static org.mockito.ArgumentMatchers.anyString;
import static org.mockito.Mockito.when;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultHandlers.print;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@AutoConfigureMockMvc
@WebMvcTest(controllers = OrderController.class)
@TestInstance(TestInstance.Lifecycle.PER_CLASS)
public class OrderControllerTest {

    @Autowired
    private MockMvc mockMvc;

    @Autowired
    private ObjectMapper objectMapper;

    @MockBean
    private OrderService orderService;

    private List<Order> orders = new ArrayList<>();
    private Order order = new Order("1", "Dough Balls", 2, 4.99, "12345", false, "123");

    @BeforeAll
    public void beforeAll() {
        orders.add(order);
    }

    @Test
    public void whenAddOrderCalledWithoutJwt_returns403Status() throws Exception {
        when(orderService.addOrder(any())).thenReturn(order);
        mockMvc.perform(post("/orders")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(order)))
                .andDo(print())
                .andExpect(status().isForbidden());
    }

    @Test
    @WithMockUser(username = "testUser")
    public void whenGetPendingOrdersByUserIdCalled_returnsOk() throws Exception {
        when(orderService.getPendingOrdersByUserId(anyString())).thenReturn(orders);
        mockMvc.perform(get("/orders").header("userId", "123"))
                .andDo(print())
                .andExpect(status().isOk())
                .andExpect(jsonPath("$[0].name").value(order.getName()))
                .andExpect(jsonPath("$[0].userId").value(order.getUserId()))
                .andExpect(jsonPath("$[0].completed").value(order.getCompleted()));
    }
}

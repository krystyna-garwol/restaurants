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
import org.springframework.test.web.servlet.MockMvc;
import uk.sky.restaurants.models.MenuItem;
import uk.sky.restaurants.services.MenuService;

import java.util.ArrayList;
import java.util.List;

import static org.mockito.ArgumentMatchers.any;
import static org.mockito.ArgumentMatchers.anyString;
import static org.mockito.Mockito.when;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.result.MockMvcResultHandlers.print;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@AutoConfigureMockMvc
@WebMvcTest(controllers = MenuController.class)
@TestInstance(TestInstance.Lifecycle.PER_CLASS)
public class MenuControllerTest {

    @Autowired
    private MockMvc mockMvc;

    @Autowired
    private ObjectMapper objectMapper;

    @MockBean
    private MenuService menuService;

    private List<MenuItem> menuItems = new ArrayList<>();
    private MenuItem menuItem = new MenuItem("1", "Dough Balls", "Starter", 4.99, 51, "123");;

    @BeforeAll
    public void beforeAll() {
        menuItems.add(menuItem);
    }

    @Test
    public void whenAddMenuItemCalledWithoutJwt_returns403Status() throws Exception {
        when(menuService.addMenuItem(any())).thenReturn(menuItem);
        mockMvc.perform(post("/menus")
                .contentType(MediaType.APPLICATION_JSON)
                .content(objectMapper.writeValueAsString(menuItem)))
                .andDo(print())
                .andExpect(status().isForbidden());
    }

    @Test
    public void whenGetMenuItemsByRestaurantIdCalled_returnsAsExpected() throws Exception {
        when(menuService.getMenuItemsByRestaurantId(anyString())).thenReturn(menuItems);
        mockMvc.perform(get("/menus/1"))
                .andDo(print())
                .andExpect(status().isOk())
                .andExpect(jsonPath("$[0].name").value(menuItem.getName()))
                .andExpect(jsonPath("$[0].course").value(menuItem.getCourse()))
                .andExpect(jsonPath("$[0].price").value(menuItem.getPrice()));
    }

}

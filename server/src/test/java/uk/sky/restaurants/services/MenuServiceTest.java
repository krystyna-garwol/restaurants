package uk.sky.restaurants.services;

import org.junit.jupiter.api.BeforeAll;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.TestInstance;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import uk.sky.restaurants.models.MenuItem;
import uk.sky.restaurants.repositories.MenuRepository;

import java.util.ArrayList;
import java.util.List;

import static org.assertj.core.api.Assertions.assertThat;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.ArgumentMatchers.anyString;
import static org.mockito.Mockito.when;

@TestInstance(TestInstance.Lifecycle.PER_CLASS)
@ExtendWith(MockitoExtension.class)
public class MenuServiceTest {

    @Mock
    private MenuRepository menuRepository;

    @InjectMocks
    private MenuService menuService;

    private List<MenuItem> menuItems = new ArrayList<>();
    private MenuItem menuItem = new MenuItem("1", "Dough Balls", "Starter", 4.99, 51, "123");;

    @BeforeAll
    public void beforeAll() {
        menuItems.add(menuItem);
    }

    @Test
    public void whenAddMenuItemCalled_menuItemIsSaved() {
        when(menuRepository.save(any())).thenReturn(menuItem);
        MenuItem newMenuItem = menuService.addMenuItem(menuItem);
        assertThat(menuItem).isEqualTo(newMenuItem);
    }

    @Test
    public void whenGetMenuItemsByRestaurantIdCalled_returnsAsExpected() {
        when(menuRepository.findAllByRestaurantId(anyString())).thenReturn(menuItems);
        List<MenuItem> retrievedMenuItems = menuService.getMenuItemsByRestaurantId(menuItem.getRestaurantId());
        assertThat(menuItems).isEqualTo(retrievedMenuItems);
    }

    @Test
    public void whenGetMenuItemsByNameCalled_returnsAsExpected() {
        when(menuRepository.findAllByName(anyString())).thenReturn(menuItems);
        List<MenuItem> retrievedMenuItems = menuService.getMenuItemsByName(menuItem.getName());
        assertThat(menuItems).isEqualTo(retrievedMenuItems);
    }
}

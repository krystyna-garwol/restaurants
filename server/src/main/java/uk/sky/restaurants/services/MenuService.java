package uk.sky.restaurants.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import uk.sky.restaurants.models.MenuItem;
import uk.sky.restaurants.repositories.MenuRepository;

import java.util.List;

@Service
public class MenuService {

    @Autowired
    private MenuRepository menuRepository;

    public List<MenuItem> getMenuItemsByRestaurantId(String restaurantId) {
        return menuRepository.findAllByRestaurantId(restaurantId);
    }

    public List<MenuItem> getMenuItemsByName(String name) {
        return menuRepository.findAllByName(name);
    }

    public MenuItem addMenuItem(MenuItem menuItem) {
        return menuRepository.save(menuItem);
    }
}

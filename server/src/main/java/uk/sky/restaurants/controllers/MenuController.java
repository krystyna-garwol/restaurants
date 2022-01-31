package uk.sky.restaurants.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import uk.sky.restaurants.models.MenuItem;
import uk.sky.restaurants.services.MenuService;

import java.util.List;

@RestController
@RequestMapping("/menus")
public class MenuController {

    @Autowired
    private MenuService menuService;

    @GetMapping("/{id}")
    public ResponseEntity<List<MenuItem>> getMenuItemsByRestaurantId(@PathVariable String id) {
        List<MenuItem> menuItems = menuService.getMenuItemsByRestaurantId(id);
        return new ResponseEntity<>(menuItems, HttpStatus.OK);
    }

    @PostMapping("")
    public ResponseEntity<MenuItem> addMenuItem(@RequestBody MenuItem menuItem) {
        List<MenuItem> menuItems = menuService.getMenuItemsByName(menuItem.getName());
        for(MenuItem item : menuItems) {
            if(item.getName().equals(menuItem.getName()) && item.getRestaurantId().equals(menuItem.getRestaurantId())) {
                return new ResponseEntity<>(HttpStatus.CONFLICT);
            }
        }
        MenuItem newMenuItem = menuService.addMenuItem(menuItem);
        return new ResponseEntity<>(newMenuItem, HttpStatus.OK);
    }


}

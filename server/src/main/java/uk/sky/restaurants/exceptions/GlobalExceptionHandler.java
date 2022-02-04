package uk.sky.restaurants.exceptions;

import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;

@ControllerAdvice
@Slf4j
public class GlobalExceptionHandler {

    private ResponseEntity<Error> getError(Error error) {
        return ResponseEntity.status(error.getStatus())
                .contentType(MediaType.APPLICATION_JSON)
                .body(error);
    }

    @ExceptionHandler(value = RestaurantException.class)
    private ResponseEntity<Error> handleRestaurantException(RestaurantException exception) {
        Error error = new Error(HttpStatus.CONFLICT, "Restaurant already exists.");
        log.error(error.getMessage());
        return getError(error);
    }

    @ExceptionHandler(value = MenuException.class)
    private ResponseEntity<Error> handleMenuException(MenuException exception) {
        Error error = new Error(HttpStatus.CONFLICT, "Menu item already exists.");
        log.error(error.getMessage());
        return getError(error);
    }

    @ExceptionHandler(value = OrderException.class)
    private ResponseEntity<Error> handleOrderException(OrderException exception) {
        Error error = new Error(HttpStatus.CONFLICT, "You have added this item already. Please visit the Current Order page to update your order instead.");
        log.error(error.getMessage());
        return getError(error);
    }

    @ExceptionHandler(value = StockException.class)
    private ResponseEntity<Error> handleStockException(StockException exception) {
        Error error = new Error(HttpStatus.CONFLICT, exception.getMessage());
        log.error(error.getMessage());
        return getError(error);
    }
}

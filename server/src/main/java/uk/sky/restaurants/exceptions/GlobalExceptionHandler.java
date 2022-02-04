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
}

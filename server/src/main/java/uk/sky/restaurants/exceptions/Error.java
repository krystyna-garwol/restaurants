package uk.sky.restaurants.exceptions;

import lombok.AllArgsConstructor;
import lombok.Getter;
import org.springframework.http.HttpStatus;

@Getter
@AllArgsConstructor
public class Error {
    HttpStatus status;
    private String message;
}

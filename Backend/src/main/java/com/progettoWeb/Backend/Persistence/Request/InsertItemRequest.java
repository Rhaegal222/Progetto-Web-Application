package com.progettoWeb.Backend.Persistence.Request;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class InsertItemRequest {
    private String name, description, type, quantity;
}

package com.progettoWeb.Backend.Persistence.Request;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class LoginRequest {
    private String username, password;
}

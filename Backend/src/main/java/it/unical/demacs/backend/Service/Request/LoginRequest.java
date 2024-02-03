package it.unical.demacs.backend.Service.Request;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class LoginRequest {
    private String email, password;
}

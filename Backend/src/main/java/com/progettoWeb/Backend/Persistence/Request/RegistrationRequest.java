package com.progettoWeb.Backend.Persistence.Request;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class RegistrationRequest {
    String name, surname, role, username, password, email;
}
package it.unical.demacs.backend.Service.Request;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class RegistrationRequest {
    String name, surname, email, password;
}

package it.unical.demacs.backend.Service.Response;

import it.unical.demacs.backend.Persistence.Model.EmployeeRequest;
import it.unical.demacs.backend.Persistence.Model.Item;
import lombok.Getter;

import java.util.ArrayList;

@Getter
public class JwtAuthResponse {
    private final String accessToken;

    public JwtAuthResponse(String accessToken) {
        this.accessToken = accessToken;
    }

}

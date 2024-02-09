package it.unical.demacs.backend.Service.Response;

import it.unical.demacs.backend.Persistence.Model.EmployeeRequest;
import it.unical.demacs.backend.Persistence.Model.Item;
import lombok.Getter;

import java.util.ArrayList;

@Getter
public class JwtAuthResponse {
    private final String accessToken;
    private ArrayList<Item> items;
    private ArrayList<EmployeeRequest> requests;

    public JwtAuthResponse(String accessToken, ArrayList<Item> items, ArrayList<EmployeeRequest> requests) {
        this.accessToken = accessToken;
        this.items = items;
        this.requests = requests;
    }

}

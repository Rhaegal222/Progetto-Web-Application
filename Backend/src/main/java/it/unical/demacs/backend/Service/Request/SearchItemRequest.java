package it.unical.demacs.backend.Service.Request;

import lombok.Getter;

@Getter
public class SearchItemRequest {
    private String category;
    private String fieldContent;

}

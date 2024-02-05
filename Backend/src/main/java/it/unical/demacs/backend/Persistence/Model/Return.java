package it.unical.demacs.backend.Persistence.Model;

import lombok.Getter;
import lombok.Setter;

import javax.xml.crypto.Data;
@Getter
@Setter
public class Return {
    private long idReturn;
    private long idUser;
    private long idItem;
    private Data returnDate;
    private String returnReason;
}

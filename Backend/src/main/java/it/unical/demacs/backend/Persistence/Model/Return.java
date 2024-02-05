package it.unical.demacs.backend.Persistence.Model;

import lombok.Getter;
import lombok.Setter;

import javax.xml.crypto.Data;
@Getter
@Setter
public class Return {
    private long id_return;
    private long id_user;
    private long id_item;
    private Data return_date;
    private String return_reason;
}

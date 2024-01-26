package com.progettoWeb.Backend.Persistence.Model;
import lombok.EqualsAndHashCode;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;


@Getter
@Setter
@ToString
@EqualsAndHashCode

public class User {
    String id_user, name, surname, role, username, password;

    public User(){}
    //Costruttore per creare un nuovo utente
    public User(String id_user, String name, String surname, String role, String username, String password){
        this.id_user = id_user;
        this.name = name;
        this.surname = surname;
        this.role = role;
        this.username = username;
        this.password = password;
    }

    //Costruttore per cercare un utente tramite id_user (che è primary key)
    public User(String id_user){
        this.id_user = id_user;
    }


}

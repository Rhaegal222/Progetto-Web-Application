package it.unical.demacs.backend.Persistence.Model;
import lombok.EqualsAndHashCode;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;


@Getter
@Setter
@ToString
@EqualsAndHashCode

public class User {
    String name, surname, role, username, password, email;

    public User(){}
    //Costruttore per creare un nuovo utente
    public User( String name, String surname, String role, String email, String username, String password){
        this.name = name;
        this.surname = surname;
        this.role = role;
        this.username = username;
        this.password = password;
        this.email = email;
    }


}

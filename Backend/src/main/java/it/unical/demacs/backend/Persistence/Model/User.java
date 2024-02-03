package it.unical.demacs.backend.Persistence.Model;
import lombok.*;
@Getter
@Setter
@ToString
@NoArgsConstructor
@EqualsAndHashCode
public class User {
    private String idUser;
    private String username;
    private String email;
    private String password;
    private String name;
    private String surname;
    private String role;
    private Boolean banned;


    public User(String username, String password, String email, String name, String surname, boolean b) {
        this.username = username;
        this.password = password;
        this.email = email;
        this.name = name;
        this.surname = surname;
        this.banned = b;
    }
}

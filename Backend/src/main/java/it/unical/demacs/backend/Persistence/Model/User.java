package it.unical.demacs.backend.Persistence.Model;
import it.unical.demacs.backend.Persistence.DatabaseHandler;
import lombok.*;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import java.util.ArrayList;
import java.util.Collection;
import java.util.Collections;
import java.util.List;

@Getter
@Setter
@ToString
@NoArgsConstructor
@EqualsAndHashCode
public class User implements UserDetails {
    private long idUser;
    private String email;
    private String password;
    private String name;
    private String surname;
    private String role;
    private Boolean banned;
    private ArrayList<Item> items;
    private ArrayList<EmployeeRequest> employeeRequests;


    public User(String password, String email, String name, String surname, boolean b) {
        this.password = password;
        this.email = email;
        this.name = name;
        this.surname = surname;
        this.banned = b;
    }

    public User(long idUser) {
        User u = DatabaseHandler.getInstance().getUserDao().findByPrimaryKey(idUser).join();
        this.idUser = u.getIdUser();
        this.email = u.getEmail();
        this.password = u.getPassword();
        this.name = u.getName();
        this.surname = u.getSurname();
        this.role = u.getRole();
        this.banned = u.getBanned();
    }


    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        String role = this.role;
        if (role == null || role.trim().isEmpty()) {
            // Se il ruolo è nullo o vuoto, restituisci una lista vuota di autorità
            return Collections.emptyList();
        }
        return List.of(new SimpleGrantedAuthority(role));
    }


    @Override
    public String getUsername() {
        return this.email;
    }

    @Override
    public boolean isAccountNonExpired() {
        return true;
    }

    @Override
    public boolean isAccountNonLocked() {
        return true;
    }

    @Override
    public boolean isCredentialsNonExpired() {
        return true;
    }

    @Override
    public boolean isEnabled() {
        return true;
    }
}

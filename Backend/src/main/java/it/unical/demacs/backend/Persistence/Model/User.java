package it.unical.demacs.backend.Persistence.Model;
import lombok.*;

import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import java.util.Collection;
import java.util.List;

@Getter
@Setter
@ToString
@NoArgsConstructor
@EqualsAndHashCode

public class User implements UserDetails {
    private String username;
    private String email;
    private String password;
    private String name;
    private String surname;
    private String role;


    public User(String name, String surname, String email, String username, String password) {
    	this.username = username;
    	this.email = email;
    	this.password = password;
    	this.name = name;
    	this.surname = surname;
    }

    public User(String username, String password) {
    	this.username = username;
    	this.password = password;
    }
    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        return List.of(new SimpleGrantedAuthority("USER"));
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

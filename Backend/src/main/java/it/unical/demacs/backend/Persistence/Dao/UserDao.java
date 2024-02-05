package it.unical.demacs.backend.Persistence.Dao;
import it.unical.demacs.backend.Persistence.Model.User;

import java.util.ArrayList;
import java.util.concurrent.CompletableFuture;

public interface UserDao {
    CompletableFuture<ArrayList<User>> findAll(); //trova tutti gli utenti
    CompletableFuture<User> findByPrimaryKey(long id_user); //trova un utente tramite id_user
    CompletableFuture<User> findByEmail(String email); //trova un utente tramite email
    CompletableFuture<Boolean> insertUser(User user);//inserisce un nuovo utente
    CompletableFuture<Boolean> deleteUser(String username); //elimina un utente
    void banningUser(String email); //banna un utente
    boolean checkEmail(String email);
    String selectPassword(String username);

    String autoIncrement();
}

package it.unical.demacs.backend.Persistence.Dao;
import it.unical.demacs.backend.Persistence.Model.User;

import java.util.ArrayList;
import java.util.concurrent.CompletableFuture;

public interface UserDao {
    public CompletableFuture<ArrayList<User>> findAll(); //trova tutti gli utenti
    public CompletableFuture<User> findByPrimaryKey(String id_user); //trova un utente tramite id_user
    public CompletableFuture<User> findByEmail(String email); //trova un utente tramite email
    public CompletableFuture<User> findByUsername(String username); //trova un utente tramite username
    public CompletableFuture<Boolean> insertUser(User user);//inserisce un nuovo utente
    public CompletableFuture<Boolean> deleteUser(String username); //elimina un utente
    public CompletableFuture<Boolean> banningUser(String email); //banna un utente
    public boolean checkUsername(String username);
    public boolean checkEmail(String email);
    public String selectPassword(String username);

    String autoIncrement();
}

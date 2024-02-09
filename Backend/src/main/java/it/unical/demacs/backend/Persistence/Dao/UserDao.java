package it.unical.demacs.backend.Persistence.Dao;
import it.unical.demacs.backend.Persistence.Model.User;
import java.util.ArrayList;
import java.util.concurrent.CompletableFuture;

public interface UserDao {
    CompletableFuture<ArrayList<User>> findAll(); //trova tutti gli utenti
    CompletableFuture<User> findByPrimaryKey(long id_user); //trova un utente tramite id_user
    CompletableFuture<User> findByEmail(String email); //trova un utente tramite email
    CompletableFuture<Boolean> insertUser(User user);//inserisce un nuovo utente
    void banningUser(String email, boolean status); //banna un utente
    boolean checkEmail(String email);

    CompletableFuture<ArrayList<User>> getAdmins(); //trova tutti gli admin

    CompletableFuture<Boolean> updateRole(User user);

    CompletableFuture<ArrayList<User>> findByRole(String role);

    CompletableFuture<Boolean> updatePassword(User user);
}

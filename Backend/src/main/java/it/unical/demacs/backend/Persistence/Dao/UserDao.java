package it.unical.demacs.backend.Persistence.Dao;
import it.unical.demacs.backend.Persistence.Model.User;

public interface UserDao {
    public User findByPrimaryKey(String id_user); //trova un utente tramite id_user

    public boolean insertUser(User user);//inserisce un nuovo utente

    public void deleteUser(String id_user); //elimina un utente

    boolean checkUsername(String username);

    boolean checkEmail(String email);

    String selectPassword(String username);
}

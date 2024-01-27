package com.progettoWeb.Backend.Persistence;


import org.springframework.security.crypto.bcrypt.BCrypt;

import java.util.regex.Matcher;
import java.util.regex.Pattern;

public class RegexHandler {
    private static RegexHandler instance = null;

    public  static RegexHandler getInstance(){
        if(instance == null)
            instance = new RegexHandler();
        return instance;
    }

    private RegexHandler(){}

    public boolean checkPassword(String password){
        String regex = "^(?=.*[A-Z])(?=.*[0-9])(?=.*[@!%&£°#'?*=.])[a-zA-Z0-9@!%&£°#'?*=.]{8,}";

        Pattern pattern = Pattern.compile(regex);// Compila l'espressione regolare in un oggetto Pattern
        Matcher matcher = pattern.matcher(password);// Crea un oggetto Matcher per confrontare la stringa con la regex
        return matcher.matches();
    }

    public boolean checkOnlyChar(String string){
        String regex = "^[a-zA-Z ]+$";

        Pattern pattern = Pattern.compile(regex);// Compila l'espressione regolare in un oggetto Pattern
        Matcher matcher = pattern.matcher(string);// Crea un oggetto Matcher per confrontare la stringa con la regex
        return matcher.matches();
    }

    public boolean checkEmail(String email) {
        String regex = "^[a-zA-Z0-9.!#$%&’*+/=?^_{|}~-]+@(?:gmail\\.com|yahoo\\.com|hotmail\\.com|libero\\.it|icloud\\.com|gmx\\.com|aol\\.com)";
        Pattern pattern = Pattern.compile(regex);
        Matcher matcher = pattern.matcher(email);
        return matcher.matches();
    }

    public String encryptPassword(String password){
        return BCrypt.hashpw(password, BCrypt.gensalt(12));
    }
}
package com.progettoWeb.Backend.Controller;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.EnableWebMvc;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
@EnableWebMvc
public class CorsConfig implements WebMvcConfigurer {
    //il local host di angular può effettuare queste richieste
    @Override
    public void addCorsMappings(CorsRegistry registry) {
        registry.addMapping("/**") // Specifica il percorso a cui applicare le politiche CORS (Cross-Origin Resource Sharing)
                .allowedOrigins("http://localhost:4200/", "http://127.0.0.1:8080")
                .allowedMethods("GET", "POST", "PUT", "DELETE","HEAD","OPTIONS") // Specifica i metodi HTTP consentiti
                .allowedHeaders("*") // Specifica gli header consentiti
                .allowCredentials(true); // Specifica se è consentito l'invio di credenziali (cookie)
    }
}
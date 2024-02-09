package it.unical.demacs.backend.Controller;
import it.unical.demacs.backend.Persistence.DatabaseHandler;
import it.unical.demacs.backend.Persistence.Model.User;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;

import java.lang.reflect.Array;
import java.util.ArrayList;

@Component
@Controller
public class ThymeleafController {

    @Value("${contacts.number}")
    private String number;

    @Value("${contacts.email}")
    private String email;

    @Value("${contacts.address}")
    private String address;

    @Value("${contacts.site}")
    private String site;

    @GetMapping("/api/thymeleaf")
    public String getContatti(Model model) {
        model.addAttribute("title", "Informazioni");
        model.addAttribute("number", number);
        model.addAttribute("email", email);
        model.addAttribute("address", address);
        model.addAttribute("site", site);

        ArrayList<User> admins = DatabaseHandler.getInstance().getUserDao().getAdmins().join();
        model.addAttribute("admins", admins);

        return "thymeleafcontatti";
    }
}
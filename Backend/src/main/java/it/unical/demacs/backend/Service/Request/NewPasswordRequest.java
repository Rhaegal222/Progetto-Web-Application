package it.unical.demacs.backend.Service.Request;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class NewPasswordRequest {
    String oldPassword, newPassword, email;
}

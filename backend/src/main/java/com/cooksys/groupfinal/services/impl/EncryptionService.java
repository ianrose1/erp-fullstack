package com.cooksys.groupfinal.services.impl;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.crypto.bcrypt.BCrypt;
import org.springframework.stereotype.Service;

import javax.annotation.PostConstruct;


@Service
public class EncryptionService {

    @Value("${encryption.salt.rounds}")
    private int saltRounds;
    private String salt;

    @PostConstruct
    public void postConstruct(){
        // generates a salt based on salt rounds
        salt = BCrypt.gensalt(saltRounds);
    }

    // hash a password based on salt
    public String encryptPassword(String password){
        return BCrypt.hashpw(password, salt);
    }

    // checks plain text password to the hash password
    public boolean verifyPassword(String password, String hash){
        return BCrypt.checkpw(password, hash);
    }
}

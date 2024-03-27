package com.cooksys.groupfinal.entities;

import javax.persistence.Column;
import javax.persistence.Embeddable;

import lombok.Data;
import lombok.NoArgsConstructor;

@Embeddable
@NoArgsConstructor
@Data
public class Profile {

    private String firstname;

    private String lastname;

    @Column(nullable = false)
    private String email;

    private String phone;

}

package com.cooksys.groupfinal.services;

import com.cooksys.groupfinal.dtos.CredentialsDto;
import com.cooksys.groupfinal.dtos.FullUserDto;
import com.cooksys.groupfinal.dtos.UserRequestDto;

import java.util.Set;

public interface UserService {

	FullUserDto login(CredentialsDto credentialsDto);


    Set<FullUserDto> getUsers();

    FullUserDto getUser(long userId);

    FullUserDto deleteUser(long userId);

    FullUserDto createUser(UserRequestDto userRequestDto);
}

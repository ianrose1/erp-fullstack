package com.cooksys.groupfinal.services;

import com.cooksys.groupfinal.dtos.CredentialsDto;
import com.cooksys.groupfinal.dtos.FullUserDto;
import com.cooksys.groupfinal.dtos.LoginDto;
import com.cooksys.groupfinal.dtos.UserRequestDto;

import java.util.Set;

public interface UserService {

	FullUserDto login(LoginDto loginDto);


    Set<FullUserDto> getUsers();

    FullUserDto getUser(long userId);

    FullUserDto deleteUser(long userId);

    FullUserDto createUser(UserRequestDto userRequestDto);

	FullUserDto updateUser(long userId, UserRequestDto userRequestDto);

    FullUserDto resetUser(long userId, CredentialsDto credentialsDto);
}

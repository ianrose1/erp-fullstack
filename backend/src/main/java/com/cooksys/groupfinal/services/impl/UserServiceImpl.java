package com.cooksys.groupfinal.services.impl;

import java.util.Optional;
import java.util.Set;

import com.cooksys.groupfinal.dtos.UserRequestDto;
import com.cooksys.groupfinal.mappers.ProfileMapper;
import org.springframework.stereotype.Service;

import com.cooksys.groupfinal.dtos.CredentialsDto;
import com.cooksys.groupfinal.dtos.FullUserDto;
import com.cooksys.groupfinal.entities.Credentials;
import com.cooksys.groupfinal.entities.User;
import com.cooksys.groupfinal.exceptions.BadRequestException;
import com.cooksys.groupfinal.exceptions.NotAuthorizedException;
import com.cooksys.groupfinal.exceptions.NotFoundException;
import com.cooksys.groupfinal.mappers.CredentialsMapper;
import com.cooksys.groupfinal.mappers.FullUserMapper;
import com.cooksys.groupfinal.repositories.UserRepository;
import com.cooksys.groupfinal.services.UserService;

import lombok.RequiredArgsConstructor;

import javax.swing.text.html.Option;

@Service
@RequiredArgsConstructor
public class UserServiceImpl implements UserService {

    private final UserRepository userRepository;
    private final FullUserMapper fullUserMapper;
    private final CredentialsMapper credentialsMapper;
    private final ProfileMapper profileMapper;

    private User findUser(String username) {
        Optional<User> user = userRepository.findByCredentialsUsernameAndActiveTrue(username);
        if (user.isEmpty()) {
            throw new NotFoundException("The username provided does not belong to an active user.");
        }
        return user.get();
    }

    @Override
    public FullUserDto login(CredentialsDto credentialsDto) {
        if (credentialsDto == null || credentialsDto.getUsername() == null || credentialsDto.getPassword() == null) {
            throw new BadRequestException("A username and password are required.");
        }
        Credentials credentialsToValidate = credentialsMapper.dtoToEntity(credentialsDto);
        User userToValidate = findUser(credentialsDto.getUsername());
        if (!userToValidate.getCredentials().equals(credentialsToValidate)) {
            throw new NotAuthorizedException("The provided credentials are invalid.");
        }
        if (userToValidate.getStatus().equals("PENDING")) {
            userToValidate.setStatus("JOINED");
            userRepository.saveAndFlush(userToValidate);
        }
        return fullUserMapper.entityToFullUserDto(userToValidate);
    }

    @Override
    public Set<FullUserDto> getUsers() {
        return fullUserMapper.entitiesToFullUserDtos(userRepository.findByActiveTrue());
    }

    @Override
    public FullUserDto getUser(long userId) {
        User user = userRepository.findByIdAndActiveTrue(userId);

        if (user == null) {
            throw new BadRequestException("No user found");
        }

        return fullUserMapper.entityToFullUserDto(user);
    }

    @Override
    public FullUserDto deleteUser(long userId) {
        User user = userRepository.findByIdAndActiveTrue(userId);
        if (user == null) {
            throw new BadRequestException("No user found");
        }
        user.setActive(false);
        return fullUserMapper.entityToFullUserDto(userRepository.saveAndFlush(user));
    }

    @Override
    public FullUserDto createUser(UserRequestDto userRequestDto) {
        if (userRequestDto == null) {
            throw new BadRequestException("User information cannot be null");
        }

        User userToCreate = fullUserMapper.requestDtoToEntity(userRequestDto);
        userRepository.saveAndFlush(userToCreate);
        userToCreate.setCredentials(credentialsMapper.dtoToEntity(userRequestDto.getCredentials()));
        userToCreate.setProfile(profileMapper.dtoToEntity(userRequestDto.getProfile()));

        return fullUserMapper.entityToFullUserDto(userToCreate);
    }


}

package com.cooksys.groupfinal.controllers;

import com.cooksys.groupfinal.dtos.LoginDto;
import com.cooksys.groupfinal.dtos.UserRequestDto;
import org.springframework.web.bind.annotation.*;

import com.cooksys.groupfinal.dtos.CredentialsDto;
import com.cooksys.groupfinal.dtos.FullUserDto;
import com.cooksys.groupfinal.services.UserService;

import lombok.RequiredArgsConstructor;

import java.util.Set;

@RestController
@RequestMapping("/users")
@RequiredArgsConstructor
@CrossOrigin(origins = "http://localhost:4200")
public class UserController {

    private final UserService userService;

    @PostMapping("/login")
    @CrossOrigin(origins = "*")
    public FullUserDto login(@RequestBody LoginDto loginDto) {
        return userService.login(loginDto);
    }


    @GetMapping()
    public Set<FullUserDto> getUsers() {
        return userService.getUsers();
    }

    @GetMapping("{userId}")
    public FullUserDto getUser(@PathVariable long userId) {
        return userService.getUser(userId);
    }

    @DeleteMapping("{userId}")
    public FullUserDto deleteUser(@PathVariable long userId) {
        return userService.deleteUser(userId);
    }
    
    @PostMapping()
    public FullUserDto createUser(@RequestBody UserRequestDto userRequestDto) {
        return userService.createUser(userRequestDto);
    }

    @PatchMapping("{userId}")
    public FullUserDto updateUser(@PathVariable long userId, @RequestBody UserRequestDto userRequestDto) {
        return userService.updateUser(userId, userRequestDto);
    }

    @PatchMapping("{userId}/reset")
    public FullUserDto resetUser(@PathVariable long userId, @RequestBody CredentialsDto credentialsDto){
        return userService.resetUser(userId, credentialsDto);
    }

}

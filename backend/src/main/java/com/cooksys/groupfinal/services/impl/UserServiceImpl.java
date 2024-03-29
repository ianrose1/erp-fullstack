package com.cooksys.groupfinal.services.impl;

import java.util.Optional;
import java.util.Set;

import org.springframework.stereotype.Service;

import com.cooksys.groupfinal.dtos.CredentialsDto;
import com.cooksys.groupfinal.dtos.FullUserDto;
import com.cooksys.groupfinal.dtos.LoginDto;
import com.cooksys.groupfinal.dtos.UserRequestDto;
import com.cooksys.groupfinal.entities.Company;
import com.cooksys.groupfinal.entities.Credentials;
import com.cooksys.groupfinal.entities.Team;
import com.cooksys.groupfinal.entities.User;
import com.cooksys.groupfinal.exceptions.BadRequestException;
import com.cooksys.groupfinal.exceptions.NotAuthorizedException;
import com.cooksys.groupfinal.exceptions.NotFoundException;
import com.cooksys.groupfinal.mappers.CredentialsMapper;
import com.cooksys.groupfinal.mappers.FullUserMapper;
import com.cooksys.groupfinal.mappers.ProfileMapper;
import com.cooksys.groupfinal.repositories.CompanyRepository;
import com.cooksys.groupfinal.repositories.TeamRepository;
import com.cooksys.groupfinal.repositories.UserRepository;
import com.cooksys.groupfinal.services.UserService;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class UserServiceImpl implements UserService {

    private final UserRepository userRepository;
    private final CompanyRepository companyRepository;
    private final TeamRepository teamRepository;
    private final FullUserMapper fullUserMapper;
    private final CredentialsMapper credentialsMapper;
    private final ProfileMapper profileMapper;
    private final EncryptionService encryptionService;
    private final EmailService emailService;

    private User findUser(String email) {
        Optional<User> user = userRepository.findByProfileEmailAndActiveTrue(email);
        if (user.isEmpty()) {
            throw new NotFoundException("The email provided does not belong to an active user.");
        }
        return user.get();
    }

    @Override
    public FullUserDto login(LoginDto loginDto) {

        if (loginDto == null || loginDto.getEmail() == null || loginDto.getPassword() == null) {
            throw new BadRequestException("An email and password are required.");
        }

        User userToValidate = findUser(loginDto.getEmail());

        if (!encryptionService.verifyPassword(loginDto.getPassword(), userToValidate.getCredentials().getPassword())) {
            throw new NotAuthorizedException("Provided credentials are invalid.");
        }
//        if (!userToValidate.getCredentials().equals(credentialsToValidate)) {
//            throw new NotAuthorizedException("The provided credentials are invalid.");
//        }
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
        user.setStatus("DELETED");
        return fullUserMapper.entityToFullUserDto(userRepository.saveAndFlush(user));
    }

    @Override
    public FullUserDto createUser(UserRequestDto userRequestDto) {
        if (userRequestDto == null) {
            throw new BadRequestException("User information cannot be null");
        }

        User userToCreate = fullUserMapper.requestDtoToEntity(userRequestDto);
        userToCreate.setActive(true);

        Credentials credentials = credentialsMapper.dtoToEntity(userRequestDto.getCredentials());
        credentials.setPassword(encryptionService.encryptPassword(credentials.getPassword()));
        userToCreate.setCredentials(credentials);
        userRepository.saveAndFlush(userToCreate);
        
        userToCreate.setProfile(profileMapper.dtoToEntity(userRequestDto.getProfile()));
        
        userToCreate.setAdmin(userRequestDto.getIsAdmin());
        
        Optional<Company> optionalCompany = companyRepository.findById(userRequestDto.getCompanyId());
        if(optionalCompany.isEmpty()) {
        	throw new NotFoundException("No company found with the provided ID");
        }
        Company company = optionalCompany.get();
        userToCreate.getCompanies().add(company);
        company.getUsers().add(userToCreate);
        companyRepository.save(company);
        
        emailService.sendEmail(userToCreate.getProfile().getEmail(), "Welcome to Binary Brigade's Dashboard!", createEmailMessage(userToCreate));

        return fullUserMapper.entityToFullUserDto(userToCreate);
    }

    @Override
    public FullUserDto updateUser(long userId, UserRequestDto userRequestDto) {

        if (userRequestDto == null) {
            throw new BadRequestException("User information cannot be null");
        }

        User userToUpdate = userRepository.findByIdAndActiveTrue(userId);
        if (userToUpdate == null) {
            throw new NotFoundException("User not found with ID: " + userId);
        }
        if (userRequestDto.getProfile() != null) {
            userToUpdate.setProfile(profileMapper.dtoToEntity(userRequestDto.getProfile()));
        }
        if (userRequestDto.getIsAdmin() != null) {
        	userToUpdate.setAdmin(userRequestDto.getIsAdmin());
        }

        userRepository.saveAndFlush(userToUpdate);
        return fullUserMapper.entityToFullUserDto(userToUpdate);

    }

    @Override
    public FullUserDto resetUser(long userId, CredentialsDto credentialsDto) {
        Optional<User> optionalUser = userRepository.findById(userId);
        if (credentialsDto == null || credentialsDto.getPassword() == null && credentialsDto.getUsername() == null) {
            throw new BadRequestException("No credentials provided");
        }

        if (optionalUser.isEmpty()) {
            return null;
        }
        User userToUpdate = optionalUser.get();
        if (credentialsDto.getUsername() != null) {
            userToUpdate.getCredentials().setUsername(credentialsDto.getUsername());
        }
        if (credentialsDto.getPassword() != null) {
            userToUpdate.getCredentials().setPassword(encryptionService.encryptPassword(credentialsDto.getPassword()));
        }
        userRepository.saveAndFlush(userToUpdate);

        return fullUserMapper.entityToFullUserDto(userToUpdate);
    }
    private String createEmailMessage(User user){

//        String string = "Dear " + user.getProfile().getFirstname() + " " + ;
//        String s = String.format("Hello %s %s, \n Your account has been created", user.getProfile().getFirstname(),
//                user.getProfile().getLastname());

        return "Dear " + user.getProfile().getFirstname() + " " + user.getProfile().getLastname() + ", " +
                "\nWelcome to the Binary Brigade Dashboard!\nWe are thrilled to have you on board. Your account has been successfully created, and you are now part of our community." +
                "\n\nHere are your account details: " +
                "\nUsername: " +
                user.getCredentials().getUsername() +
                "\nEmail: " +
                user.getProfile().getEmail() +
                "\n\nThank you for choosing Binary Brigade.\nWe look forward to serving you and providing you with an exceptional experience." +
                "\n\nBest regards\nBinary Brigade Team";
    }


}

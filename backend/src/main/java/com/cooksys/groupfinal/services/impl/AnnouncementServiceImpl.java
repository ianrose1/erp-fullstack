package com.cooksys.groupfinal.services.impl;

import java.util.HashSet;
import java.util.List;
import java.util.Optional;
import java.util.Set;

import org.springframework.stereotype.Service;

import com.cooksys.groupfinal.dtos.AnnouncementDto;
import com.cooksys.groupfinal.dtos.AnnouncementRequestDto;
import com.cooksys.groupfinal.entities.Announcement;
import com.cooksys.groupfinal.entities.Company;
import com.cooksys.groupfinal.entities.User;
import com.cooksys.groupfinal.exceptions.NotFoundException;
import com.cooksys.groupfinal.mappers.AnnouncementMapper;
import com.cooksys.groupfinal.mappers.CredentialsMapper;
import com.cooksys.groupfinal.mappers.FullUserMapper;
import com.cooksys.groupfinal.repositories.AnnouncementRepository;
import com.cooksys.groupfinal.repositories.CompanyRepository;
import com.cooksys.groupfinal.repositories.UserRepository;
import com.cooksys.groupfinal.services.AnnouncementService;
import com.cooksys.groupfinal.services.UserService;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class AnnouncementServiceImpl implements AnnouncementService {
	
	private final AnnouncementRepository announcementRepository;
	private final UserRepository userRepository;
	private final CompanyRepository companyRepository;
	private final AnnouncementMapper announcementMapper;
	private final CredentialsMapper credentialsMapper;
	private final FullUserMapper fullUserMapper;
	private final UserService userService;
	
	@Override
	public Set<AnnouncementDto> getAllAnnouncements() {
		List<Announcement> announcementsList = announcementRepository.findAll();
		Set<Announcement> announcementsSet = new HashSet<>(announcementsList);		
		return announcementMapper.entitiesToDtos(announcementsSet);
	}


	@Override
	public AnnouncementDto createAnnouncement(Long userId, Long companyId,
			AnnouncementRequestDto announcementRequestDto) {
		
		User author = userRepository.findByIdAndActiveTrue(userId);
		if (author == null) {
			throw new NotFoundException("The user found with the provided id.");
		}
		
		Optional<Company> optionalCompany = companyRepository.findById(companyId);
		if (optionalCompany.isEmpty()) {
			throw new NotFoundException("The company found with the provided id.");
		}
		Company company = optionalCompany.get();
		
		Announcement announcementToCreate = announcementMapper.dtoToEntity(announcementRequestDto);
		announcementRepository.save(announcementToCreate);
		announcementToCreate.setAuthor(author); 
		announcementToCreate.setCompany(company);
		
		announcementRepository.saveAndFlush(announcementToCreate);
		return announcementMapper.entityToDto(announcementToCreate);
		
	}

//	Original prototype:	
//	@Override
//	public AnnouncementDto createAnnouncement(AnnouncementRequestDto announcementRequestDto) {
//		
//		// Assuming we retain this info after the login flow
//		Credentials creds = credentialsMapper.dtoToEntity(announcementRequestDto.getCredentials());
//		
//		Optional<User> optionalUser = userRepository.findByCredentialsUsernameAndActiveTrue(creds.getUsername());
//        if (optionalUser.isEmpty()) {
//            throw new NotFoundException("The username provided does not belong to an active user.");
//        }
//        User author = optionalUser.get();
//        
//        // Assuming we will get the company name from the selected option from the dropdown
//        Optional<Company> optionalCompany = companyRepository.findByName(announcementRequestDto.getCompanyName());
//        if (optionalCompany.isEmpty()) {
//        	throw new  NotFoundException("The company's name provided does not exist.");
//        }
//        Company company = optionalCompany.get();
//		
//		Announcement announcementToCreate = announcementMapper.dtoToEntity(announcementRequestDto);
//		announcementRepository.save(announcementToCreate);
//		announcementToCreate.setAuthor(author); // TODO: to revisit as AnnouncementDto currently has a BasicUserDto author field
//		announcementToCreate.setCompany(company);
//		
//		announcementRepository.saveAndFlush(announcementToCreate);
//		
//		return announcementMapper.entityToDto(announcementToCreate);
//	}
	

}
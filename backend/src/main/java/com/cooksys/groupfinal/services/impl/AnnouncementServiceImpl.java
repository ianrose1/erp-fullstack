package com.cooksys.groupfinal.services.impl;

import java.util.HashSet;
import java.util.List;
import java.util.Optional;
import java.util.Set;

import org.springframework.stereotype.Service;

import com.cooksys.groupfinal.dtos.AnnouncementDto;
import com.cooksys.groupfinal.dtos.AnnouncementRequestDto;
import com.cooksys.groupfinal.entities.Announcement;
import com.cooksys.groupfinal.entities.Credentials;
import com.cooksys.groupfinal.entities.User;
import com.cooksys.groupfinal.exceptions.NotFoundException;
import com.cooksys.groupfinal.mappers.AnnouncementMapper;
import com.cooksys.groupfinal.mappers.BasicUserMapper;
import com.cooksys.groupfinal.mappers.CompanyMapper;
import com.cooksys.groupfinal.mappers.CredentialsMapper;
import com.cooksys.groupfinal.repositories.AnnouncementRepository;
import com.cooksys.groupfinal.repositories.UserRepository;
import com.cooksys.groupfinal.services.AnnouncementService;
import com.cooksys.groupfinal.services.UserService;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class AnnouncementServiceImpl implements AnnouncementService {
	
	private final AnnouncementRepository announcementRepository;
	private final UserRepository userRepository;
	private final AnnouncementMapper announcementMapper;
	private final CompanyMapper companyMapper;
	private final BasicUserMapper basicUserMapper;
	private final CredentialsMapper credentialsMapper;
	private final UserService userService;
	
	@Override
	public Set<AnnouncementDto> getAllAnnouncements() {
		List<Announcement> announcementsList = announcementRepository.findAll();
		Set<Announcement> announcementsSet = new HashSet<>(announcementsList);		
		return announcementMapper.entitiesToDtos(announcementsSet);
	}

	@Override
	public AnnouncementDto createAnnouncement(AnnouncementRequestDto announcementRequestDto) {
		
//		Credentials creds = credentialsMapper.dtoToEntity(announcementRequestDto.getCredentials());
//		
//		Optional<User> optionalUser = userRepository.findByCredentialsUsernameAndActiveTrue(creds.getUsername());
//        if (optionalUser.isEmpty()) {
//            throw new NotFoundException("The username provided does not belong to an active user.");
//        }
//        User author = optionalUser.get();
//		
//		
//		Announcement announcement = announcementMapper.dtoToEntity(announcementRequestDto);
//		Announcement createdAnnouncement = announcementRepository.saveAndFlush(announcement);
//		createdAnnouncement.setAuthor(author);
		
		
		return null;
	}
	

}
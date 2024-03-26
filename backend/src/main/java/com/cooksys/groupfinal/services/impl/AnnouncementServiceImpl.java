package com.cooksys.groupfinal.services.impl;

import java.util.HashSet;
import java.util.List;
import java.util.Set;

import org.springframework.stereotype.Service;

import com.cooksys.groupfinal.dtos.AnnouncementDto;
import com.cooksys.groupfinal.entities.Announcement;
import com.cooksys.groupfinal.mappers.AnnouncementMapper;
import com.cooksys.groupfinal.repositories.AnnouncementRepository;
import com.cooksys.groupfinal.services.AnnouncementService;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class AnnouncementServiceImpl implements AnnouncementService {
	
	private final AnnouncementRepository announcementRepository;
	private final AnnouncementMapper announcementMapper;
	
	@Override
	public Set<AnnouncementDto> getAllAnnouncements() {
		List<Announcement> announcementsList = announcementRepository.findAll();
		Set<Announcement> announcementsSet = new HashSet<>(announcementsList);		
		return announcementMapper.entitiesToDtos(announcementsSet);
	}

	@Override
	public AnnouncementDto createAnnouncement() {
		// TODO Auto-generated method stub
		return null;
	}
	

}
package com.cooksys.groupfinal.controllers;

import java.util.Set;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.cooksys.groupfinal.dtos.AnnouncementDto;
import com.cooksys.groupfinal.dtos.AnnouncementRequestDto;
import com.cooksys.groupfinal.services.AnnouncementService;

import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/announcements")
@RequiredArgsConstructor
public class AnnouncementController {
	
	private final AnnouncementService announcementService;
	
	@GetMapping 
	public Set<AnnouncementDto> getAllAnnouncements() {
		return announcementService.getAllAnnouncements();
	}
	
	@PostMapping 
	public AnnouncementDto createAnnouncement(@RequestBody AnnouncementRequestDto announcementRequestDto) {
		return announcementService.createAnnouncement(announcementRequestDto);
	}
	

}

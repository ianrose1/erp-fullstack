package com.cooksys.groupfinal.controllers;

import java.util.Set;

import org.springframework.web.bind.annotation.*;

import com.cooksys.groupfinal.dtos.AnnouncementDto;
import com.cooksys.groupfinal.dtos.AnnouncementRequestDto;
import com.cooksys.groupfinal.services.AnnouncementService;

import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/announcements")
@RequiredArgsConstructor
@CrossOrigin(origins = "http://localhost:4200")
public class AnnouncementController {
	
	private final AnnouncementService announcementService;
	
	@GetMapping 
	public Set<AnnouncementDto> getAllAnnouncements() {
		return announcementService.getAllAnnouncements();
	}
	
	@PostMapping("{userId}/{companyId}") 
	public AnnouncementDto createAnnouncement(@PathVariable Long userId, @PathVariable Long companyId,  @RequestBody AnnouncementRequestDto announcementRequestDto) {
		return announcementService.createAnnouncement(userId, companyId, announcementRequestDto);
	}
	
	@PatchMapping("{id}")
	public AnnouncementDto updateAnnouncement(@PathVariable Long id,  @RequestBody AnnouncementRequestDto announcementRequestDto) {
		return announcementService.updateAnnouncement(id, announcementRequestDto);
	}
	
	@DeleteMapping("{id}")
	public AnnouncementDto deleteAnnouncement(@PathVariable Long id) {
		return announcementService.deleteAnnouncement(id);
	}
	

}

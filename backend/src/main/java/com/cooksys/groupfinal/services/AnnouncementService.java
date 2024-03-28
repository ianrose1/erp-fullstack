package com.cooksys.groupfinal.services;

import java.util.Set;

import com.cooksys.groupfinal.dtos.AnnouncementDto;
import com.cooksys.groupfinal.dtos.AnnouncementRequestDto;

public interface AnnouncementService {

	Set<AnnouncementDto> getAllAnnouncements();

	AnnouncementDto createAnnouncement(Long userId, Long companyId, AnnouncementRequestDto announcementRequestDto);

	AnnouncementDto updateAnnouncement(Long id, AnnouncementRequestDto announcementRequestDto);

	AnnouncementDto deleteAnnouncement(Long id);

//	AnnouncementDto createAnnouncement(AnnouncementRequestDto announcementRequestDto);


}

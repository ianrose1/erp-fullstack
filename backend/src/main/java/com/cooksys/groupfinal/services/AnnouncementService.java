package com.cooksys.groupfinal.services;

import java.util.Set;

import com.cooksys.groupfinal.dtos.AnnouncementDto;
import com.cooksys.groupfinal.dtos.AnnouncementRequestDto;

public interface AnnouncementService {

	Set<AnnouncementDto> getAllAnnouncements();

	AnnouncementDto createAnnouncement(AnnouncementRequestDto announcementRequestDto);


}

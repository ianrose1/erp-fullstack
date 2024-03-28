package com.cooksys.groupfinal.repositories;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.cooksys.groupfinal.entities.Announcement;

@Repository
public interface AnnouncementRepository extends JpaRepository<Announcement, Long> {
	
	Optional<Announcement> findById(Long id);
	List<Announcement> findAllByDeletedFalse(); 


}

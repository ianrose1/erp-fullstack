package com.cooksys.groupfinal.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.cooksys.groupfinal.entities.Project;

import java.util.List;
import java.util.Set;

@Repository
public interface ProjectRepository extends JpaRepository<Project, Long> {

    Set<Project> findByTeam_Id(Long id);


    Set<Project> findByActiveFalse();

    Set<Project> findByTeam_IdAndActiveFalse(Long id);
}
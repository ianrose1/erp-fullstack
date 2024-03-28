package com.cooksys.groupfinal.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.cooksys.groupfinal.entities.Company;
import com.cooksys.groupfinal.entities.Team;

import java.util.Optional;
import java.util.Set;

@Repository
public interface TeamRepository extends JpaRepository<Team, Long> {


    Set<Team> findByDeletedFalse();

    Team findByIdAndDeletedFalse(Long id);
    
    Optional<Team> findById(Long id);
}
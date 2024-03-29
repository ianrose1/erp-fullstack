package com.cooksys.groupfinal.services.impl;

import com.cooksys.groupfinal.dtos.BasicUserDto;
import com.cooksys.groupfinal.dtos.TeamDto;
import com.cooksys.groupfinal.entities.Company;
import com.cooksys.groupfinal.entities.Team;
import com.cooksys.groupfinal.exceptions.BadRequestException;
import com.cooksys.groupfinal.exceptions.NotFoundException;
import com.cooksys.groupfinal.mappers.BasicUserMapper;
import com.cooksys.groupfinal.mappers.TeamMapper;
import com.cooksys.groupfinal.repositories.CompanyRepository;
import com.cooksys.groupfinal.repositories.TeamRepository;
import com.cooksys.groupfinal.repositories.UserRepository;
import org.springframework.stereotype.Service;

import com.cooksys.groupfinal.services.TeamService;

import lombok.RequiredArgsConstructor;

import java.util.Optional;
import java.util.Set;

@Service
@RequiredArgsConstructor
public class TeamServiceImpl implements TeamService {
    private final TeamRepository teamRepository;
    private final TeamMapper teamMapper;
    private final BasicUserMapper basicUserMapper;
    private final CompanyRepository companyRepository;

    @Override
    public Set<TeamDto> getAllTeams() {
        return teamMapper.entitiesToDtos(teamRepository.findByDeletedFalse());
    }

    @Override
    public TeamDto getTeamById(long teamId) {
        return teamMapper.entityToDto(teamRepository.findByIdAndDeletedFalse(teamId));
    }

    @Override
    public TeamDto deleteTeam(long teamId) {
        Optional<Team> optionalTeam = teamRepository.findById(teamId);
        if(optionalTeam.isEmpty()){
            throw new BadRequestException("No team with id: " + teamId + " found");
        }
        Team teamToDelete = optionalTeam.get();
        teamToDelete.setDeleted(true);

        return teamMapper.entityToDto(teamRepository.saveAndFlush(teamToDelete));
    }

    @Override
    public TeamDto createTeam(TeamDto teamDto) {
        if(teamDto == null){
            throw new BadRequestException("Team information cannot be null");
        }
        Team teamToCreate = teamMapper.dtoToEntity(teamDto);
        teamRepository.saveAndFlush(teamToCreate);
        teamToCreate.setUsers(basicUserMapper.basicUserDtosToEntities(teamDto.getUsers()));
        Optional<Company> optionalCompany = companyRepository.findById(teamDto.getCompanyId());
        if(optionalCompany.isEmpty()) {
            throw new NotFoundException("No company found with the provided ID");
        }
        Company company = optionalCompany.get();
        teamToCreate.setCompany(company);
        teamRepository.saveAndFlush(teamToCreate);
        company.getTeams().add(teamToCreate);
        companyRepository.save(company);
        return teamMapper.entityToDto(teamToCreate);
    }

	@Override
	public TeamDto updateTeam(long teamId, TeamDto teamDto) {
        Optional<Team> optionalTeam = teamRepository.findById(teamId);
        if(optionalTeam.isEmpty()){
            throw new BadRequestException("No team with id: " + teamId + " found");
        }
        Team teamToUpdate = optionalTeam.get();
        if (teamDto.getName() != null) {
        	teamToUpdate.setName(teamDto.getName());
        }
        if (teamDto.getDescription() != null) {
        	teamToUpdate.setDescription(teamDto.getDescription());
        } 
        if (teamDto.getUsers() != null) {
        	teamToUpdate.setUsers(basicUserMapper.basicUserDtosToEntities(teamDto.getUsers()));
        }
        
        teamRepository.saveAndFlush(teamToUpdate);
        return teamMapper.entityToDto(teamToUpdate); 
	}
	
}

package com.cooksys.groupfinal.services.impl;

import com.cooksys.groupfinal.dtos.BasicUserDto;
import com.cooksys.groupfinal.dtos.TeamDto;
import com.cooksys.groupfinal.entities.Team;
import com.cooksys.groupfinal.exceptions.BadRequestException;
import com.cooksys.groupfinal.mappers.BasicUserMapper;
import com.cooksys.groupfinal.mappers.TeamMapper;
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
        teamToCreate.setTeammates(basicUserMapper.basicUserDtosToEntities(teamDto.getTeammates()));
        return teamMapper.entityToDto(teamToCreate);
    }
}

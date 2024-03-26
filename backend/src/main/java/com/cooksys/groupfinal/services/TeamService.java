package com.cooksys.groupfinal.services;

import com.cooksys.groupfinal.dtos.TeamDto;

import java.util.Set;

public interface TeamService {

    Set<TeamDto> getAllTeams();

    TeamDto getTeamById(long teamId);

    TeamDto deleteTeam(long teamId);

    TeamDto createTeam(TeamDto teamDto);

	TeamDto updateTeam(long teamId, TeamDto teamDto);

	
}

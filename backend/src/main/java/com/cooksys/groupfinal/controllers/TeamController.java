package com.cooksys.groupfinal.controllers;

import com.cooksys.groupfinal.dtos.TeamDto;
import org.springframework.web.bind.annotation.*;

import com.cooksys.groupfinal.services.TeamService;

import lombok.RequiredArgsConstructor;

import java.util.Set;

@RestController
@RequestMapping("/team")
@RequiredArgsConstructor
public class TeamController {
	
	private final TeamService teamService;

	@GetMapping()
	public Set<TeamDto> getTeams(){
		return teamService.getAllTeams();
	}

	@GetMapping("{teamId}")
	public TeamDto getTeamById(@PathVariable long teamId){
		return teamService.getTeamById(teamId);
	}

	@PostMapping()
	public TeamDto createTeam(@RequestBody TeamDto teamDto){
		return teamService.createTeam(teamDto);
	}

	@DeleteMapping("{teamId}")
	public TeamDto deleteTeam(@PathVariable long teamId){
		return teamService.deleteTeam(teamId);
	}

}

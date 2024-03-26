package com.cooksys.groupfinal.controllers;

import java.util.Set;

import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.cooksys.groupfinal.dtos.TeamDto;
import com.cooksys.groupfinal.services.TeamService;

import lombok.RequiredArgsConstructor;

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
	
	@PatchMapping("{projectId}")
	public TeamDto updateTeam(@PathVariable long teamId, @RequestBody TeamDto teamDto) {
		return teamService.updateTeam(teamId, teamDto);
	}

}

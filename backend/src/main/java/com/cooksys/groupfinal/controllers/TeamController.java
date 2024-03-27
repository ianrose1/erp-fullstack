package com.cooksys.groupfinal.controllers;

import java.util.Set;

import org.springframework.web.bind.annotation.*;

import com.cooksys.groupfinal.dtos.TeamDto;
import com.cooksys.groupfinal.services.TeamService;

import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/team")
@RequiredArgsConstructor
@CrossOrigin(origins = "http://localhost:4200")
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
	
	@PatchMapping("{teamId}")
	public TeamDto updateTeam(@PathVariable long teamId, @RequestBody TeamDto teamDto) {
		return teamService.updateTeam(teamId, teamDto);
	}

}

package com.cooksys.groupfinal.controllers;

import com.cooksys.groupfinal.dtos.ProjectDto;
import org.springframework.web.bind.annotation.*;

import com.cooksys.groupfinal.services.ProjectService;

import lombok.RequiredArgsConstructor;

import java.util.List;
import java.util.Set;

@RestController
@RequestMapping("/projects")
@RequiredArgsConstructor
@CrossOrigin(origins = "http://localhost:4200")
public class ProjectController {
	
	private final ProjectService projectService;


	@PostMapping()
	public ProjectDto createProject(@RequestBody ProjectDto projectDto){
		return projectService.createProject(projectDto);
	}

	@GetMapping()
	public Set<ProjectDto> getAllProjects(){
		return projectService.getAllProjects();
	}
	@GetMapping("{teamId}")
	public Set<ProjectDto> getProjectsByTeam(@PathVariable long teamId){
		return projectService.getProjectsByTeamId(teamId);
	}

	@PatchMapping("/project/{projectId}")
	public ProjectDto updateProject(@PathVariable long projectId, @RequestBody ProjectDto projectDto){
		return projectService.updateProject(projectId, projectDto);
	}

	@DeleteMapping("/project/{projectId}")
	public ProjectDto deleteProject(@PathVariable long projectId){
		return projectService.deleteProject(projectId);
	}


}

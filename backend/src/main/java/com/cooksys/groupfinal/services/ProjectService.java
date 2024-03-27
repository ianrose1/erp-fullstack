package com.cooksys.groupfinal.services;

import com.cooksys.groupfinal.dtos.ProjectDto;

import java.util.List;
import java.util.Set;

public interface ProjectService {

    Set<ProjectDto> getProjectsByTeamId(long teamId);

    Set<ProjectDto> getAllProjects();

    ProjectDto updateProject(long projectId, ProjectDto projectDto);

    ProjectDto createProject(ProjectDto projectDto);

    ProjectDto deleteProject(long projectId);
}

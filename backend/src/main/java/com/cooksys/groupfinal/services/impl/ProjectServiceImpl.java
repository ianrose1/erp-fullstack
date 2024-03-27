package com.cooksys.groupfinal.services.impl;

import com.cooksys.groupfinal.dtos.ProjectDto;
import com.cooksys.groupfinal.dtos.TeamDto;
import com.cooksys.groupfinal.entities.Project;
import com.cooksys.groupfinal.entities.Team;
import com.cooksys.groupfinal.exceptions.BadRequestException;
import com.cooksys.groupfinal.mappers.ProjectMapper;
import com.cooksys.groupfinal.mappers.TeamMapper;
import com.cooksys.groupfinal.repositories.ProjectRepository;
import com.cooksys.groupfinal.repositories.TeamRepository;
import org.springframework.stereotype.Service;

import com.cooksys.groupfinal.services.ProjectService;

import lombok.RequiredArgsConstructor;

import java.util.HashSet;
import java.util.List;
import java.util.Optional;
import java.util.Set;

@Service
@RequiredArgsConstructor
public class ProjectServiceImpl implements ProjectService {
    private final ProjectRepository projectRepository;
    private final ProjectMapper projectMapper;
    private final TeamRepository teamRepository;
    private final TeamMapper teamMapper;


    @Override
    public Set<ProjectDto> getAllProjects() {
        return projectMapper.entitiesToDtos(new HashSet<>(projectRepository.findAll()));
    }

    @Override
    public Set<ProjectDto> getProjectsByTeamId(long teamId) {
        return projectMapper.entitiesToDtos(projectRepository.findByTeam_Id(teamId));
    }

    @Override
    public ProjectDto updateProject(long projectId, ProjectDto projectDto) {

        Optional<Project> optionalProject = projectRepository.findById(projectId);

        if (optionalProject.isEmpty() || projectDto == null) {
            throw new BadRequestException("Information is not valid");
        }

        Project projectToUpdate = optionalProject.get();
        if (projectDto.getName() != null) {
            projectToUpdate.setName(projectDto.getName());
        }
        if (projectDto.getDescription() != null) {
            projectToUpdate.setDescription(projectDto.getDescription());
        }
        if (projectDto.getTeam() != null) {
            projectToUpdate.setTeam(teamMapper.dtoToEntity(projectDto.getTeam()));
        }
        projectRepository.saveAndFlush(projectToUpdate);

        return projectMapper.entityToDto(projectToUpdate);
    }

    @Override
    public ProjectDto createProject(ProjectDto projectDto) {
        if (projectDto == null) {
            throw new BadRequestException("Project cannot be null");
        }
        Project projectToCreate = projectMapper.dtoToEntity(projectDto);
        projectRepository.saveAndFlush(projectToCreate);
        projectToCreate.setTeam(teamMapper.dtoToEntity(projectDto.getTeam()));

        return projectMapper.entityToDto(projectToCreate);
    }

    @Override
    public ProjectDto deleteProject(long projectId) {
        Optional<Project> optionalProject = projectRepository.findById(projectId);
        if (optionalProject.isEmpty()) {
            throw new BadRequestException("Project does not exist");
        }
        Project projectToDelete = optionalProject.get();
        if (!projectToDelete.isActive()) {
            throw new BadRequestException("Project is already deleted");
        }
        projectToDelete.setActive(false);
        return projectMapper.entityToDto(projectRepository.saveAndFlush(projectToDelete));
    }

}

package com.cooksys.groupfinal.dtos;

import lombok.Data;
import lombok.NoArgsConstructor;

@NoArgsConstructor
@Data
public class BasicUserDto {
	
	private Long id;

    private ProfileDto profile;
    
    private boolean isAdmin;
    
    private boolean active;
    
    private String status;

}
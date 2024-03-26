package com.cooksys.groupfinal.dtos;


import lombok.Data;
import lombok.NoArgsConstructor;

@NoArgsConstructor
@Data
public class AnnouncementRequestDto {
	
	private CredentialsDto credentials;
	
	private String companyName;
	
	private String title;
    
    private String message;
    

}

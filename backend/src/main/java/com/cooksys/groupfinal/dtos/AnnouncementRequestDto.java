package com.cooksys.groupfinal.dtos;


import lombok.Data;
import lombok.NoArgsConstructor;

@NoArgsConstructor
@Data
public class AnnouncementRequestDto {
	
//	private CredentialsDto credentials; // assuming we retain this info after the login flow
//	
//	private String companyName; // assuming we will get the company name from the selected option from the dropdown 
	
	private String title;
    
    private String message;
    

}

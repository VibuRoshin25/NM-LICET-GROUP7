package com.nova.model;


import com.nova.utility.enums.SecurityLevel;

public class ErrorResponse{
	
	private int code;
	private SecurityLevel level;
	private String Description;
	
	public int getCode() {
		return code;
	}
	public void setCode(int code) {
		this.code = code;
	}
	public SecurityLevel getLevel() {
		return level;
	}
	public void setLevel(SecurityLevel level) {
		this.level = level;
	}
	public String getDescription() {
		return Description;
	}
	public void setDescription(String description) {
		Description = description;
	}
	
	
	
	
}

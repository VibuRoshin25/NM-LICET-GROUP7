package com.nova.model;

public class LoginResponse {
	private int statusCode;
	private String name;
	
	public LoginResponse(int statusCode, String name) {
		this.name = name;
		this.statusCode = statusCode;
	}
	
	public int getStatusCode() {
		return statusCode;
	}
	public void setStatusCode(int statusCode) {
		this.statusCode = statusCode;
	}
	public String getName() {
		return name;
	}
	public void setName(String name) {
		this.name = name;
	}
	
}

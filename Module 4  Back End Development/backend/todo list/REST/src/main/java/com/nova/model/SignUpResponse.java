package com.nova.model;

public class SignUpResponse {
	
	private int statusCode;
	private String accountID;
	
	public SignUpResponse(int statusCode,String accountID){
		this.statusCode = statusCode;
		this.accountID = accountID;
	}

	public int getStatusCode() {
		return statusCode;
	}

	public void setStatusCode(int statusCode) {
		this.statusCode = statusCode;
	}

	public String getAccountID() {
		return accountID;
	}

	public void setAccountID(String accountID) {
		this.accountID = accountID;
	}
	
	
}

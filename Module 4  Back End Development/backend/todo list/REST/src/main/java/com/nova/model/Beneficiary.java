package com.nova.model;

public class Beneficiary {
	
	private String accountIDUser;
	private String accountIDBeneficiary;
	private String name;
	private String ifscCode;
	
	public Beneficiary(String accountIDUser, String accountIDBeneficiary, String name, String ifscCode) {
		this.accountIDUser = accountIDUser;
		this.accountIDBeneficiary = accountIDBeneficiary;
		this.name = name;
		this.ifscCode = ifscCode;
	}
	
	public String getAccountIDUser() {
		return accountIDUser;
	}
	public void setAccountIDUser(String accountIDUser) {
		this.accountIDUser = accountIDUser;
	}
	public String getAccountIDBeneficiary() {
		return accountIDBeneficiary;
	}
	public void setAccountIDBeneficiary(String accountIDBeneficiary) {
		this.accountIDBeneficiary = accountIDBeneficiary;
	}
	public String getName() {
		return name;
	}
	public void setName(String name) {
		this.name = name;
	}
	public String getIfscCode() {
		return ifscCode;
	}
	public void setIfscCode(String ifscCode) {
		this.ifscCode = ifscCode;
	}

}

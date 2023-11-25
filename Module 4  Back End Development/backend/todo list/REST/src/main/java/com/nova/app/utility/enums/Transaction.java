package com.nova.app.utility.enums;

public enum Transaction {
	WITHDRAW("Withdraw"),
	DEPOSIT("Deposit"),
	TRANSFER("Transfer");
	
	private final String type;
	
	Transaction(String type){
		this.type = type;
	}

	public String getType() {
		return type;
	}
	
	
}

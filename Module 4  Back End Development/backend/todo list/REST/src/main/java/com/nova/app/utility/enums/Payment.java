package com.nova.app.utility.enums;

public enum Payment {
	WITHDRAW("Withdraw") {
		@Override
		public String getSign(double amount) {
			return (" - " + amount);
		}
	},
	DEPOSIT("Deposit") {
		@Override
		public String getSign(double amount) {
			return (" + " + amount);
		}
	};
	
	private final String mode;
	
	Payment(String mode) {
		this.mode = mode;
	}
	
	public String getMode() {
		return mode;
	}
	
	public abstract String getSign(double Amount);
	
	
}

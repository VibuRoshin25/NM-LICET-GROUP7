package com.nova.exceptions;

public class SignUpException extends RuntimeException {
	
	public SignUpException() {
		super("Error occured while SigningUp");
	}
}

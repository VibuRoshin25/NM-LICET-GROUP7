package com.nova.exceptions;

public class AuthenticationException extends RuntimeException {
	
	
	private static final long serialVersionUID = 1L;

	public AuthenticationException() {
        super("Your access rights are not appropriate");
    }

}
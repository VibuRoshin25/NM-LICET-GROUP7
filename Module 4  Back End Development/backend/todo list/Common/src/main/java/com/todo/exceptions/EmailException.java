package com.nova.exceptions;

public class EmailException extends RuntimeException{
	private static final long serialVersionUID = 2L;

	public EmailException() {
		super("Email Already Exists");
	}
	

}

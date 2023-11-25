package com.nova.exceptions;

public class PhoneNumberException extends RuntimeException  {
	public PhoneNumberException() {
		super("PhoneNumber already exists");
	}

}

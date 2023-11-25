package com.nova.exceptions;

public class BeneficiaryNotFound extends RuntimeException{

	public BeneficiaryNotFound(){
		super("The Beneficiary entered does not exist.");
	}
}

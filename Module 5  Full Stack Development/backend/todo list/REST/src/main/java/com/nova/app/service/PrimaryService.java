package com.nova.app.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.nova.app.repository.PrimaryRepository;
import com.nova.app.utility.enums.Payment;
import com.nova.exceptions.AuthenticationException;
import com.nova.exceptions.BeneficiaryNotFound;
import com.nova.exceptions.EmailException;
import com.nova.exceptions.PhoneNumberException;
import com.nova.exceptions.SignUpException;
import com.nova.model.AuthenticationModel;
import com.nova.model.Balance;
import com.nova.model.Beneficiary;
import com.nova.model.BeneficiaryList;
import com.nova.model.GenericStatusCode;
import com.nova.model.LoginResponse;
import com.nova.model.SignUpModel;
import com.nova.model.SignUpResponse;
import com.nova.model.TransactionModel;
import com.nova.model.TransferDetails;



@Service
public class PrimaryService {
	
	@Autowired
	private PrimaryRepository primaryRepository;
	
	public LoginResponse verifyUser(AuthenticationModel auth) {
		if (primaryRepository.verifyUser(auth)) {
			System.out.println("Here");
			return new LoginResponse(200,primaryRepository.getName(auth.getAccountID()));
		}
		else
			throw new AuthenticationException();

	}
	
	public Balance viewBalance(String accountID) {
        return new Balance(200,primaryRepository.getBalance(accountID));
    }
	
	public GenericStatusCode addBeneficiary(Beneficiary beneficiary) {
        
        if(primaryRepository.verifyBeneficiary(beneficiary)) {
            primaryRepository.createBeneficiary(beneficiary);
            return new GenericStatusCode(200);
        }
        else
            throw new BeneficiaryNotFound();
    }
	
	public SignUpResponse createUser(SignUpModel signUp) {
		if(primaryRepository.checkPhoneNumber(signUp.getPhoneNumber()))
			throw new PhoneNumberException();
		if(primaryRepository.checkEmail(signUp.getEmail()))
			throw new EmailException();
		if (primaryRepository.createUser(signUp)) {
			return new SignUpResponse(200,primaryRepository.getAccountID(signUp.getPhoneNumber()));
		}
			
		else
			throw new SignUpException();
	}
	public GenericStatusCode performTransaction(String accountID,Payment pay,double amount) {
		primaryRepository.performTransaction(accountID, pay,amount);
		primaryRepository.addTransaction(accountID, pay.getMode(), amount, "SELF", "SELF", primaryRepository.getBalance(accountID));
		return new GenericStatusCode(200);
	}
	
	public GenericStatusCode performTransfer(TransferDetails transfer, String accountID) {
		primaryRepository.performTransaction(accountID, Payment.WITHDRAW, transfer.getAmount());
		primaryRepository.performTransaction(transfer.getAccountID(), Payment.DEPOSIT, transfer.getAmount());
		primaryRepository.addTransaction(accountID, "Transfer", transfer.getAmount(), transfer.getReceiverName(), transfer.getAccountID(), primaryRepository.getBalance(accountID));
		primaryRepository.addTransaction(transfer.getAccountID(), "Transfer", transfer.getAmount(), transfer.getSenderName(), accountID, primaryRepository.getBalance(transfer.getAccountID()));
		return new GenericStatusCode(200);
	}
	
	public List<TransactionModel> getTransactions(String accountID){
		return primaryRepository.getTransactions(accountID);
		
	}
	
	public List<BeneficiaryList> getBeneficiaries(String accountID){
		return primaryRepository.getBeneficiaries(accountID);
	}
}

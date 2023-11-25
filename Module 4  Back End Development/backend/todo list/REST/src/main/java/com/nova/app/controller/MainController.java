package com.nova.app.controller;


import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.nova.app.repository.PrimaryRepository;
import com.nova.app.service.PrimaryService;
import com.nova.app.utility.enums.Payment;
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


@RestController
@CrossOrigin(origins = "*")
@RequestMapping("/v1")
public class MainController {
	
	
	@Autowired
	private PrimaryService primaryService;
	
    @GetMapping("/hello")
    public String sayHello() {
        return "Hello, World!";
    }
    
    @PostMapping("/login")
    public ResponseEntity<LoginResponse> login(@RequestBody AuthenticationModel auth) {    	
        return new ResponseEntity<>(primaryService.verifyUser(auth),HttpStatus.OK);
    }
    
    @PostMapping("/signup")
    public ResponseEntity<SignUpResponse>signUp(@RequestBody SignUpModel signUp){    	
    	return new ResponseEntity<>(primaryService.createUser(signUp),HttpStatus.OK);
    }
    
    @GetMapping("/{accountID}/{pay}/{amount}")
    public ResponseEntity<GenericStatusCode>performTransaction(@PathVariable String accountID,@PathVariable Payment pay, @PathVariable double amount){
    	return new ResponseEntity<>(primaryService.performTransaction(accountID, pay, amount),HttpStatus.OK);
    }
    
    @GetMapping("/balance/{accountID}")
    public ResponseEntity<Balance>viewBalance(@PathVariable String accountID){
        return new ResponseEntity<Balance>(primaryService.viewBalance(accountID),HttpStatus.OK);
    }
    
    @PostMapping("/transfer/{accountID}")
    public ResponseEntity<GenericStatusCode>performTransfer(@PathVariable String accountID,@RequestBody TransferDetails transfer){
    	return new ResponseEntity<>(primaryService.performTransfer(transfer, accountID),HttpStatus.OK);
    }
    
    @GetMapping("/transactions/{accountID}")
    public ResponseEntity<List<TransactionModel>>getTransactions(@PathVariable String accountID){
    	//pr.getTransactions(accountID);
    	return new ResponseEntity<>(primaryService.getTransactions(accountID),HttpStatus.OK);
    }
    
    @GetMapping("/beneficiaries/{accountID}")
    public ResponseEntity<List<BeneficiaryList>> getBeneficiaries(@PathVariable String accountID){
    	return new ResponseEntity<>(primaryService.getBeneficiaries(accountID),HttpStatus.OK);
    }
    
    @PostMapping("/add")
    public ResponseEntity<GenericStatusCode> addBeneficiary(@RequestBody Beneficiary beneficiary){
        return new ResponseEntity<>(primaryService.addBeneficiary(beneficiary),HttpStatus.OK);
    }

}

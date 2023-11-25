package com.nova.app.repository;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.BeanPropertyRowMapper;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Component;

import com.nova.app.utility.enums.Payment;
import com.nova.model.AuthenticationModel;
import com.nova.model.Beneficiary;
import com.nova.model.BeneficiaryList;
import com.nova.model.SignUpModel;
import com.nova.model.TransactionModel;

@Component
public class PrimaryRepository {

	@Autowired
	JdbcTemplate jdbcTemplate;
	
	private final String validateUser = "SELECT COUNT(*) FROM accounts WHERE account_id = ? AND password = ?";
	private final String createUser = "INSERT INTO ACCOUNTS (name,balance,password,phone_number,email) VALUES (?,0.00,?,?,?)";
	private final String accountID = "Select account_ID from accounts where phone_number = ?";
	private final String balance = "Select balance from ACCOUNTS where account_id = ?";
	private final String getBeneficiary = "Select count(account_id) from ACCOUNTS where account_id = ?";
    private final String addBeneficiary = "INSERT INTO BENEFICIARIES(accountID_User, accountID_Beneficiary, Name, IFSC_Code) VALUES (?,?,?,?)";
	private final String countPhoneNumber = "Select count(*) from accounts where phone_number = ?";
	private final String countEmail = "Select count(*) from accounts where email = ?";
	private final String getName = "Select name from accounts where account_id = ?";
	private final String addTransaction = "Insert into transactionhistory (accountID,transactionDate,TransactionType,Amount,CpartyName,CpartyID,Balance) Values(?,CURRENT TIMESTAMP,?,?,?,?,?)";
	private final String getTransactions = "Select accountID,TransactionDate,TransactionType,Amount,CpartyName,CpartyID,Balance from transactionhistory where AccountID = ? order by TransactionDate desc";
	private final String getBeneficiaries = "Select accountID_Beneficiary, Name from Beneficiaries where accountID_User = ?";
	
	public Boolean verifyUser(AuthenticationModel auth) {
	    int count = jdbcTemplate.queryForObject(validateUser, Integer.class, auth.getAccountID(), auth.getPassword());
	    return count>0;
	}
	
	public Boolean createUser(SignUpModel signUp) {
		int count = jdbcTemplate.update(createUser, signUp.getName(), signUp.getPassword(),signUp.getPhoneNumber(),signUp.getEmail());
		return count>0;
	}
	
	public String getAccountID(String phoneNumber) {
		return jdbcTemplate.queryForObject(accountID, String.class, phoneNumber);
	}
	
    public Double getBalance(String accountID) {
        return jdbcTemplate.queryForObject(balance, Double.class, accountID);
    }
    
    public String getName(String accountID) {
    	return jdbcTemplate.queryForObject(getName, String.class, accountID);
    }
	
	public Boolean checkPhoneNumber(String phoneNumber) {
		int count = jdbcTemplate.queryForObject(countPhoneNumber, Integer.class, phoneNumber);
		return count >0;
	}
	
	public Boolean verifyBeneficiary(Beneficiary beneficiary) {
        int count = jdbcTemplate.queryForObject(getBeneficiary, Integer.class, beneficiary.getAccountIDBeneficiary());
        return count>0;
    }
    
    public Boolean createBeneficiary(Beneficiary beneficiary) {
        int count = jdbcTemplate.update(addBeneficiary, beneficiary.getAccountIDUser(), beneficiary.getAccountIDBeneficiary(), beneficiary.getName(), beneficiary.getIfscCode());
        return count>0;
    }  
	
	public Boolean performTransaction(String accountID, Payment pay, double amount) {
		String updateCash = "update accounts set Balance = Balance";
		updateCash += pay.getSign(amount) + " where account_id = ?";
		int count = jdbcTemplate.update(updateCash,accountID);
		return count >0;
	}
	
	public Boolean checkEmail(String email) {
		int count = jdbcTemplate.queryForObject(countEmail, Integer.class, email);
		return count >0;
	}
	
	public Boolean addTransaction(String accountID,String type,double amount, String recipientName,String recipientID, double balance) {
		int count = jdbcTemplate.update(addTransaction,accountID,type,amount,recipientName,recipientID,balance);
		return count>0;
		
	}
	
	public List<TransactionModel> getTransactions(String accountID) {
		return jdbcTemplate.query(getTransactions,new Object[] {accountID},new BeanPropertyRowMapper<>(TransactionModel.class));
		
	}
	
	public List<BeneficiaryList> getBeneficiaries(String accountID){
		return jdbcTemplate.query(getBeneficiaries, new Object[] {accountID}, new BeanPropertyRowMapper<>(BeneficiaryList.class));
	}
}

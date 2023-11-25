package com.nova.model;

import java.sql.Timestamp;

public class TransactionModel {
	private String accountID;
	private Timestamp TransactionDate;
	private String TransactionType;
	private double Amount;
	private String cpartyName;
	private String cpartyID;
	private double balance;
	public String getAccountID() {
		return accountID;
	}
	public void setAccountID(String accountID) {
		this.accountID = accountID;
	}
	public Timestamp getTransactionDate() {
		return TransactionDate;
	}
	public void setTransactionDate(Timestamp transactionDate) {
		TransactionDate = transactionDate;
	}

	public String getTransactionType() {
		return TransactionType;
	}
	public void setTransactionType(String transactionType) {
		TransactionType = transactionType;
	}
	public double getAmount() {
		return Amount;
	}
	public void setAmount(double amount) {
		Amount = amount;
	}
	public String getCpartyName() {
		return cpartyName;
	}
	public void setCpartyName(String cpartyName) {
		this.cpartyName = cpartyName;
	}
	public String getCpartyID() {
		return cpartyID;
	}
	public void setCpartyID(String cpartyID) {
		this.cpartyID = cpartyID;
	}
	public double getBalance() {
		return balance;
	}
	public void setBalance(double balance) {
		this.balance = balance;
	}
	
}

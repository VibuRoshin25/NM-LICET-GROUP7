package com.nova.model;

public class Balance {
    
    private int statusCode;
    private double balance;
    
    public Balance(int statusCode,double balance){
        this.statusCode = statusCode;
        this.balance = balance;
    }
    
    public int getStatusCode() {
        return statusCode;
    }

    public void setStatusCode(int statusCode) {
        this.statusCode = statusCode;
    }
    
    public double getBalance() {
        return balance;
    }

    public void setBalance(double balance) {
        this.balance = balance;
    }
}

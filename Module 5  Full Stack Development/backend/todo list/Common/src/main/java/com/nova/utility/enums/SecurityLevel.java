package com.nova.utility.enums;

public enum SecurityLevel {
	WARN("Warn"),
	ERROR("Erro");
	
	private final String Level;
	
	SecurityLevel(String Level) {
		this.Level = Level;
	}
	
	public String getLevel() {
        return Level;
    }
    

}
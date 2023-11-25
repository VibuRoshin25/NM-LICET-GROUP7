package com.nova.configuration.properties;

import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.context.annotation.Configuration;

@Configuration
@ConfigurationProperties(prefix = "spring.datasource")
public class DBProperties {
	
	private String url;
    private String driverClassName;
    private HikariProperties hikariCP;
    
	public String getUrl() {
		return url;
	}
	public void setUrl(String url) {
		this.url = url;
	}
	public String getDriverClassName() {
		return driverClassName;
	}
	public void setDriverClassName(String driverClassName) {
		this.driverClassName = driverClassName;
	}
	public HikariProperties getHikariCP() {
		return hikariCP;
	}
	public void setHikariCP(HikariProperties hikariCPI) {
		this.hikariCP = hikariCPI;
	}


}

package com.nova.configuration.properties;

import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.context.annotation.Configuration;

@Configuration
@ConfigurationProperties(prefix = "spring.hikari")
public class HikariProperties {
	
	private int maximumPoolSize;
	private int minimumIdle;
	private int idleTimeout;
	private int connectionTimeout;
	
	public int getMaximumPoolSize() {
		return maximumPoolSize;
	}
	public void setMaximumPoolSize(int maximumPoolSize) {
		this.maximumPoolSize = maximumPoolSize;
	}
	public int getMinimumIdle() {
		return minimumIdle;
	}
	public void setMinimumIdle(int minimumIdle) {
		this.minimumIdle = minimumIdle;
	}
	public int getIdleTimeout() {
		return idleTimeout;
	}
	public void setIdleTimeout(int idleTimeout) {
		this.idleTimeout = idleTimeout;
	}
	public int getConnectionTimeout() {
		return connectionTimeout;
	}
	public void setConnectionTimeout(int connectionTimeout) {
		this.connectionTimeout = connectionTimeout;
	}

	

}

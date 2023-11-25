package com.nova.configuration;

import javax.sql.DataSource;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import com.nova.configuration.properties.DBProperties;
import com.zaxxer.hikari.HikariDataSource;

@Configuration
public class DBConfiguration {
	
	@Autowired
	private DBProperties dbProperties;
	
	//private final String userName = System.getProperty("userName");
	//private final String passWord = System.getProperty("passWord");
	

    @Bean
    DataSource datasource() {
		HikariDataSource hdk = new HikariDataSource();
		hdk.setJdbcUrl(dbProperties.getUrl());
		hdk.setUsername(System.getProperty("userName"));
		hdk.setPassword(System.getProperty("passWord"));
		hdk.setDriverClassName(dbProperties.getDriverClassName());
		hdk.setConnectionTimeout(dbProperties.getHikariCP().getConnectionTimeout());
		hdk.setMinimumIdle(dbProperties.getHikariCP().getMinimumIdle());
		hdk.setMaximumPoolSize(dbProperties.getHikariCP().getMaximumPoolSize());
		hdk.setConnectionTimeout(dbProperties.getHikariCP().getConnectionTimeout());
		
		return hdk;
		
		/*
		PoolDataSource pds = PoolDataSourceFactory.getPoolDataSource();
		try {
			pds.setURL(dbProperties.getUrl());
			pds.setUser(dbProperties.getUsername());
			pds.setPassword(dbProperties.getPassword());
	        pds.setInitialPoolSize(dbProperties.getUcp().getInitialPoolSize());
	        pds.setMinPoolSize(dbProperties.getUcp().getMinPoolSize());
	        pds.setMaxPoolSize(dbProperties.getUcp().getMaxPoolSize());
	        pds.setValidateConnectionOnBorrow(dbProperties.getUcp().getValidateConnectionOnBorrow());
	        pds.setConnectionFactoryClassName("oracle.jdbc.pool.OracleDataSource");
		} catch (SQLException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		
		return pds;
		*/
	}
	

}

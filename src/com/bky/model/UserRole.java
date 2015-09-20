package com.bky.model;

import java.math.BigDecimal;

public class UserRole {
	private BigDecimal userSid;
	private BigDecimal roleSid;
	
	public UserRole() {
	}
	public UserRole(BigDecimal userSid, BigDecimal roleSid) {
		this.userSid = userSid;
		this.roleSid = roleSid;
	}
	public BigDecimal getUserSid() {
		return userSid;
	}
	public void setUserSid(BigDecimal userSid) {
		this.userSid = userSid;
	}
	public BigDecimal getRoleSid() {
		return roleSid;
	}
	public void setRoleSid(BigDecimal roleSid) {
		this.roleSid = roleSid;
	}
	
	
	
	
}

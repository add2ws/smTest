package com.bky.model;

import java.math.BigDecimal;

/**
 * Role entity. @author MyEclipse Persistence Tools
 */

public class Role {

	private BigDecimal sid;
	private String roleName;
	private String isvalid;
	private BigDecimal sortId;
	private String orgSid;


	// Constructors

	/** default constructor */
	public Role() {
	}

	/** full constructor */
	public Role(String roleName, String isvalid, BigDecimal sortId,String orgSid) {
		this.roleName = roleName;
		this.isvalid = isvalid;
		this.sortId = sortId;
		this.orgSid = orgSid;

	}

	// Property accessors

	public BigDecimal getSid() {
		return this.sid;
	}

	public void setSid(BigDecimal sid) {
		this.sid = sid;
	}

	public String getRoleName() {
		return this.roleName;
	}

	public void setRoleName(String roleName) {
		this.roleName = roleName;
	}

	public String getIsvalid() {
		return this.isvalid;
	}

	public void setIsvalid(String isvalid) {
		this.isvalid = isvalid;
	}

	public BigDecimal getSortId() {
		return this.sortId;
	}

	public void setSortId(BigDecimal sortId) {
		this.sortId = sortId;
	}

	public String getOrgSid() {
		return orgSid;
	}

	public void setOrgSid(String orgSid) {
		this.orgSid = orgSid;
	}

}
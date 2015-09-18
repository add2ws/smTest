package com.bky.model;


import java.math.BigDecimal;

public class RoleModule   {

	private BigDecimal pid;
	private BigDecimal roleSid;
	private BigDecimal moduleSid;
	private String roleName;
	private Integer right;

	/**
	 * @param pid
	 * @param roleSid
	 * @param moduleSid
	 * @param right
	 */
	public RoleModule(BigDecimal pid, BigDecimal roleSid, BigDecimal moduleSid, Integer right) {
		this.pid = pid;
		this.roleSid = roleSid;
		this.moduleSid = moduleSid;
		this.right = right;
	}
	
	/**
	 * @param roleSid
	 * @param moduleSid
	 * @param right
	 */
	public RoleModule(BigDecimal roleSid, BigDecimal moduleSid, Integer right) {
		this.roleSid = roleSid;
		this.moduleSid = moduleSid;
		this.right = right;
	}
	
	/**
	 * 
	 */
	public RoleModule() {
		// TODO Auto-generated constructor stub
	}
	/**
	 * @return the pid
	 */
	public BigDecimal getPid() {
		return pid;
	}
	/**
	 * @param pid the pid to set
	 */
	public void setPid(BigDecimal pid) {
		this.pid = pid;
	}
	/**
	 * @return the roleSid
	 */
	public BigDecimal getRoleSid() {
		return roleSid;
	}
	/**
	 * @param roleSid the roleSid to set
	 */
	public void setRoleSid(BigDecimal roleSid) {
		this.roleSid = roleSid;
	}
	/**
	 * @return the moduleSid
	 */
	public BigDecimal getModuleSid() {
		return moduleSid;
	}
	/**
	 * @param moduleSid the moduleSid to set
	 */
	public void setModuleSid(BigDecimal moduleSid) {
		this.moduleSid = moduleSid;
	}
	/**
	 * @return the right
	 */
	public Integer getRight() {
		return right;
	}
	/**
	 * @param right the right to set
	 */
	public void setRight(Integer right) {
		this.right = right;
	}
	public String getRoleName() {
		return roleName;
	}
	public void setRoleName(String roleName) {
		this.roleName = roleName;
	}
	
}

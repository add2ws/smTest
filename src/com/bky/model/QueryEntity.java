package com.bky.model;

import java.util.List;

public class QueryEntity {
	private String username;
	private String roleName;
	private String sort;
	private String order;
	private String roleSid;
	private List<?> roleSidList;
	private String moduleSid;
	private List<?> moduleSidList;

	public String getUsername() {
		return username;
	}

	public void setUsername(String username) {
		this.username = username;
	}

	public String getRoleName() {
		return roleName;
	}

	public void setRoleName(String roleName) {
		this.roleName = roleName;
	}

	public String getSort() {
		return sort;
	}

	public void setSort(String sort) {
		this.sort = sort;
	}

	public String getOrder() {
		return order;
	}

	public void setOrder(String order) {
		this.order = order;
	}

	public String getRoleSid() {
		return roleSid;
	}

	public void setRoleSid(String roleSid) {
		this.roleSid = roleSid;
	}

	public String getModuleSid() {
		return moduleSid;
	}

	public void setModuleSid(String moduleSid) {
		this.moduleSid = moduleSid;
	}

	public List<?> getRoleSidList() {
		return roleSidList;
	}

	public void setRoleSidList(List<?> roleSidList) {
		this.roleSidList = roleSidList;
	}

	public List<?> getModuleSidList() {
		return moduleSidList;
	}

	public void setModuleSidList(List<?> moduleSidList) {
		this.moduleSidList = moduleSidList;
	}


	
}

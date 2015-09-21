package com.bky.model;

import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.List;

public class SysMenu {
	
	private BigDecimal sid;
	private String name;
	private String address;
	private BigDecimal pSid;
	private String visible;
	private String isValid;
	private String memo;
	private BigDecimal sortId;
	private String iconClass;
	private String menuType;
	
	private int id;
	private String text;
	private String iconCls;
	private List<SysMenu> children = new ArrayList<SysMenu>();
	private String state;
	
	public void addChildren(SysMenu m) {
		if (children == null) {
			children = new ArrayList<SysMenu>();
		}
		children.add(m);
	}
	
	
	public String getIconCls() {
		return iconCls;
	}


	public void setIconCls(String iconCls) {
		this.iconCls = iconCls;
	}


	public String getMenuType() {
		return menuType;
	}


	public void setMenuType(String menuType) {
		this.menuType = menuType;
	}


	public int getId() {
		return id;
	}
	public void setId(int id) {
		this.id = id;
	}
	public String getText() {
		return text;
	}

	public void setText(String text) {
		this.text = text;
	}

	public BigDecimal getSid() {
		return sid;
	}
	public void setSid(BigDecimal sid) {
		this.sid = sid;
	}
	public String getName() {
		return name;
	}
	public void setName(String name) {
		this.name = name;
	}
	public String getAddress() {
		return address;
	}
	public void setAddress(String address) {
		this.address = address;
	}
	
	public String getState() {
		return state;
	}


	public void setState(String state) {
		this.state = state;
	}


	public String getMemo() {
		return memo;
	}
	public void setMemo(String memo) {
		this.memo = memo;
	}
	public String getIconClass() {
		return iconClass;
	}
	public void setIconClass(String iconClass) {
		this.iconClass = iconClass;
	}
	public List<SysMenu> getChildren() {
		return children;
	}
	public void setChildren(List<SysMenu> children) {
		this.children = children;
	}
	public BigDecimal getpSid() {
		return pSid;
	}
	public void setpSid(BigDecimal pSid) {
		this.pSid = pSid;
	}
	public BigDecimal getSortId() {
		return sortId;
	}
	public void setSortId(BigDecimal sortId) {
		this.sortId = sortId;
	}


	public String getVisible() {
		return visible;
	}


	public void setVisible(String visible) {
		this.visible = visible;
	}


	public String getIsValid() {
		return isValid;
	}


	public void setIsValid(String isValid) {
		this.isValid = isValid;
	}

	
}

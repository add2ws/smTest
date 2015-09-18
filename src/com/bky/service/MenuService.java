package com.bky.service;

import java.util.List;

import com.bky.model.ResponseListEntity;
import com.bky.model.SysMenu;


public interface MenuService {
	
	
	public List<SysMenu> menuList() throws Exception;

	public List<SysMenu> roleMenuTree(String roleSid) throws Exception;

	public void saveOrUpdateMenu(String sid, String name, String address, String visible, String isValid, String pSid, String memo, String sortId, String menuType, String iconClass) throws Exception;

	public ResponseListEntity menuToRoleList(String roleName, String menuSid, int page, int rows) throws Exception;

	public void modifyAuths(String menuSid, String auths) throws Exception;

	public void deleteMenu(String sid) throws Exception;
	
}

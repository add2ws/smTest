package com.bky.service.impl;

import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.List;

import org.springframework.stereotype.Service;

import com.bky.model.QueryEntity;
import com.bky.model.ResponseListEntity;
import com.bky.model.RoleModule;
import com.bky.model.SysMenu;
import com.bky.service.MenuService;
import com.bky.util.EasyuiUtil;
import com.fasterxml.jackson.databind.ObjectMapper;

@Service
public class MenuServiceImpl extends CommonDaoServiceImpl implements MenuService {

	@Override
	public List<SysMenu> menuList() throws Exception {
		List<SysMenu> lst = (List<SysMenu>) this.getCommonDao().searchList("menu.menuList", null);
		
		return EasyuiUtil.buildMenuTree(lst);
	}

	@Override
	public List<SysMenu> roleMenuTree(String roleSid) throws Exception {
		QueryEntity query = new QueryEntity();
		query.setRoleSid(roleSid);
		List<SysMenu> lst = (List<SysMenu>) this.getCommonDao().searchList("menu.roleMenuList", query);
		if (lst == null || lst.size() == 0) return null;
		
		return EasyuiUtil.buildMenuTree(lst);
	}

	@Override
	public void saveOrUpdateMenu(String sid, String name, String address,
			String visible, String isValid, String pSid, String memo,
			String sortId, String menuType, String iconClass) throws Exception {
		
		SysMenu menuData = new SysMenu();
		menuData.setName(name);
		menuData.setAddress(address);
		menuData.setVisible(visible);
		menuData.setIsValid(isValid);
		if (pSid != null && !pSid.trim().equals("")) {
			menuData.setpSid(new BigDecimal(pSid));
		} else {
			menuData.setpSid(null);
		}
		menuData.setMemo(memo);
		if (sortId != null && !sortId.trim().equals("")) {
			menuData.setSortId(new BigDecimal(sortId));
		}
		menuData.setMenuType(menuType);
		menuData.setIconClass(iconClass);
		
		SysMenu obj = (SysMenu) this.getCommonDao().searchObj("menu.getMenu", sid);
		
		if (obj == null) {
			this.getCommonDao().insert("menu.insertMenu", menuData);
			
			//把父菜单更新成菜单组
			SysMenu parentType = new SysMenu();
			parentType.setSid(menuData.getpSid());
			parentType.setMenuType("0");
			this.getCommonDao().update("menu.updateMenu", parentType);
		} else {
			menuData.setSid(obj.getSid());
			this.getCommonDao().update("menu.updateMenu", menuData);
		}
		
	}


	@Override
	public ResponseListEntity menuToRoleList(String roleName, String menuSid, int page, int rows) throws Exception {
		
		QueryEntity query = new QueryEntity();
		query.setModuleSid(menuSid);
		query.setRoleName(roleName);
		return this.getCommonDao().searchPagerAndCount("role.menuToRoleListCount", "role.menuToRoleList", query, page, rows);
	}

	@Override
	public void modifyAuths(String auths) throws Exception {
		

		//删除关系表
		List<List<String>> authArry = new ObjectMapper().readValue(auths, List.class);
		if (authArry == null || authArry.size() == 0) return;
		
		List<RoleModule> rms = new ArrayList<RoleModule>();
		for (List<String> list : authArry) {
			RoleModule rm = new RoleModule(new BigDecimal(list.get(0)), new BigDecimal(list.get(1)), new Integer(list.get(2)));
			rms.add(rm);
		}
		
		this.getCommonDao().deleteBatch("role.deleteRoleModule", rms);
		this.getCommonDao().insertBatch("role.insertRoleModule", rms);
	}

	@Override
	public void deleteMenu(String sid) throws Exception {
		this.getCommonDao().delete("menu.deleteMenuWithChild", sid);
		this.getCommonDao().delete("menu.deleteMenuRole", sid);
	}

	@Override
	public void changeParent(String menuSid, String pSid) throws Exception {
		SysMenu menu = new SysMenu();
		menu.setSid(new BigDecimal(menuSid));
		menu.setpSid(new BigDecimal(pSid));
		this.getCommonDao().update("menu.updateMenu", menu);
	}
	
}

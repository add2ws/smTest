package com.bky.service.impl;

import java.io.IOException;
import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.Iterator;
import java.util.List;
import java.util.Map;

import org.springframework.stereotype.Service;

import com.bky.model.QueryEntity;
import com.bky.model.ResponseListEntity;
import com.bky.model.RoleModule;
import com.bky.model.SysMenu;
import com.bky.service.MenuService;
import com.bky.util.EasyuiUtil;
import com.fasterxml.jackson.core.JsonParseException;
import com.fasterxml.jackson.databind.JsonMappingException;
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
		
		SysMenu m = new SysMenu();
		m.setName(name);
		m.setAddress(address);
		m.setVisible(visible);
		m.setIsValid(isValid);
		if (pSid != null && !pSid.trim().equals("")) {
			m.setpSid(new BigDecimal(pSid));
		}
		m.setMemo(memo);
		if (sortId != null && !sortId.trim().equals("")) {
			m.setSortId(new BigDecimal(sortId));
		}
		m.setMenuType(menuType);
		m.setIconClass(iconClass);
		
		SysMenu obj = (SysMenu) this.getCommonDao().searchObj("menu.getMenu", sid);
		
		if (obj == null) {
			this.getCommonDao().insert("menu.insertMenu", m);
		} else {
			m.setSid(obj.getSid());
			this.getCommonDao().update("menu.updateMenu", m);
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
	public void modifyAuths(String menuSid, String auths) throws Exception {
		QueryEntity query = new QueryEntity();
		query.setModuleSid(menuSid);
		
		//删除关系表里的关系
		Map<String, String> authMap = new ObjectMapper().readValue(auths, Map.class);
		Iterator<String> ml = authMap.keySet().iterator();
		List<String> roles = new ArrayList<String>();
		List<RoleModule> rmList = new ArrayList<RoleModule>();
		while (ml.hasNext()) {
			String key = ml.next();
			roles.add(key);
			RoleModule rm = new RoleModule(new BigDecimal(key), new BigDecimal(menuSid), Integer.valueOf(authMap.get(key)));
			rmList.add(rm);
		}
		
		query.setRoleSidList(roles);
		this.getCommonDao().delete("role.deleteRoleModule", query);

		//添加关系表关系
		for (RoleModule roleModule : rmList) {
			
			this.getCommonDao().insert("role.insertRoleModule", roleModule);
		}
	}
	
}

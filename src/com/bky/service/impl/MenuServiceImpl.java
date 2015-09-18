package com.bky.service.impl;

import java.io.IOException;
import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.Iterator;
import java.util.List;
import java.util.Map;

import org.apache.ibatis.session.SqlSession;
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
		
		if (menuSid == null || menuSid.equals("")) throw new Exception("菜单sid传入为空");

		//删除关系表
		Map<String, String> authMap = new ObjectMapper().readValue(auths, Map.class);
		List<Integer> menuSidList = new ObjectMapper().readValue(menuSid, List.class);
		if (authMap == null) return;
		Iterator<String> ml = authMap.keySet().iterator();
		List<String> roles = new ArrayList<String>();
		List<RoleModule> rmList = new ArrayList<RoleModule>();
		while (ml.hasNext()) {
			String key = ml.next();
			roles.add(key);
			for (Integer mSid : menuSidList) {
				RoleModule rm = new RoleModule(new BigDecimal(key), new BigDecimal(mSid), Integer.valueOf(authMap.get(key)));
				rmList.add(rm);
			}
		}
		
		QueryEntity query = new QueryEntity();
		query.setModuleSidList(menuSidList);
		query.setRoleSidList(roles);
		this.getCommonDao().delete("role.deleteRoleModule", query);

		//插入关系表
		for (RoleModule roleModule : rmList) {
			this.getCommonDao().insert("role.insertRoleModule", roleModule);
		}
	}

	@Override
	public void deleteMenu(String sid) throws Exception {
		this.getCommonDao().delete("menu.deleteMenuWithChild", sid);
		this.getCommonDao().delete("menu.deleteMenuRole", sid);
	}
	
}

package com.bky.service.impl;

import java.io.IOException;
import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.Iterator;
import java.util.List;
import java.util.Map;

import oracle.net.aso.e;

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
	
}

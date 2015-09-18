package com.bky.service.impl;

import org.springframework.stereotype.Service;

import com.bky.model.QueryEntity;
import com.bky.model.ResponseListEntity;
import com.bky.service.SysSettingService;

@Service
public class SysSettingImpl extends CommonDaoServiceImpl implements SysSettingService {

	
	@Override
	public ResponseListEntity userList(String username, int page, int rows, String sort, String order) throws Exception {
		QueryEntity query = new QueryEntity();
		query.setUsername(username);
		query.setSort(sort);
		query.setOrder(order);
		return this.getCommonDao().searchPagerAndCount("sysUserInfo.userListCount", "sysUserInfo.userList", query, page, rows);
	}

	@Override
	public ResponseListEntity roleList(String roleName, int page, int rows) throws Exception {
		QueryEntity query = new QueryEntity();
		query.setRoleName(roleName);
		return this.getCommonDao().searchPagerAndCount("role.roleListCount", "role.roleList", query, page, rows);
	}
	
	
	
}

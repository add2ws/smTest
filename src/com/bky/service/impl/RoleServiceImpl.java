package com.bky.service.impl;

import org.springframework.stereotype.Service;

import com.bky.model.QueryEntity;
import com.bky.model.ResponseListEntity;
import com.bky.service.RoleService;

@Service
public class RoleServiceImpl extends CommonDaoServiceImpl implements RoleService {

	@Override
	public ResponseListEntity roleListByUserSid(String userSid, int page, int rows) throws Exception {
		
		return this.getCommonDao().searchPagerAndCount("role.roleListCountByUserSid", "role.roleListByUserSid", userSid, page, rows);
	}
	
	
	@Override
	public ResponseListEntity roleList(String roleName, int page, int rows) throws Exception {
		QueryEntity query = new QueryEntity();
		query.setRoleName(roleName);
		return this.getCommonDao().searchPagerAndCount("role.roleListCount", "role.roleList", query, page, rows);
	}
}

package com.bky.service.impl;

import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.Map;

import org.springframework.stereotype.Service;

import com.bky.model.QueryEntity;
import com.bky.model.ResponseListEntity;
import com.bky.model.SysUserinfo;
import com.bky.model.UserRole;
import com.bky.service.UserService;
import com.bky.util.MD5;
import com.fasterxml.jackson.databind.ObjectMapper;

@Service
public class UserServiceImpl extends CommonDaoServiceImpl implements UserService {

	
	@Override
	public ResponseListEntity userList(String username, int page, int rows, String sort, String order) throws Exception {
		QueryEntity query = new QueryEntity();
		query.setUsername(username);
		query.setSort(sort);
		query.setOrder(order);
		return this.getCommonDao().searchPagerAndCount("user.userListCount", "user.userList", query, page, rows);
	}

	@Override
	public void addUser(String userid, String password, String roles) throws Exception {
		SysUserinfo user = new SysUserinfo();
		BigDecimal userSid = (BigDecimal) this.getCommonDao().searchObj("user.getNextUserSid", null);
		user.setSid(userSid);
		user.setUserid(userid);
		user.setPasswd(new MD5(password).toString());
		user.setRegTime(new Date());
		this.getCommonDao().insert("user.insertUser", user);
		
		Map<String, List<Object>> changedRoles = null;
		if (roles != null && !roles.equals("")) {
			changedRoles = new ObjectMapper().readValue(roles, Map.class);
			List<UserRole> urs = new ArrayList<UserRole>();
			for (String roleSid : changedRoles.keySet()) {
				List<Object> r = changedRoles.get(roleSid);
				Boolean has = (Boolean) r.get(0);
				if (has) {
					UserRole ur = new UserRole(userSid, new BigDecimal(roleSid));
					urs.add(ur);
				}
			}
			this.getCommonDao().insertBatch("user.insertUserRole", urs);
		}
	}

	@Override
	public void deleteUser(String sid) throws Exception {
		this.getCommonDao().delete("user.deleteUser", sid);
		this.getCommonDao().delete("user.deleteUserRole", sid);
	}

}

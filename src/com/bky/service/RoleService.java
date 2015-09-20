package com.bky.service;

import com.bky.model.ResponseListEntity;

public interface RoleService {
	public ResponseListEntity roleList(String roleName, int page, int rows) throws Exception;
	public ResponseListEntity roleListByUserSid(String userSid, int page, int rows) throws Exception;
}

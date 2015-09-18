package com.bky.service;

import com.bky.model.ResponseListEntity;


public interface SysSettingService {
	
	

	public ResponseListEntity userList(String username, int page, int rows, String sort, String order) throws Exception;

	public ResponseListEntity roleList(String roleName, int page, int rows) throws Exception;

	
}

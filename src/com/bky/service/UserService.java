package com.bky.service;

import com.bky.model.ResponseListEntity;


public interface UserService {
	
	

	public ResponseListEntity userList(String username, int page, int rows, String sort, String order) throws Exception;

	public void addUser(String sid, String userid, String password) throws Exception;

	public void deleteUser(String sid) throws Exception;;

	
}

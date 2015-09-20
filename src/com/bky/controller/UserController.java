package com.bky.controller;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

import com.bky.model.ResponseEntity;
import com.bky.model.ResponseListEntity;
import com.bky.service.UserService;

@Controller
public class UserController {
	protected final Logger log = LoggerFactory.getLogger(getClass());

	@Autowired
	private UserService userService;
	private ResponseEntity responseEntity = new ResponseEntity();
	
	
	@RequestMapping("userList")
	@ResponseBody
	public Object userList(String username, @RequestParam(defaultValue="1") int page, @RequestParam(defaultValue="15") int rows, String sort, String order) {
		ResponseListEntity rel = null;
		try {
			rel = userService.userList(username, page, rows, sort, order);
		} catch (Exception e) {
			e.printStackTrace();
		}
		
		return rel;
	}
	
	@RequestMapping("addUser")
	@ResponseBody
	public Object addUser(@RequestParam(value="userid", defaultValue="") String userid, @RequestParam(value="password", defaultValue="") String password, @RequestParam(value="roles", defaultValue="") String roles) {
		try {
			userService.addUser(userid, password, roles);
			responseEntity.setSuccess(true);
			responseEntity.setMessage("新增账户成功");
		} catch (Exception e) {
			responseEntity.setSuccess(false);
			responseEntity.setMessage(e.getMessage());
			e.printStackTrace();
		}
		
		return responseEntity;
	}
	
	@RequestMapping("deleteUser")
	@ResponseBody
	public Object deleteUser(@RequestParam(value="sid", defaultValue="") String sid) {
		try {
			userService.deleteUser(sid);
			responseEntity.setSuccess(true);
			responseEntity.setMessage("删除成功");
		} catch (Exception e) {
			responseEntity.setSuccess(false);
			responseEntity.setMessage(e.getMessage());
			e.printStackTrace();
		}
		
		return responseEntity;
	}
}

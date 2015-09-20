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
import com.bky.service.RoleService;

@Controller
public class RoleController {
	protected final Logger log = LoggerFactory.getLogger(getClass());

	@Autowired
	private RoleService roleService;
	private ResponseEntity responseEntity = new ResponseEntity();
	private ResponseListEntity responseList = new ResponseListEntity();
	
	@RequestMapping("setRolesList")
	@ResponseBody
	public Object setRolesList(@RequestParam(value="userSid", defaultValue="") String userSid, @RequestParam(value="page", defaultValue="1") int page, @RequestParam(value="rows", defaultValue="10") int rows) {
		try {
			responseList = roleService.roleListByUserSid(userSid, page, rows);
			responseList.setSuccess(true);
		} catch (Exception e) {
			responseList.setSuccess(false);
			responseList.setMessage(e.getMessage());
			e.printStackTrace();
		}
		return responseList;
	}
	
	@RequestMapping("roleList")
	@ResponseBody
	public Object roleList(@RequestParam(defaultValue="1") int page, @RequestParam(defaultValue="10") int rows, String roleName) {
		ResponseListEntity rel = null;
		try {
			rel = roleService.roleList(roleName, page, rows);
		} catch (Exception e) {
			e.printStackTrace();
		}

		return rel;
	}
}

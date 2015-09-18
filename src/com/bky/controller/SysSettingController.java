package com.bky.controller;

import java.io.IOException;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

import com.bky.model.ResponseListEntity;
import com.bky.service.SysSettingService;

@Controller
public class SysSettingController {
	protected final Logger log = LoggerFactory.getLogger(getClass());

	@Autowired
	private SysSettingService sysSettingService;
	
	
	@RequestMapping("userList")
	@ResponseBody
	public Object userList(String username, @RequestParam(defaultValue="1") int page, @RequestParam(defaultValue="15") int rows, String sort, String order) {
		ResponseListEntity rel = null;
		try {
			rel = sysSettingService.userList(username, page, rows, sort, order);
		} catch (Exception e) {
			e.printStackTrace();
		}
		
		return rel;
	}
	
	@RequestMapping("roleList")
	@ResponseBody
	public Object roleList(@RequestParam(defaultValue="1") int page, @RequestParam(defaultValue="15") int rows, String roleName) {
		ResponseListEntity rel = null;
		try {
			rel = sysSettingService.roleList(roleName, page, rows);
		} catch (Exception e) {
			e.printStackTrace();
		}

		return rel;
	}
	
	@RequestMapping("forwardPage")
	public void forwardPage(HttpServletRequest req, HttpServletResponse res, String address) {
		
		try {
			req.getRequestDispatcher(address).forward(req, res);
		} catch (ServletException e) {
			e.printStackTrace();
		} catch (IOException e) {
			e.printStackTrace();
		}
	}
}

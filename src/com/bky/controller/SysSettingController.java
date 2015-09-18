package com.bky.controller;

import java.io.IOException;
import java.util.List;

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

import com.bky.model.ResponseEntity;
import com.bky.model.ResponseListEntity;
import com.bky.model.SysMenu;
import com.bky.service.MenuService;
import com.bky.service.SysSettingService;

@Controller
public class SysSettingController {
	protected final Logger log = LoggerFactory.getLogger(getClass());

	@Autowired
	private SysSettingService sysSettingService;
	@Autowired
	private MenuService menuService;
	private ResponseEntity responseEntity = new ResponseEntity();
	private ResponseListEntity responseListEntity = new ResponseListEntity();
	
	@RequestMapping("menuTree")
	@ResponseBody
	public Object menuTree() {
		List<SysMenu> a = null;
		try {
			a = menuService.menuList();
		} catch (Exception e) {
			e.printStackTrace();
		}
		return a;
	}
	
	@RequestMapping("loginMenuTree")
	@ResponseBody
	public Object loginMenuTree(HttpServletRequest req, String rid) {
		List<SysMenu> a = null;
		try {
			a = menuService.roleMenuTree(rid);
		} catch (Exception e) {
			e.printStackTrace();
		}
		
		return a;
	}
	
	@RequestMapping("saveMenu")
	@ResponseBody
	public Object saveMenu(String sid, String name, String address, String visible, String isValid, String pSid, String memo, String sortId, String menuType, String iconClass) {
		try {
			menuService.saveOrUpdateMenu(sid, name, address, visible, isValid, pSid, memo, sortId, menuType, iconClass);
			responseEntity.setSuccess(true);
			responseEntity.setMessage("成功");
		} catch (Exception e) {
			responseEntity.setSuccess(false);
			responseEntity.setMessage(e.getMessage());
			e.printStackTrace();
		}
		return responseEntity;
	}
	
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
	
	@RequestMapping("menu2RoleList")
	@ResponseBody
	public Object menu2RoleList(@RequestParam(defaultValue="1") int page, @RequestParam(defaultValue="15") int rows, String roleName, String menuSid) {
		try {
			responseListEntity = menuService.menuToRoleList(roleName, menuSid, page, rows);
			responseListEntity.setSuccess(true);
			
		} catch (Exception e) {
			responseListEntity.setSuccess(false);
			e.printStackTrace();
		}
		
		return responseListEntity;
	}
	
	@RequestMapping("modifyAuths")
	@ResponseBody
	public Object modifyAuths(String menuSid, String auths) {
		
		try {
			
			menuService.modifyAuths(menuSid, auths);
			responseListEntity.setSuccess(true);
			responseListEntity.setMessage("成功");
		} catch (Exception e) {
			responseListEntity.setSuccess(false);
			responseListEntity.setMessage(e.getMessage());
			e.printStackTrace();
		}
		
		return responseListEntity;
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

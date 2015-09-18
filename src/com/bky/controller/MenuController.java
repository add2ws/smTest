package com.bky.controller;

import java.util.List;

import javax.servlet.http.HttpServletRequest;

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

@Controller
public class MenuController {
	protected final Logger log = LoggerFactory.getLogger(getClass());

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
	
	@RequestMapping("deleteMenu")
	@ResponseBody
	public Object deleteMenu(@RequestParam(defaultValue="") String sid) {
		try {
			menuService.deleteMenu(sid);
			responseEntity.setSuccess(true);
			responseEntity.setMessage("成功");
		} catch (Exception e) {
			responseEntity.setSuccess(false);
			responseEntity.setMessage(e.getMessage());
			e.printStackTrace();
		}
		return responseEntity;
	}
	
	
	@RequestMapping("menu2RoleList")
	@ResponseBody
	public Object menu2RoleList(@RequestParam(defaultValue="1") int page, @RequestParam(defaultValue="15") int rows, String roleName, String menuSid) {
		try {
			responseListEntity = menuService.menuToRoleList(roleName, menuSid, page, rows);
			responseListEntity.setSuccess(true);
			
		} catch (Exception e) {
			responseListEntity.setSuccess(false);
			responseListEntity.setMessage(e.getMessage());
			e.printStackTrace();
		}
		
		return responseListEntity;
	}
	
	@RequestMapping("modifyAuths")
	@ResponseBody
	public Object modifyAuths(String menuSid, String auths) {
		
		try {
			
			menuService.modifyAuths(menuSid, auths);
			responseEntity.setSuccess(true);
			responseEntity.setMessage("成功");
		} catch (Exception e) {
			responseEntity.setSuccess(false);
			responseEntity.setMessage(e.getMessage());
			e.printStackTrace();
		}
		
		return responseEntity;
	}
	
}

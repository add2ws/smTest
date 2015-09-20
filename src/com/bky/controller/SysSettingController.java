package com.bky.controller;

import java.io.IOException;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
public class SysSettingController {
	protected final Logger log = LoggerFactory.getLogger(getClass());

	
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

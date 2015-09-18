package com.bky.util;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.web.servlet.HandlerInterceptor;
import org.springframework.web.servlet.ModelAndView;


public class UserAuthorityInterceptor implements HandlerInterceptor {
	private final Logger log = LoggerFactory.getLogger(getClass());

	@Override
	public void afterCompletion(HttpServletRequest req, HttpServletResponse res, Object obj, Exception e) throws Exception {
	}

	/**
	 * Controller执行结束jsp渲染之前执行
	 */
	@Override
	public void postHandle(HttpServletRequest req, HttpServletResponse res, Object obj, ModelAndView mv) throws Exception {
		
	}
	
	/**
	 * Controller调用之前执行
	 */
	@Override
	public boolean preHandle(HttpServletRequest req, HttpServletResponse res, Object obj) throws Exception {
		log.info(req.getRequestURI().toString());
		String sessionUid = (String) req.getSession().getAttribute(Const.LOGIN_UID_SESSION_KEY);
		if (sessionUid == null) {
			log.info("登陆session过期");
			return false;
		}
		String uid = req.getParameter("uid");
		if (uid == null || uid.equals("")) {
			log.info("没有传uid");
			return false;
		}

		if (sessionUid.equals(uid)) {
			log.info("uid验证成功");
			return true;
		}
		
		return false;
	}

}

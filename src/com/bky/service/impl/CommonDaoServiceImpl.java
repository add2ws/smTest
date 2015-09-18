package com.bky.service.impl;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.bky.dao.CommonDao;


@Service
public abstract class CommonDaoServiceImpl {
	protected final Logger log = LoggerFactory.getLogger(getClass());

	@Autowired
	private CommonDao commonDao;
	
	protected CommonDao getCommonDao() {
		return commonDao;
	}
	
}

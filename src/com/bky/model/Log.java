package com.bky.model;

import java.math.BigDecimal;
import java.util.Date;

/**
 * Log entity. @author MyEclipse Persistence Tools
 */

public class Log  {

	// Fields

	public static final int USERLOGIN = 1;
	public static final int OPERATION = 2;
	public static final int ERROR = 3;
	public static final int Higher = 5;
	public static final int High = 4;
	public static final int Middle = 3;
	public static final int Low = 2;
	public static final int Lower = 1;
	private BigDecimal sid;
	private int logLevel;
	private int eventType;
	private String content;
	private Date logDate;
	private String logUserid;
	private String userIp;

	// Constructors

	/** default constructor */
	public Log() {
	}

	// Property accessors

	public BigDecimal getSid() {
		return this.sid;
	}

	public String getLogDateStr() {
		return logDate.toString();
	}

	public void setSid(BigDecimal sid) {
		this.sid = sid;
	}

	public String getContent() {
		return this.content;
	}

	public void setContent(String content) {
		this.content = content;
	}

	public Date getLogDate() {
		return this.logDate;
	}

	public void setLogDate(Date logDate) {
		this.logDate = logDate;
	}

	public String getLogUserid() {
		return this.logUserid;
	}

	public void setLogUserid(String logUserid) {
		this.logUserid = logUserid;
	}

	public String getUserIp() {
		return this.userIp;
	}

	public void setUserIp(String userIp) {
		this.userIp = userIp;
	}

	public int getLogLevel() {
		return logLevel;
	}

	public void setLogLevel(int logLevel) {
		this.logLevel = logLevel;
	}

	public int getEventType() {
		return eventType;
	}

	public void setEventType(int eventType) {
		this.eventType = eventType;
	}

}
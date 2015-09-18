package com.bky.util;


/**
 * 分页处理用MYSQL解释器
 * 
 * @author songchao
 * @version 1.0
 * @since 2015-5-30
 */

public class MysqlDialect implements Dialect {
	// SQL结束符
	protected static final String SQL_END_DELIMITER = ";";
	/*
	 * @see
	 * org.mybatis.extend.interceptor.IDialect#getLimitString(java.lang.String,
	 * int, int)
	 */
	@Override
	public String getLimitString(String sql, int offset, int limit) {
		sql = trim(sql);
		StringBuffer sb = new StringBuffer(sql.length() + 10);
		if (offset == 1) {
			offset = 0;
		}
		
		sb.append(this.trim(sql));
		sb.append(" limit ");
		sb.append(offset);
		sb.append(",");
		sb.append(offset + limit);
		return sb.toString();
	}

	/**
	 * 是否支持Limit处理
	 * 
	 * @return
	 */
	public boolean supportsLimit() {
		return true;
	}
	/**
	 * SQL Trim
	 * @param sql
	 * @return Trim后的SQL
	 */
	private String trim(String sql) {
		sql = sql.replaceAll("\r\n", " ");
		sql = sql.replaceAll("\n", " ");
		sql = sql.trim();
		if (sql.endsWith(SQL_END_DELIMITER)) {
			sql = sql.substring(0,sql.length() - 1 - SQL_END_DELIMITER.length());
		}
		return sql;
	}
}

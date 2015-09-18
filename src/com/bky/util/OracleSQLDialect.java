package com.bky.util;

/**
 * 分页处理用OracleSQL解释器
 * 
 * @author zhouhao
 * @version 1.0
 * @since 2010-9-6
 */

public class OracleSQLDialect implements Dialect {

	// SQL结束符
	protected static final String SQL_END_DELIMITER = ";";

	public String getLimitString(String sql, int offset, int limit) {
		sql = trim(sql);
		StringBuffer sb = new StringBuffer(sql.length() + 20);
		if (offset == 1) {
			offset = 0;
		}
		sb.append("select * from ( select row_limit.*, rownum rownum_ from (");
		sb.append(this.trim(sql));
		sb.append(" ) row_limit where rownum <= ");
		sb.append(limit + offset);
		sb.append(" ) where rownum_ >");
		sb.append(offset);
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
	 * 
	 * @param sql
	 *            SQL
	 * @return Trim后的SQL
	 */
	private String trim(String sql) {
		sql = sql.trim();
		if (sql.endsWith(SQL_END_DELIMITER)) {
			sql = sql.substring(0, sql.length() - 1 - SQL_END_DELIMITER.length());
		}
		return sql;
	}

}

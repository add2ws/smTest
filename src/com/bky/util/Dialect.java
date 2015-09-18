package com.bky.util;

public interface Dialect
{
	
	public static enum Type{   
	       MYSQL,   
	       ORACLE
	}   
	/**
	 * 是否支持Limit处理
	 * @return 
	 */
	public boolean supportsLimit();

	/**
	 * 
	 * 取得分页处理的SQL
	 * @param sql SQL
	 * @param offset 开始行数
	 * @param limit 每页行数
	 * @return SQL
	 */
	public String getLimitString(String sql, int offset, int limit);
}

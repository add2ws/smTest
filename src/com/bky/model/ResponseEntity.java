
package com.bky.model;



/**
 * 插入/删除 操作 返回实体
 *
 * @author zhouhonghua
 * @version v1.0
 * @since 2013-4-1
 */
public class ResponseEntity {
	
	private boolean success;
	
	private String message;
	
		private String code;
	
	
	

	/**
	 * @return the code
	 */
	public String getCode() {
		return code;
	}

	/**
	 * @param code the code to set
	 */
	public void setCode(String code) {
		this.code = code;
	}


	public boolean isSuccess() {
		return success;
	}

	public void setSuccess(boolean success) {
		this.success = success;
	}

	/**
	 * @return the message
	 */
	public String getMessage() {
		return message;
	}

	/**
	 * @param message the message to set
	 */
	public void setMessage(String message) {
		this.message = message;
	}
	
	
	
		

}

package com.bky.model;



import java.math.BigDecimal;
import java.sql.Clob;
import java.util.Date;


import com.fasterxml.jackson.annotation.JsonFormat;

public class SysUserinfo {
	
	/*****用户类型，0:内部真实用户；1：虚拟用户；2：外部用户;3：个人用户;4: 企业用户；5：事业单位用户****/
	private BigDecimal userType;
	/*****所属部门编号****/
	private String deptSid;
	/*****身体状况****/
	private String stzk;
	/*****出生地****/
	private String csd;
	/*****参加工作时间****/
	private Date cjgzsj;
	/*****用户编号****/
	private BigDecimal sid;
	/*****用户登录ID****/
	private String userid;
	/*****用户口令****/
	private String passwd;
	/*****用户名****/
	private String username;
	/*****最后登录时间****/
	private Date lastLoginTime;
	/*****最后登录IP****/
	private String lastIp;
	/*****登录次数****/
	private BigDecimal loginTimes;
	/*****主题皮肤****/
	private String theme;
	/*****注册时间****/
	private Date regTime;
	/*****所属单位编号****/
	private String orgSid;
	
	/*****所属单位名称****/
	private String orgName;
	
	/*****所属角色名称****/
	private String roles;
	
	
	/*****性别****/
	private String sex;
	/*****出生日期****/
	private Date birthday;
	/*****籍贯****/
	private String nativeplace;
	/*****民族****/
	private String nation;
	/*****政治面貌****/
	private String zjmm;
	/*****职务****/
	private String headship;
	/*****职称****/
	private String distinction;
	/*****电话****/
	private String telephone;
	/*****移动电话****/
	private String mobile;
	/*****传真****/
	private String fax;
	/*****EMAIL****/
	private String email;
	/*****照片****/
	private String photo;
	/*****工作职责****/
	private String dutyFlag;
	/*****证件类型****/
	private String certificateType;
	/*****证件号码****/
	private String certificateNo;
	/*****学历****/
	private String grade;
	/*****专业****/
	private String speciality;
	/*****录入日期****/
	private Date recordDate;
	/*****用户状态，0：禁用，1：启用****/
	private String state;
	/*****注册方式****/
	private String registerType;
	/*****审批意见****/
	private String auditOpinion;
	/*****审批结果****/
	private String auditRes;
	/*****审批人****/
	private BigDecimal auditUserid;
	/*****审批日期****/
	private Date auditDate;
	
	private String strBirthday;
	
	private String strCjgzsj;
	
	
	private Clob clobPhoto;

	
	
	public BigDecimal getUserType() {
		return userType;
	}

	public void setUserType(BigDecimal usertype) {
		this.userType = usertype;
	}
	
	public String getDeptSid() {
		return deptSid;
	}

	public void setDeptSid(String deptsid) {
		this.deptSid = deptsid;
	}
	
	public String getStzk() {
		return stzk;
	}

	public void setStzk(String stzk) {
		this.stzk = stzk;
	}
	
	public String getCsd() {
		return csd;
	}

	public void setCsd(String csd) {
		this.csd = csd;
	}
	
	public Date getCjgzsj() {
		return cjgzsj;
	}

	public void setCjgzsj(Date cjgzsj) {
		this.cjgzsj = cjgzsj;
	}
	
	public BigDecimal getSid() {
		return sid;
	}

	public void setSid(BigDecimal sid) {
		this.sid = sid;
	}
	
	public String getUserid() {
		return userid;
	}

	public void setUserid(String userid) {
		this.userid = userid;
	}
	
	public String getPasswd() {
		return passwd;
	}

	public void setPasswd(String passwd) {
		this.passwd = passwd;
	}
	
	public String getUsername() {
		return username;
	}

	public void setUsername(String username) {
		this.username = username;
	}
	@JsonFormat(pattern="yyyy-MM-dd HH:mm:ss")  
	public Date getLastLoginTime() {
		return lastLoginTime;
	}

	public void setLastLoginTime(Date lastlogintime) {
		this.lastLoginTime = lastlogintime;
	}
	
	public String getLastIp() {
		return lastIp;
	}

	public void setLastIp(String lastip) {
		this.lastIp = lastip;
	}
	
	public BigDecimal getLoginTimes() {
		return loginTimes;
	}

	public void setLoginTimes(BigDecimal logintimes) {
		this.loginTimes = logintimes;
	}
	
	public String getTheme() {
		return theme;
	}

	public void setTheme(String theme) {
		this.theme = theme;
	}
	@JsonFormat(pattern="yyyy-MM-dd HH:mm:ss")  
	public Date getRegTime() {
		return regTime;
	}

	public void setRegTime(Date regtime) {
		this.regTime = regtime;
	}
	
	public String getOrgSid() {
		return orgSid;
	}

	public void setOrgSid(String orgsid) {
		this.orgSid = orgsid;
	}
	
	public String getSex() {
		return sex;
	}

	public void setSex(String sex) {
		this.sex = sex;
	}
	
	@JsonFormat(pattern="yyyy-MM-dd")  
	public Date getBirthday() {
		return birthday;
	}

	public void setBirthday(Date birthday) {
		this.birthday = birthday;
	}
	
	public String getNativeplace() {
		return nativeplace;
	}

	public void setNativeplace(String nativeplace) {
		this.nativeplace = nativeplace;
	}
	
	public String getNation() {
		return nation;
	}

	public void setNation(String nation) {
		this.nation = nation;
	}
	
	public String getZjmm() {
		return zjmm;
	}

	public void setZjmm(String zjmm) {
		this.zjmm = zjmm;
	}
	
	public String getHeadship() {
		return headship;
	}

	public void setHeadship(String headship) {
		this.headship = headship;
	}
	
	public String getDistinction() {
		return distinction;
	}

	public void setDistinction(String distinction) {
		this.distinction = distinction;
	}
	
	public String getTelephone() {
		return telephone;
	}

	public void setTelephone(String telephone) {
		this.telephone = telephone;
	}
	
	public String getMobile() {
		return mobile;
	}

	public void setMobile(String mobile) {
		this.mobile = mobile;
	}
	
	public String getFax() {
		return fax;
	}

	public void setFax(String fax) {
		this.fax = fax;
	}
	
	public String getEmail() {
		return email;
	}

	public void setEmail(String email) {
		this.email = email;
	}
	
	public String getPhoto() {
		return photo;
	}

	public void setPhoto(String photo) {
		this.photo = photo;
	}
	
	public String getDutyFlag() {
		return dutyFlag;
	}

	public void setDutyFlag(String dutyflag) {
		this.dutyFlag = dutyflag;
	}
	
	public String getCertificateType() {
		return certificateType;
	}

	public void setCertificateType(String certificatetype) {
		this.certificateType = certificatetype;
	}
	
	public String getCertificateNo() {
		return certificateNo;
	}

	public void setCertificateNo(String certificateno) {
		this.certificateNo = certificateno;
	}
	
	public String getGrade() {
		return grade;
	}

	public void setGrade(String grade) {
		this.grade = grade;
	}
	
	public String getSpeciality() {
		return speciality;
	}

	public void setSpeciality(String speciality) {
		this.speciality = speciality;
	}
	
	public Date getRecordDate() {
		return recordDate;
	}

	public void setRecordDate(Date recorddate) {
		this.recordDate = recorddate;
	}
	
	public String getState() {
		return state;
	}

	public void setState(String state) {
		this.state = state;
	}
	
	public String getRegisterType() {
		return registerType;
	}

	public void setRegisterType(String registertype) {
		this.registerType = registertype;
	}
	
	public String getAuditOpinion() {
		return auditOpinion;
	}

	public void setAuditOpinion(String auditopinion) {
		this.auditOpinion = auditopinion;
	}
	
	public String getAuditRes() {
		return auditRes;
	}

	public void setAuditRes(String auditres) {
		this.auditRes = auditres;
	}
	
	public BigDecimal getAuditUserid() {
		return auditUserid;
	}

	public void setAuditUserid(BigDecimal audituserid) {
		this.auditUserid = audituserid;
	}
	
	public Date getAuditDate() {
		return auditDate;
	}

	public void setAuditDate(Date auditdate) {
		this.auditDate = auditdate;
	}

	public String getOrgName() {
		return orgName;
	}

	public void setOrgName(String orgName) {
		this.orgName = orgName;
	}

	public String getStrBirthday() {
		return strBirthday;
	}

	public void setStrBirthday(String strBirthday) {
		this.strBirthday = strBirthday;
	}

	public String getStrCjgzsj() {
		return strCjgzsj;
	}

	public void setStrCjgzsj(String strCjgzsj) {
		this.strCjgzsj = strCjgzsj;
	}

	public Clob getClobPhoto() {
		return clobPhoto;
	}

	public void setClobPhoto(Clob clobPhoto) {
		this.clobPhoto = clobPhoto;
	}

	public String getRoles() {
		return roles;
	}

	public void setRoles(String roles) {
		this.roles = roles;
	}
	
}
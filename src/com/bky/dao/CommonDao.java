
package com.bky.dao;

import java.math.BigDecimal;
import java.util.List;

import org.apache.ibatis.session.RowBounds;
import org.mybatis.spring.SqlSessionTemplate;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import com.bky.model.ResponseListEntity;
import com.bky.util.SqlBatchUtil;



/**
 * 共通Dao
 * 
 * @author zhouhonghua
 * @version 1.0
 * @since 2012-8-26
 */
@Repository
public class CommonDao
{

	@Autowired
	private SqlSessionTemplate sqlSessionTemplate;
	
	public SqlSessionTemplate getSqlSessionTemplate() {
		return sqlSessionTemplate;
	}
	
	
	/**
	 * 检索List
	 * 
	 * @param searchMethod
	 * @param obj
	 * @return
	 * @throws Exception
	 */
	public List<?> searchList(String searchMethod, Object obj) throws Exception
	{
		
		return this.getSqlSessionTemplate().selectList(searchMethod, obj);
		//return this.getSqlMapClientTemplate().queryForList(searchMethod, obj);
	}

	/**
	 * 检索对象
	 * 
	 * @param searchMethod
	 * @param obj
	 * @return
	 * @throws Exception
	 */
	public Object searchObj(String searchMethod, Object obj) throws Exception
	{
		
		return this.getSqlSessionTemplate().selectOne(searchMethod, obj);
		//return this.getSqlMapClientTemplate().queryForObject(searchMethod, obj);
	}

	/**
	 * 检索件数
	 * 
	 * @param searchMethod
	 * @param obj
	 * @return
	 * @throws Exception
	 */
	public int searchCount(String searchMethod, Object obj) throws Exception
	{
	
		
		return ((BigDecimal)this.getSqlSessionTemplate().selectOne(searchMethod, obj))
				.intValue();
		
	//	return this.getSqlSession().selectList(searchMethod, obj).size();
	//	return ((BigDecimal)this.getSqlMapClientTemplate().queryForObject(searchMethod, obj))
	//			.intValue();
	}

	/**
	 * 更新
	 * 
	 * @param searchMethod
	 * @param obj
	 * @return
	 * @throws Exception
	 */
	public int update(String searchMethod, Object obj) throws Exception
	{
		return this.getSqlSessionTemplate().update(searchMethod, obj);
		//return this.getSqlMapClientTemplate().update(searchMethod, obj);
	}

	/**
	 * 批量更新
	 * 
	 * @param searchMethod
	 * @param obj
	 * @return
	 * @throws Exception
	 */
	public int updateBatch(String searchMethod, List<?> obj) throws Exception
	{
	
		 SqlBatchUtil.batchUpdate(this.getSqlSessionTemplate().getSqlSessionFactory(), searchMethod, obj);
			return 0;
	}

	/**
	 * 删除
	 * 
	 * @param searchMethod
	 * @param obj
	 * @return
	 * @throws Exception
	 */
	public int delete(String searchMethod, Object obj) throws Exception
	{
		return this.getSqlSessionTemplate().delete(searchMethod, obj);
		//return this.getSqlMapClientTemplate().delete(searchMethod, obj);
	}

	/**
	 * 批量删除
	 * 
	 * @param deleteMethod
	 * @param obj
	 * @return
	 * @throws Exception
	 */
	public int deleteBatch(String deleteMethod, List<?> obj) throws Exception
	{
		SqlBatchUtil.batchDelete(this.getSqlSessionTemplate().getSqlSessionFactory(), deleteMethod, obj);
		return 0;
	}

	/**
	 * 插入
	 * 
	 * @param searchMethod
	 * @param obj
	 * @throws Exception
	 */
	public void insert(String searchMethod, Object obj) throws Exception
	{
		this.getSqlSessionTemplate().insert(searchMethod, obj);
	}

	/**
	 * 批量插入
	 * 
	 * @param searchMethod
	 * @param obj
	 * @throws Exception
	 */
	public void insertBatch(String searchMethod, List<?> obj) throws Exception
	{
		
		SqlBatchUtil.batchInsert(this.getSqlSessionTemplate().getSqlSessionFactory(), searchMethod, obj);
	}

	/**
	 * 分页检索
	 * 
	 * @param searchMethod 检索SQL
	 * @param obj 检索条件
	 * @param page 当前页码
	 * @param pageRows 每页行数
	 * @return PagerEntity
	 * @throws Exception SQLError
	 */
	public ResponseListEntity searchPager(String searchMethod, Object obj, int page, int pageRows)
			throws Exception
	{
		List<?> all = searchList(searchMethod, obj);
		int count = 0;
		if (all != null)
		{
			count = all.size();
		}
		
		int startRow=this.getCurrentStartRow(page, pageRows);
		 RowBounds rb = new RowBounds(startRow,pageRows);
		
		List<?> pagelist = this.getSqlSessionTemplate().selectList(searchMethod, obj, rb);
		
	//	List<?> pagelist = this.getSqlMapClientTemplate().queryForList(searchMethod, obj, startRow,
	//			pageRows);
		ResponseListEntity ret = new ResponseListEntity(pagelist, count);
		return ret;
	}
	/**
	 * 分页检索
	 * 
	 * @param searchMethod 检索SQL
	 * @param obj 检索条件
	 * @param page 当前页码
	 * @param pageRows 每页行数
	 * @param totalCnt 前回检索的件数 没有是为0
	 * @return PagerEntity
	 * @throws Exception SQLError
	 */
	public ResponseListEntity searchPagerAndCount(String countsearchMethod,String searchMethod, Object obj, int page, int pageRows, int totalCnt) throws Exception
	{
		int count = totalCnt;
		if (totalCnt == 0)
		{
			count = searchCount(countsearchMethod, obj);
		}
		
		int startRow=this.getCurrentStartRow(page, pageRows);
		 RowBounds rb = new RowBounds(startRow,pageRows);
			
			List<?> pagelist = this.getSqlSessionTemplate().selectList(searchMethod, obj, rb);
	//	List<?> pagelist = this.getSqlMapClientTemplate().queryForList(searchMethod, obj, startRow,
	//			pageRows);
		ResponseListEntity ret = new ResponseListEntity(pagelist, count);
		return ret;
	}
	
	/**
	 * 分页检索
	 * 
	 * @param searchMethod 检索SQL
	 * @param obj 检索条件
	 * @param page 当前页码
	 * @param pageRows 每页行数
	 * @return PagerEntity
	 * @throws Exception SQLError
	 */
	public ResponseListEntity searchPagerAndCount(String countsearchMethod,String searchMethod, Object obj, int page, int pageRows) throws Exception
	{
		int count = searchCount(countsearchMethod, obj);
		
		int startRow=this.getCurrentStartRow(page, pageRows);

		RowBounds rb = new RowBounds(startRow,pageRows);
			
		List<?> pagelist = this.getSqlSessionTemplate().selectList(searchMethod, obj, rb);
		
		//List<?> pagelist = this.getSqlMapClientTemplate().queryForList(searchMethod, obj, startRow,
		//		pageRows);
		ResponseListEntity ret = new ResponseListEntity(pagelist, count);
		return ret;
	}
	
	/**
	 * @param page  当前页数
	 * @param pageRows  每页的行数
	 * @return
	 */
	public int getCurrentStartRow(int page,int pageRows)
	{
		int pageInt = page;
		int pageRowsInt = pageRows;
		int currentStartRow = 0;
		if (pageInt != 0)
		{
			currentStartRow = (pageRowsInt * (pageInt - 1));
		}
		return currentStartRow;
	}

}

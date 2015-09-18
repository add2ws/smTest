package com.bky.util;

import java.util.List;

import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;
import org.apache.ibatis.session.ExecutorType;
import org.apache.ibatis.session.SqlSession;
import org.apache.ibatis.session.SqlSessionFactory;

/**
 * 批量执行SQL
 * 
 * @author zhouhonghua
 * @version 1.0
 * @since 2012/07/21
 */
public class SqlBatchUtil {

	// 日志
	private static final Log logger = LogFactory.getLog(SqlBatchUtil.class);

	/**
	 * 批量更新
	 * 
	 * @param dao
	 * @param sqlId
	 * @param paramList
	 */
	public static void batchUpdate(SqlSessionFactory sqlSessionFactory, final String sqlId, final List<?> paramList) {

		if (paramList != null) {

			SqlSession sqlSession = sqlSessionFactory.openSession(
					ExecutorType.SIMPLE, false);
			try {

				for (int i = 0; i < paramList.size(); i++) {
					sqlSession.update(sqlId, paramList.get(i));

					if (i % 1000 == 0 || i == paramList.size() - 1) {
						// 手动每1000个一提交，提交后无法回滚
						sqlSession.commit();
						sqlSession.clearCache();
					}

				}

			} catch (Exception e) {

				sqlSession.rollback();
				logger.error("error", e);

			} finally {

				sqlSession.close();

			}

		}

	}

	/**
	 * 批量插入
	 * 
	 * @param dao
	 * @param sqlId
	 * @param paramList
	 */
	public static void batchInsert(SqlSessionFactory sqlSessionFactory, final String sqlId, final List<?> paramList) {
		if (paramList != null) {
			SqlSession sqlSession = sqlSessionFactory.openSession(
					ExecutorType.SIMPLE, false);
			try {

				for (int i = 0; i < paramList.size(); i++) {
					sqlSession.insert(sqlId, paramList.get(i));
					// 2500条提交一次
					/*
					 * if(i%2==0){ sqlSession.commit(); sqlSession.clearCache();
					 * }
					 */

					if (i % 1000 == 0 || i == paramList.size() - 1) {
						// 手动每1000个一提交，提交后无法回滚
						sqlSession.commit();
						sqlSession.clearCache();
					}

				}

			} catch (Exception e) {
				sqlSession.rollback();

				logger.error("error", e);
			} finally {
				sqlSession.close();
			}

		}

	}

	/**
	 * 批量删除
	 * 
	 * @param dao
	 * @param sqlId
	 * @param paramList
	 */
	public static void batchDelete(SqlSessionFactory sqlSessionFactory, final String sqlId, final List<?> paramList) {

		if (paramList != null) {

			SqlSession sqlSession = sqlSessionFactory.openSession(
					ExecutorType.SIMPLE, false);
			try {

				for (int i = 0; i < paramList.size(); i++) {
					sqlSession.delete(sqlId, paramList.get(i));

					if (i % 1000 == 0 || i == paramList.size() - 1) {
						// 手动每1000个一提交，提交后无法回滚
						sqlSession.commit();
						sqlSession.clearCache();
					}

				}

			} catch (Exception e) {

				sqlSession.rollback();
				logger.error("error", e);

			} finally {

				sqlSession.close();

			}

		}
	}

}

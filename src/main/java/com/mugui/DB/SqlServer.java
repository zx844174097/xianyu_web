package com.mugui.DB;

public class SqlServer {
	public SqlServer(){
		this("config.str");
	}
	public SqlServer(String configUrl){
		read=new FileRead();
		read.configUrl=configUrl;
	}
	public SqlServer(FileRead fileRead){
		read=fileRead;
	}
	private FileRead read=null;
	public TableMode select(String con) {
		return select(con, "");
	}
	
	public TableMode select(String con, Object... params) {
		String sql = read.configLoad(con);
		TableMode tm = null;
		SqlUtils jdbcUtils = null;
		try {
			jdbcUtils = new SqlUtils();
			jdbcUtils.getConnection();
			tm = new TableMode(jdbcUtils.SqlSelect(sql, params));
			return tm;
		} catch (Throwable e) {
			e.printStackTrace();
			return null;
		} finally {
			try {
				if (jdbcUtils != null)
					jdbcUtils.Close();
			} catch (Exception ex) {
				ex.printStackTrace();
			}
		}
	}

	public boolean update(String con) {
		return update(con, "");
	}

	public boolean update(String con, Object... params) {
		String sql = read.configLoad(con);
		int flag = 0;
		SqlUtils jdbcUtils = null;
		try {
			jdbcUtils = new SqlUtils();
			jdbcUtils.getConnection();
			flag = jdbcUtils.SqlUpdate(sql, params);
			return flag > 0 ? true : false;
		} catch (Throwable e) {
			e.printStackTrace();
			return false;
		} finally {
			try { 
				if (jdbcUtils != null)
					jdbcUtils.Close();
			} catch (Exception ex) {
				ex.printStackTrace();
			}
		}
	}

}

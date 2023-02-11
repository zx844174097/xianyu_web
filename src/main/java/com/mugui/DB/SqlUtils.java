/*** Eclipse Class Decompiler plugin, copyright (c) 2016 Chen Chao (cnfree2000@hotmail.com) ***/
package com.mugui.DB;

import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.PreparedStatement;
import java.sql.ResultSet;

public class SqlUtils {
	private Connection ct;
	private PreparedStatement ps;
	private ResultSet rs;

	public Connection getConnection() throws Exception {
		Class.forName("com.mysql.jdbc.Driver");
		this.ct = DriverManager.getConnection("jdbc:mysql://1444.99:3306/jiaoben", "11", "11");
		return this.ct;
	}

	public ResultSet SqlSelect(String sql, Object[] parvar) throws Exception {
		this.ps = this.ct.prepareStatement(sql);
		if (parvar != null)
			if ((parvar.length != 1) || (parvar[0] != "")) {
				for (int i = 0; i < parvar.length; ++i)
					this.ps.setString(i + 1, String.valueOf(parvar[i]));
			}
		this.rs = this.ps.executeQuery();
		return this.rs;
	}

	public int SqlUpdate(String sql, Object[] parvar) throws Exception {
		int k = 0;
		this.ps = this.ct.prepareStatement(sql);
		if (parvar != null)
			if ((parvar.length != 1) || (parvar[0] != "")) {
				for (int i = 0; i < parvar.length; ++i) {
					this.ps.setString(i + 1, String.valueOf(parvar[i]));
				}
			}
		k = this.ps.executeUpdate();
		return k;
	}

	public void Close() throws Exception {
		if (this.rs != null) {
			this.rs.close();
			this.rs = null;
		}
		if (this.ps != null) {
			this.ps.close();
			this.ps = null;
		}
		if (this.ct != null) {
			this.ct.close();
			this.ct = null;
		}
	}
}
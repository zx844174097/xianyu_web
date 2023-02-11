/*** Eclipse Class Decompiler plugin, copyright (c) 2016 Chen Chao (cnfree2000@hotmail.com) ***/
package com.mugui.DB;

import java.sql.ResultSet;
import java.sql.ResultSetMetaData;
import java.util.Vector;
import javax.swing.JTable;
import javax.swing.table.AbstractTableModel;

public class TableMode extends AbstractTableModel {
	private static final long serialVersionUID = 8606735714775342730L;
	private int len = 0;
	private Vector<Vector<String>> Tablemode = null;
	public static JTable table = null;
	private Vector<String> column_name = null;

	public TableMode(ResultSet rs) {
		try {
			this.Tablemode = new Vector();
			this.len = rs.getMetaData().getColumnCount();
			Vector v = new Vector();
			if (rs.next()) {
				this.column_name = new Vector();
				for (int i = 1; i <= this.len; ++i) {
					this.column_name.add(rs.getMetaData().getColumnName(i));
					String s = rs.getString(i);
					v.add(s);
				}
				this.Tablemode.add(v);
			}
			while (rs.next()) {
				v = new Vector();
				for (int i = 1; i <= this.len; ++i) {
					String s = rs.getString(i);
					v.add(s);
				}
				this.Tablemode.add(v);
			}
		} catch (Exception e) {
			e.printStackTrace();
		}
	}

	public int getColumnCount() {
		return this.len;
	}

	public int getRowCount() {
		return this.Tablemode.size();
	}

	public String getValueAt(int arg0, int arg1) {
		Vector taStrings = null;
		try {
			taStrings = (Vector) this.Tablemode.get(arg0);
		} catch (Exception e) {
			return null;
		}
		String s = null;
		try {
			s = (String) taStrings.get(arg1);
		} catch (Exception e) {
			return s;
		}
		return s;
	}

	public String getColumnName(int column) {
		if (this.column_name == null)
			return null;
		return ((String) this.column_name.get(column));
	}
}
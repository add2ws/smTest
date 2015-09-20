package com.bky.util;

import java.util.ArrayList;
import java.util.List;

import com.bky.model.SysMenu;


public class EasyuiUtil {

	public static List<SysMenu> buildMenuTree(List<SysMenu> lst) {
		List<SysMenu> tree = new ArrayList<SysMenu>();
		for (SysMenu m1 : lst) {
			m1.setText(m1.getName());
			m1.setId(m1.getSid().intValue());
			m1.setIconCls(m1.getIconClass());

			if (m1.getpSid().intValue() == 0) {
				tree.add(m1);
			}
			for (SysMenu m2 : lst) {
				if (m1.getSid().equals(m2.getpSid())) {
					m1.addChildren(m2);
				}
			}
		}
		
		List<SysMenu> rootLst = new ArrayList<SysMenu>();
		SysMenu root = new SysMenu();
		root.setId(0);
		root.setMenuType("0");
		root.setName("所有菜单");
		root.setText("所有菜单");
		root.setIsValid("1");
		root.setVisible("1");
		root.setAddress("-");
		root.setMemo("系统根菜单");
		root.setChildren(tree);
		rootLst.add(root);
		return rootLst;
	}
	
}

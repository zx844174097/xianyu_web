/*
 * Generated by MyEclipse Struts
 * Template path: templates/java/JavaClass.vtl
 */
package com.mugui.struts.action;

import java.util.Timer;
import java.util.TimerTask;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import org.apache.struts.action.Action;
import org.apache.struts.action.ActionForm;
import org.apache.struts.action.ActionForward;
import org.apache.struts.action.ActionMapping;

/**
 * MyEclipse Struts Creation date: 08-21-2018
 * 
 * XDoclet definition:
 * 
 * @struts.action validate="true"
 */
public class SSRAction extends Action {
	/*
	 * Generated Methods
	 */

	private static Timer timer = null;

	public SSRAction() {
		if (timer == null) {
			timer=new Timer();
			timer.schedule(new TimerTask() {
				@Override
				public void run() {
					
				}
			}, 1000,  24 * 60 * 60 *1000);
		}
	}

	/**
	 * Method execute
	 * 
	 * @param mapping
	 * @param form
	 * @param request
	 * @param response
	 * @return ActionForward
	 */
	public ActionForward execute(ActionMapping mapping, ActionForm form, HttpServletRequest request, HttpServletResponse response) {
		
		return null;
	}
}
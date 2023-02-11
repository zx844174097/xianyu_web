package com.mugui.MAIN;

import javax.servlet.http.HttpSessionAttributeListener;
import javax.servlet.http.HttpSessionBindingEvent;
import javax.servlet.http.HttpSessionEvent;
import javax.servlet.http.HttpSessionListener;

public class SessionListener implements HttpSessionListener, HttpSessionAttributeListener {

	@Override
	public void sessionCreated(HttpSessionEvent arg0) {
		System.out.println("\n\n\nsessionCreated："+arg0.getSession().getId());
		System.out.println(new Exception());
		System.out.println(arg0.getSession().getId()); 
	}

	@Override
	public void sessionDestroyed(HttpSessionEvent arg0) {
		System.out.println("\n\n\nsessionDestroyed："+arg0.getSession().getId()+" ");
		System.out.println(new Exception());

	}

	@Override
	public void attributeAdded(HttpSessionBindingEvent arg0) {
		System.out.println("\n\n\nattributeAdded："+arg0.getName()+" " +arg0.getSession().getId());
		System.out.println(new Exception());
	}

	@Override
	public void attributeRemoved(HttpSessionBindingEvent arg0) {
		System.out.println("\n\n\nattributeRemoved："+arg0.getName()+" " +arg0.getSession().getId());
		System.out.println(new Exception());

	}

	@Override
	public void attributeReplaced(HttpSessionBindingEvent arg0) {
		System.out.println("\n\n\nattributeReplaced："+arg0.getName()+" " +arg0.getSession().getId());
		System.out.println(new Exception());

	}

}

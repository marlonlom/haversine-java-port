<%@ page language="java" contentType="text/html; charset=utf-8" pageEncoding="utf-8"%>
<%@ page import="java.io.FileInputStream" %>
<%@ page import="gov.dane.sige.web.cabb.controller.MainController"%>
<%
	String propertiesFilePath = application.getRealPath("/WEB-INF/config/app.properties");
	MainController.getInstance().setProperties(new FileInputStream(propertiesFilePath));
	String _title=(String)MainController.getInstance().getProperties().get("cab.title");
	String _subtitle=(String)MainController.getInstance().getProperties().get("cab.subtitle");
	
	String _dane_siteurl=(String)MainController.getInstance().getProperties().get("cab.dane.url.mainsite");
	String _dane_fburl=(String)MainController.getInstance().getProperties().get("cab.dane.url.facebok");
	String _dane_twurl=(String)MainController.getInstance().getProperties().get("cab.dane.url.twitter");
	String _dane_yturl=(String)MainController.getInstance().getProperties().get("cab.dane.url.youtube");
	
	String _dane_assistant_title = (String) MainController.getInstance().getProperties().get("cab.modal.assistant.title");
	String _contextPath = application.getContextPath();
%>
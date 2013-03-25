package gov.dane.sige.web.cabb.controller;

import java.io.InputStream;
import java.util.Properties;

import org.apache.log4j.Logger;

public class MainController {
	private static final MainController instance = new MainController();
	private static final Logger LOG = Logger.getLogger(MainController.class
			.getName());

	public static MainController getInstance() {
		return instance;
	}

	private Properties properties;

	public Properties getProperties() {
		return properties;
	}

	public void setProperties(InputStream inputStream) {
		try {
			this.properties = new Properties();
			if (inputStream != null) {
				properties.load(inputStream);
			}
		} catch (Exception e) {
			e.printStackTrace();
			LOG.error(e.getMessage());
		}
	}
}

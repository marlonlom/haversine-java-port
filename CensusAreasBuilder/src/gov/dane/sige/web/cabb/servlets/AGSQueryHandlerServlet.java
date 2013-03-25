package gov.dane.sige.web.cabb.servlets;

import gov.dane.sige.web.cabb.controller.AGSDataController;

import java.io.IOException;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.apache.log4j.Logger;

/**
 * Servlet implementation class AGSQueyrHandlerServlet
 */
public class AGSQueryHandlerServlet extends HttpServlet {
	private static final long serialVersionUID = 1L;
	private static final Logger LOG = Logger
			.getLogger(AGSQueryHandlerServlet.class);

	/**
	 * @see HttpServlet#HttpServlet()
	 */
	public AGSQueryHandlerServlet() {
		super();
	}

	/**
	 * @see HttpServlet#doPost(HttpServletRequest request, HttpServletResponse
	 *      response)
	 */
	protected void doPost(HttpServletRequest request,
			HttpServletResponse response) throws ServletException, IOException {
		String action = request.getParameter("action");
		try {
			if (!action.equals(null) && !action.equals("")) {
				if (action.equalsIgnoreCase("query")) {
					AGSDataController.performLayerQuery(request,response);
				}else if (action.equalsIgnoreCase("metadata")) {
					AGSDataController.findLayerMetadata(request,response);
				}
			}
		} catch (Exception e) {
			LOG.error(e);
		}
	}
}
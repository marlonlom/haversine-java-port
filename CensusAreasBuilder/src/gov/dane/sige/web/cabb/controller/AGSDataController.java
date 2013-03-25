package gov.dane.sige.web.cabb.controller;

import gov.dane.sige.web.cabb.util.ags.AGSQueryUtil;
import gov.dane.sige.web.cabb.util.common.ByteStreamUtil;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.apache.log4j.Logger;
import org.json.JSONObject;
import org.restlet.data.MediaType;
import org.restlet.representation.Representation;
import org.restlet.resource.ClientResource;

/**
 * Controller class for handling ArcGIS layer query operations
 * 
 * @author MJLopezM
 */
public class AGSDataController {

	private static final Logger LOG = Logger.getLogger(AGSDataController.class);

	/**
	 * Performs AGS query using layer interface and rest api
	 * 
	 * @param request
	 * @param response
	 */
	public static void performLayerQuery(HttpServletRequest request,
			HttpServletResponse response) {
		try {
			String queryParams = request.getParameter("params");
			String queryURL = request.getParameter("url");
			String queryFeatures = AGSQueryUtil.retrieveQueryFeatures(queryURL,
					queryParams);
			response.setContentType("text/plain; charset=utf-8");
			response.getWriter().print(queryFeatures);
		} catch (Exception e) {
			LOG.error(e);
		}
	}

	public static void findLayerMetadata(HttpServletRequest request,
			HttpServletResponse response) {
		try {
			String _format = !request.getParameter("f").equals(null)?request.getParameter("f"):"json";
			String queryURL = request.getParameter("url");
			ClientResource rcli = new ClientResource(queryURL + "?f=" + _format);
			Representation rp = rcli.get();
			JSONObject queryResult = new JSONObject();
			if (rp != null
					&& MediaType.TEXT_PLAIN.isCompatible(rp.getMediaType())) {
				byte[] data = ByteStreamUtil.getStreamBytes(rp.getStream());
				queryResult = new JSONObject(new String(data));
			}
			rcli.release();

			response.setContentType("text/plain; charset=utf-8");
			response.getWriter().print(queryResult.toString());
		} catch (Exception e) {
			LOG.error(e);
		}

	}
}

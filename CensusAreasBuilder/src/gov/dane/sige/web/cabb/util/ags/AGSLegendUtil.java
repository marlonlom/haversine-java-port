package gov.dane.sige.web.cabb.util.ags;

import gov.dane.sige.web.cabb.util.common.ByteStreamUtil;

import org.json.JSONArray;
import org.json.JSONObject;
import org.restlet.data.MediaType;
import org.restlet.representation.Representation;
import org.restlet.resource.ClientResource;

/**
 * Utility class for ArcGIS rest api legend processing for map services
 * 
 * @author MJLopezM
 */
public class AGSLegendUtil {

	public static String retrieveLegendFeature(String queryURL, int layer_id)
			throws Exception {
		JSONObject queryResult = new JSONObject();
		JSONObject legendResult = new JSONObject();

		ClientResource rcli = new ClientResource(queryURL + "/legend?f=json");
		Representation rp = rcli.get();
		if (rp != null && MediaType.TEXT_PLAIN.isCompatible(rp.getMediaType())) {
			byte[] data = ByteStreamUtil.getStreamBytes(rp.getStream());
			queryResult = new JSONObject(new String(data));
		}
		rcli.release();

		boolean condition = queryResult != null && queryResult.has("layers");
		if (condition) {
			JSONArray layers = queryResult.getJSONArray("layers");
			if (layers != null && layers.length() > 0) {
				legendResult = layers.getJSONObject(layer_id);
			}
		}

		return legendResult.toString();
	}
}
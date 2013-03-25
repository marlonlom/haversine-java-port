package gov.dane.sige.web.cabb.util.ags;

import gov.dane.sige.web.cabb.util.common.ByteStreamUtil;

import org.json.JSONObject;
import org.restlet.data.MediaType;
import org.restlet.representation.Representation;
import org.restlet.resource.ClientResource;

/**
 * Utility class for ArcGIS rest api query processing
 * 
 * @author MJLopezM
 * @see http://resources.esri.com/help/9.3/arcgisserver/apis/rest/query.html
 * @see http://atlas.resources.ca.gov/arcgis/sdk/rest/query.html
 */
public class AGSIdentifyUtil {

	private enum Params {
		f, geometry, geometryType, sr, mapExtent, tolerance, layers, imageDisplay, returnGeometry, maxAllowableOffset
	}

	public static String performIdentify(String queryURL, String qparams)
			throws Exception {
		JSONObject queryResult = new JSONObject();
		JSONObject params = new JSONObject(qparams);
		JSONObject qp = new JSONObject();
		prepareQueryParams(qp, params);

		String qps = "";
		String[] nms = JSONObject.getNames(qp);
		if (nms != null && nms.length > 0) {
			for (int i = 0; i < nms.length; i++) {
				qps = qps.concat(nms[i] + "=" + qp.get(nms[i]));
				if (i <= nms.length - 1) {
					qps = qps.concat("&");
				}
			}
		}

		ClientResource rcli = new ClientResource(queryURL + "/identify?" + qps);
		Representation rp = rcli.get();
		if (rp != null && MediaType.TEXT_PLAIN.isCompatible(rp.getMediaType())) {
			byte[] data = ByteStreamUtil.getStreamBytes(rp.getStream());
			queryResult = new JSONObject(new String(data));
		}
		rcli.release();

		return queryResult.toString();
	}

	private static void prepareQueryParams(JSONObject target, JSONObject source)
			throws Exception {

		/* setting spatial reference */
		target.put(Params.sr.name(), 4326);
		if (source.has(Params.sr.name())) {
			target.put(Params.sr.name(), source.getInt(Params.sr.name()));
		}

		/* setting output format */
		target.put(Params.f.name(), "json");

		/* setting tolerance */
		target.put(Params.tolerance.name(), 2);
		if (source.has(Params.tolerance.name())) {
			target.put(Params.tolerance.name(),
					source.getInt(Params.tolerance.name()));
		}

		/* setting layers */
		if (source.has(Params.layers.name())) {
			String layers_old = source.getString(Params.layers.name());
			String layers_new = !layers_old.startsWith("all:") ? "all:"
					+ layers_old : layers_old;
			target.put(Params.layers.name(), layers_new);
		}

		/* setting imageDisplay */
		if (source.has(Params.imageDisplay.name())) {
			target.put(Params.imageDisplay.name(),
					source.getString(Params.imageDisplay.name()));
		}

		/* setting maxAllowableOffset */
		target.put(Params.maxAllowableOffset.name(), "");
		if (source.has(Params.maxAllowableOffset.name())) {
			target.put(Params.maxAllowableOffset.name(),
					source.getInt(Params.maxAllowableOffset.name()));
		}

		/* setting returnGeometry */
		target.put(Params.returnGeometry.name(), true);
		if (source.has(Params.returnGeometry.name())) {
			target.put(Params.returnGeometry.name(),
					source.getBoolean(Params.returnGeometry.name()));
		}

		/* setting geometry */
		target.put(Params.geometry.name(), true);
		if (source.has(Params.geometry.name())) {
			target.put(Params.geometry.name(),
					source.getString(Params.geometry.name()));
		}

		/* setting mapExtent */
		target.put(Params.mapExtent.name(), true);
		if (source.has(Params.mapExtent.name())) {
			target.put(Params.mapExtent.name(),
					source.getString(Params.mapExtent.name()));
		}

		target.put(Params.geometryType.name(), "esriGeometryPoint");
	}
}
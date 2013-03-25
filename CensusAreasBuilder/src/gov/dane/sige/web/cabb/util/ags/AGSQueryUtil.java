package gov.dane.sige.web.cabb.util.ags;

import java.io.ByteArrayInputStream;
import java.io.ByteArrayOutputStream;
import java.io.InputStream;

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
public class AGSQueryUtil {

	private enum Params {
		text, geometry, geometryType, inSR, spatialRel, relationParam, objectIds, where, time, returnCountOnly, returnIdsOnly, returnGeometry, maxAllowableOffset, outSR, outFields, f
	}

	private enum GeometryTypes {
		esriGeometryPoint, esriGeometryMultipoint, esriGeometryPolyline, esriGeometryPolygon, esriGeometryEnvelope
	}

	private enum SpatialRelationships {
		esriSpatialRelIntersects, esriSpatialRelContains, esriSpatialRelCrosses, esriSpatialRelEnvelopeIntersects, esriSpatialRelIndexIntersects, esriSpatialRelOverlaps, esriSpatialRelTouches, esriSpatialRelWithin, esriSpatialRelRelation
	}

	public static String retrieveQueryFeatures(String queryURL, String qparams)
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

		ClientResource rcli = new ClientResource(queryURL + "/query?" + qps);
		Representation rp = rcli.get();
		if (rp != null && MediaType.TEXT_PLAIN.isCompatible(rp.getMediaType())) {
			byte[] data = getStreamBytes(rp.getStream());
			queryResult = new JSONObject(new String(data));
		}
		rcli.release();

		return queryResult.toString();
	}

	private static void prepareQueryParams(JSONObject target, JSONObject source)
			throws Exception {

		/* setting outSR */
		target.put(Params.outSR.name(), 4326);
		if (source.has(Params.outSR.name())) {
			target.put(Params.outSR.name(), source.getInt(Params.outSR.name()));
		}

		/* setting outFields */
		target.put(Params.outFields.name(),
				source.getString(Params.outFields.name()));

		/* setting output format */
		target.put(Params.f.name(), "html");
		if (source.has(Params.f.name())) {
			target.put(Params.f.name(), source.getString(Params.f.name()));
		}

		/* setting text */
		target.put(Params.text.name(), "");
		if (source.has(Params.text.name())) {
			target.put(Params.text.name(), source.getString(Params.text.name()));
		}

		/* setting where */
		if (source.has(Params.where.name())) {
			target.put(Params.where.name(),
					source.getString(Params.where.name()));
			target.remove(Params.text.name());
		}

		/* setting returnCountOnly */
		target.put(Params.returnCountOnly.name(), false);
		if (source.has(Params.returnCountOnly.name())) {
			target.put(Params.returnCountOnly.name(),
					source.getString(Params.returnCountOnly.name()));
		}

		/* setting returnIdsOnly */
		target.put(Params.returnIdsOnly.name(), false);
		if (source.has(Params.returnIdsOnly.name())) {
			target.put(Params.returnIdsOnly.name(),
					source.getString(Params.returnIdsOnly.name()));
		}

		/* setting maxAllowableOffset */
		target.put(Params.maxAllowableOffset.name(), "");
		if (source.has(Params.maxAllowableOffset.name())) {
			target.put(Params.maxAllowableOffset.name(),
					source.getInt(Params.maxAllowableOffset.name()));
		}

		/* setting geometryType */
		target.put(Params.geometryType.name(),
				GeometryTypes.esriGeometryEnvelope.name());
		if (source.has(Params.geometryType.name())) {
			String gt = source.getString(Params.geometryType.name());
			target.put(Params.geometryType.name(), gt);
		}

		/* setting spatialRel */
		target.put(Params.spatialRel.name(),
				SpatialRelationships.esriSpatialRelIntersects.name());
		if (source.has(Params.spatialRel.name())) {
			target.put(Params.spatialRel.name(),
					source.getString(Params.spatialRel.name()));
		}

		/* setting objectIds */
		target.put(Params.objectIds.name(), "");
		if (source.has(Params.objectIds.name())) {
			target.put(Params.objectIds.name(),
					source.getString(Params.objectIds.name()));
		}

		/* setting maxAllowableOffset */
		if (source.has(Params.maxAllowableOffset.name())) {
			target.put(Params.maxAllowableOffset.name(),
					source.getInt(Params.maxAllowableOffset.name()));
		}

		/* setting inSR */
		target.put(Params.inSR.name(), "");
		if (source.has(Params.inSR.name())) {
			target.put(Params.inSR.name(), source.getInt(Params.inSR.name()));
		}

		/* setting returnGeometry */
		target.put(Params.returnGeometry.name(), true);
		if (source.has(Params.returnGeometry.name())) {
			target.put(Params.returnGeometry.name(),
					source.getBoolean(Params.returnGeometry.name()));
			boolean condi = source.has(Params.outFields.name())
					&& source.getString(Params.outFields.name()).equals("*");
			if (condi) {
				target.put(Params.returnGeometry.name(), true);
			}
		}

		target.put(Params.time.name(), "");
		target.put(Params.geometryType.name(), "");
	}

	/**
	 * Performs bytes retrieval from input stream <br/>
	 * (this is a really general purpose method)
	 * 
	 * @param inputStream
	 * @return bytes retrieved from inputStream
	 * @throws Exception
	 */
	private static byte[] getStreamBytes(InputStream inputStream)
			throws Exception {

		int len;
		int size = 1024;
		byte[] buf;

		if (inputStream instanceof ByteArrayInputStream) {
			size = inputStream.available();
			buf = new byte[size];
			len = inputStream.read(buf, 0, size);
		} else {
			ByteArrayOutputStream bos = new ByteArrayOutputStream();
			buf = new byte[size];
			while ((len = inputStream.read(buf, 0, size)) != -1)
				bos.write(buf, 0, len);
			buf = bos.toByteArray();
		}
		return buf;
	}
}
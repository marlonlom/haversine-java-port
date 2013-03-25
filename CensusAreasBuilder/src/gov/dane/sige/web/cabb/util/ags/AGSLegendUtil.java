package gov.dane.sige.web.cabb.util.ags;

import java.io.ByteArrayInputStream;
import java.io.ByteArrayOutputStream;
import java.io.InputStream;

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
	    byte[] data = getStreamBytes(rp.getStream());
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
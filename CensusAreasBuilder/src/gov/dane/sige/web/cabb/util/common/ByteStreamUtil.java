package gov.dane.sige.web.cabb.util.common;

import java.io.ByteArrayInputStream;
import java.io.ByteArrayOutputStream;
import java.io.InputStream;

public class ByteStreamUtil {

	public static byte[] getStreamBytes(InputStream stream) throws Exception {
		int len;
		int size = 1024;
		byte[] buf;

		if (stream instanceof ByteArrayInputStream) {
			size = stream.available();
			buf = new byte[size];
			len = stream.read(buf, 0, size);
		} else {
			ByteArrayOutputStream bos = new ByteArrayOutputStream();
			buf = new byte[size];
			while ((len = stream.read(buf, 0, size)) != -1)
				bos.write(buf, 0, len);
			buf = bos.toByteArray();
		}
		return buf;
	}
}

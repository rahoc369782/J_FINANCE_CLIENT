import { input_headers, output_headers } from "../staticdata/input_headers.js";

function generator_headers_buffer(obj) {
  const hdrs = JSON.stringify(obj);
  const buffer = Buffer.from(hdrs + "\n");
  return { success: true, hdr_buffer: buffer, hdr_length: hdrs.length };
}

export { generator_headers_buffer };

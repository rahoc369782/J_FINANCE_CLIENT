import { generator_data_buffer } from "./generator_dataset.js";
import { generator_headers_buffer } from "./generator_headers.js";
import { generator_offset_buffer } from "./generator_offset_table.js";

export function generator_wrapper(hdr_buff, data_buff) {
  const hdr_buf = generator_headers_buffer(hdr_buff);
  const data_buf = generator_data_buffer(data_buff);
  console.log(hdr_buf, data_buf);
  const final_buf = Buffer.concat([
    hdr_buf["hdr_buffer"],
    data_buf["dta_buffer"],
  ]);

  return { success: true, final_buf };
}

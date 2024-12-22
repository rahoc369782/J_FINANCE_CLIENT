import { CONFIG } from "../../config/global.config.js";

function generator_offset_buffer({ hdr_length }) {
  const data_offset =
    CONFIG["J_FINANCE_FILE_OFFSET_TABLE_RESERVED_BYTES"] + hdr_length;
  const offset_table = { headers: hdr_length, data: data_offset };
  const pre_allocate = Buffer.alloc(50);
  pre_allocate.write(JSON.stringify(offset_table) + "\n", 0);
  return { success: true, offs_buffer: pre_allocate };
}

export { generator_offset_buffer };

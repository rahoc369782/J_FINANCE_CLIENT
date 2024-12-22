import { generator_headers_buffer } from "./src/generator/generator_headers.js";
import { generator_wrapper } from "./src/generator/generator_wrapper.js";
import { read_gitfiles, write_gitfiles } from "./src/gitio/git_networkio.js";
import { read_transactions } from "./src/io/local.transactions.witer.js";
import { fileReader } from "./src/io/reader.js";
import { NetworkUtility } from "./src/network/j_network.js";
import { parse_offset_table } from "./src/parser/parser_offset_table.js";
import { transaction_pushing_process_initialization } from "./src/processes/push_latest_transactions.js";

const { buffer_bytes } = await fileReader();

transaction_pushing_process_initialization();

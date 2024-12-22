/*
    Author: Rahul Darekar
    Date  : 20-12-2024

    Description: 
    Push latest transactions to Git following the process below:
    1) Read and parse input and output files into appropriate data structures.
    2) Perform a compaction process:
        - Compare each transaction in the input file's data section with 
          the last processed timestamp in the output file's headers.
        - Remove all transactions before the timestamp. Only new transactions 
          and the latest added transactions will be part of the new buffer.
    3) Rewrite headers as needed for the input file.
    4) Generate the final buffer.
    5) Push the buffer to Git and delete transactions from the local storage.
*/

import { generator_wrapper } from "../generator/generator_wrapper.js";
import { read_gitfiles, write_gitfiles } from "../gitio/git_networkio.js";
import { c_j_hdr_modifier, c_j_parser } from "../parser/j_common_parser.js";
import { compaction_old_trns } from "../utils/trns.compactions.js";

async function data_pushing_process(sha, buff) {
  try {
    const body = {
      message: `Transactions updated as on ${new Date().toISOString()}`,
      sha: sha,
      content: buff.toString("base64"),
    };

    const { success, data } = await write_gitfiles({ body });

    if (!success) {
      throw new Error("Failed to push data to Git.");
    }

    console.log("Git push response:", data);
  } catch (err) {
    console.error("Error during data push:", err.message);
    throw err;
  }
}

async function extract_sections_from_buf(sha, buffer_data, output_buffer) {
  try {
    console.log("Buffer content split into sections:");
    const buff = buffer_data.toString().split("\n");
    const output_buff = output_buffer.toString().split("\n");
    console.log(buff, output_buff);

    // Extract header bytes
    const hdr_buff = c_j_parser({
      buffer: buff[0],
    });

    if (!hdr_buff.success) {
      throw new Error("Failed to parse header buffer.");
    }

    // Extract output header bytes
    const out_hdr_buff = c_j_parser({
      buffer: output_buff[0],
    });

    if (!out_hdr_buff.success) {
      throw new Error("Failed to parse header buffer.");
    }
    console.log(out_hdr_buff["data"]["last_processed_timestamp"]);
    // Modify headers as needed
    const mod_obj = c_j_hdr_modifier(hdr_buff["data"], 5);
    console.log("Modified headers:", mod_obj);

    // Perform compaction
    const compaction_status = compaction_old_trns(
      buff[1],
      out_hdr_buff["data"]["last_processed_timestamp"]
    );

    if (!compaction_status.success) {
      throw new Error("Compaction process failed.");
    }

    console.log("Compaction status:", compaction_status);

    // Generate the final buffer
    const status = generator_wrapper(mod_obj, compaction_status["data"]);

    if (!status.success) {
      throw new Error("Failed to generate final buffer.");
    }

    // Push data to Git
    await data_pushing_process(sha, status["final_buf"]);
  } catch (err) {
    console.error("Error during section extraction:", err.message);
    throw err;
  }
}

export async function transaction_pushing_process_initialization() {
  console.log(
    "Initiating process for pushing latest transactions and compaction..."
  );

  try {
    // Fetch input and output files concurrently
    const files_call = [
      read_gitfiles({ file_type: "input", buffer_data: true }),
      read_gitfiles({ file_type: "output", buffer_data: true }),
    ];

    const [j_input, j_output] = await Promise.all(files_call);

    if (!j_input.success || !j_output.success) {
      throw new Error("Failed to read input or output files.");
    }

    const { sha, buffer_data } = j_input;

    // Extract and process sections from the input buffer
    await extract_sections_from_buf(sha, buffer_data, j_output["buffer_data"]);
    console.log("Transaction pushing process completed successfully.");
  } catch (err) {
    console.error("Error during transaction processing:", err.message);
    return { success: false, msg: "Pushing transactions failed." };
  }
}

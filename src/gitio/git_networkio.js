import { CONFIG } from "../../config/global.config.js";
import { NetworkUtility } from "../network/j_network.js";

async function read_gitfiles({ file_type, buffer_data = false }) {
  const final_path =
    file_type == "input"
      ? CONFIG["GIT_CREDS"]["j_finance_input_file_path_generator"]()
      : CONFIG["GIT_CREDS"]["j_finance_output_file_path_generator"]();
  const result = await NetworkUtility(
    CONFIG["GIT_CREDS"]["base_url"],
    final_path,
    "GET",
    {
      Authorization: `${CONFIG["GIT_CREDS"]["access_token"]}`,
      Accept: "application/vnd.github.v3+json",
    },
    null,
    "json"
  );
  if (result["success"] && result["data"]) {
    if (buffer_data) {
      const fileBytes = Buffer.from(result["data"].content, "base64");
      return { success: true, sha: result["data"].sha, buffer_data: fileBytes };
    }
    return result;
  }
  return result;
}

async function write_gitfiles({ body }) {
  const result = await NetworkUtility(
    CONFIG["GIT_CREDS"]["base_url"],
    CONFIG["GIT_CREDS"]["j_finance_input_file_path_generator"](),
    "PUT",
    {
      Authorization: `token ${CONFIG["GIT_CREDS"]["access_token"]}`,
      Accept: "application/vnd.github.v3+json",
    },
    body,
    "json"
  );
  console.log(result);
  if (result["success"] && result["data"] && result["data"]["content"]) {
    return result;
  }
  return result;
}

export { read_gitfiles, write_gitfiles };

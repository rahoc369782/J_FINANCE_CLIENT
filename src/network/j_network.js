export async function NetworkUtility(
  baseurl,
  path,
  method = "GET",
  headers = {},
  body = {},
  type = "text"
) {
  const url = `${baseurl}/${path}`;
  const config_obj = {
    method,
    headers: { ...headers },
  };
  if (method != "GET") {
    config_obj["body"] = body ? JSON.stringify(body) : {};
  }
  try {
    const apiCall = await fetch(url, config_obj);
    // Check if the response is successful
    if (!apiCall.ok) {
      throw new Error(`HTTP error! Status: ${apiCall.status}`);
    }
    let data = null;
    if (type == "json") {
      data = await apiCall.json(); // Parse the JSON response
    } else {
      data = await apiCall.text(); // Parse the JSON response
    }
    return { success: true, data };
  } catch (err) {
    console.log(err);
    return { success: false, data: null };
  }
}

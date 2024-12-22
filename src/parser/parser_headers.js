function parse_headers(buffer) {
  try {
    const hdrs = JSON.parse(buffer);
    console.log(hdrs);
  } catch (err) {}
}

export { parse_offset_table };

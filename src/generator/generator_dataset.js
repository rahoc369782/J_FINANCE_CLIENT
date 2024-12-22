function generator_data_buffer(data_buff) {
  const buffer = Buffer.from(JSON.stringify(data_buff));
  return { success: true, dta_buffer: buffer };
}

export { generator_data_buffer };

const input_headers = [
  {
    title: "total_transactions",
    type: "number",
    initial: 0,
  },
  {
    title: "transaction_in_batch",
    type: "number",
    initial: 0,
  },
  {
    title: "batch_end_date",
    type: "timestamp",
    initial: new Date().getTime(),
  },
  {
    title: "process_timestamp",
    type: "timestamp",
    initial: new Date().getTime(),
  },
];

const output_headers = [
  {
    title: "total_transactions",
    type: "number",
    initial: 0,
  },
  {
    title: "successfully_processed_transactions",
    type: "number",
    initial: 0,
  },
  {
    title: "last_processed_timestamp",
    type: "timestamp",
    initial: new Date().getTime(),
  },
];

export { input_headers, output_headers };

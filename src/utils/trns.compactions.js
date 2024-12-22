import { data } from "../../public/data/transactions/transactions.js";

export function compaction_old_trns(buffer, threashold_timestamp) {
  const data_buf = JSON.parse(buffer);
  if (!Array.isArray(data_buf)) {
    return { success: false };
  }

  let valid_trns = [];
  data_buf.forEach((trns) => {
    if (trns["timestamp"] > threashold_timestamp) {
      valid_trns.push(trns);
    }
  });

  // New transaction pushing to buffer of non-processed transactions
  data.forEach((trns) => {
    valid_trns.push(trns);
  });

  return { success: true, data: valid_trns };
}

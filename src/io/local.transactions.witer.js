import { data } from "../../public/data/transactions/transactions.js";

export function read_transactions() {
  const buffer = Buffer.from(JSON.stringify(data));
  return buffer;
}

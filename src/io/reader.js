import { CONFIG } from "../../config/global.config.js";
import fs, { stat } from "fs";

function readContent(fd, buffer) {
  const result = fs.readSync(fd, buffer, 0, buffer.length, null);
  return result;
}
async function fileReader() {
  const buffer_bytes = Buffer.alloc(CONFIG["TRANSACTION_BUFFER_LEANGTH"]);
  const readTransactions = new Promise((res, rej) => {
    fs.open(CONFIG["TRANSACTION_FILE_PATH"], "r", (err, fd) => {
      if (err) {
        rej({ success: false });
        return;
      }
      const read_status = readContent(fd, buffer_bytes);
      res({ success: true, bytes_read: read_status, buffer_bytes });
    });
    // Read default file that is transaction.
  });
  try {
    const status = await readTransactions;
    return status;
  } catch (err) {
    return { success: false };
  }
}

export { fileReader };

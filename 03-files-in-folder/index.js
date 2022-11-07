import { stat } from "fs";
import { readdir } from "fs/promises";
import path from "path";

try {
  const files = await readdir("./03-files-in-folder/secret-folder", {
    withFileTypes: true,
  });

  for (const file of files) {
    if (file.isFile()) {
      const parse = path.parse(file.name);
      stat(`./03-files-in-folder/secret-folder/${file.name}`, (err, stats) => {
        console.log(
          parse.name +
            " - " +
            parse.ext.split("").slice(1).join("") +
            " - " +
            stats.size +
            "b"
        );
      });
    }
  }
} catch (err) {
  console.error(err);
}

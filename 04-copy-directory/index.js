import * as fs from "fs";

fs.readdir("./04-copy-directory/files-copy", function (err, files) {
  files?.forEach(file => fs.unlink(`./04-copy-directory/files-copy/${file}`, ()=>{}))
});

fs.mkdir("./04-copy-directory/files-copy", function (err) {});

fs.readdir("./04-copy-directory/files", function (err, files) {
  files.forEach((file) => {
    fs.open(`./04-copy-directory/files-copy/${file.toString()}`, "w", () => {});
    fs.copyFile(
      `./04-copy-directory/files/${file.toString()}`,
      `./04-copy-directory/files-copy/${file.toString()}`,
      (error) => {}
    );
  });
});

import path from "path";
import * as readLine from "readline";
import * as fs from "fs";
import { stdin as input, stdout as output } from "process";

const rl = readLine.createInterface({ input, output });

fs.open(path.resolve("./02-write-file/text.txt"), "w", () => {
  console.log("Hello, enter your data: ");
});

rl.on("line", (input) => {
  if (input == "exit") {
    closeStream();
  } else {
    fs.appendFile("./02-write-file/text.txt", input, (err) => {
      if (err) throw err;
      console.log("Data has been added!");
    });
  }
});

rl.on("SIGINT", () => {
  closeStream();
});

function closeStream() {
  console.log("Bye bye, thanks");
  rl.close();
}

import chalk from "chalk";
import Table from "cli-table";

let usage = new Table({
  chars: {
    top: "",
    "top-mid": "",
    "top-left": "",
    "top-right": "",
    bottom: "",
    "bottom-mid": "",
    "bottom-left": "",
    "bottom-right": "",
    left: "",
    "left-mid": "",
    mid: "",
    "mid-mid": "",
    right: "",
    "right-mid": "",
    middle: " ",
  },
  style: { "padding-left": 0, "padding-right": 0 },
});

export default function Usage() {
  usage.push(
    ["", ""],
    ["Commands", "Usage"],
    ["--info [id]", "Get video info"],
    ["--download [id]", "Download video"],
    ["", ""]
  );
  console.log(chalk.grey(usage.toString()));
}

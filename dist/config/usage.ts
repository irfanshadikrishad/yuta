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
  console.log("");
  usage.push(
    ["Commands", "Usage"],
    ["--info [id]", "Get video info from video id."],
    ["--download [id]", "To download video with video id."],
    ["--version", "Get the version."],
    ["--help", "Get the available commands."]
  );
  console.log(usage.toString(), "\n");
}

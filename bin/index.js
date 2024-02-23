#!/usr/bin/env node

import chalk from "chalk";
import arg from "arg";
import Usage from "../src/config/usage.js";
import getVideoInfo from "../src/commands/info.js";
import downloadVideo from "../src/commands/download.js";

try {
  const args = arg({
    "--info": String,
    "--download": String,
    "--help": Boolean,
  });
  if (args["--info"]) {
    console.log("");
    console.log(await getVideoInfo(args["--info"]));
  } else if (args["--download"]) {
    downloadVideo(args["--download"]);
  } else if (args["--help"]) {
    Usage();
  } else {
    console.log(`command not found`);
    Usage();
  }
} catch (error) {
  console.log(chalk.redBright(error.message));
  Usage();
}

#!/usr/bin/env node
import chalk from "chalk";
import arg from "arg";
import Usage from "../dist/config/usage.js";
import getVideoInfo from "../dist/commands/info.js";
import downloadVideo from "../dist/commands/download.js";
try {
    const args = arg({
        "--info": String,
        "--download": String,
        "--help": Boolean,
        "--version": Boolean,
        "-i": "--info",
        "-d": "--download",
        "-h": "--help",
        "-v": "--version",
    });
    if (args["--info"]) {
        console.log("");
        console.log(await getVideoInfo(args["--info"]));
        process.exit(0);
    }
    else if (args["--download"]) {
        downloadVideo(args["--download"]);
    }
    else if (args["--help"]) {
        Usage();
    }
    else if (args["--version"]) {
        console.log("yuta v1.0.8");
    }
    else {
        console.log(chalk.redBright(`command not found`));
        Usage();
    }
}
catch (error) {
    console.log(chalk.redBright(error.message));
    Usage();
}

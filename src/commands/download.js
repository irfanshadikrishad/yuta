import chalk from "chalk";
import ytdl from "ytdl-core";
import fs from "fs";
import Usage from "../config/usage.js";
import os from "os";
import path from "path";

const download_directory = path.join(os.homedir() + "\\" + "Downloads");

export default async function downloadVideo(videoId) {
  try {
    const isValidId = ytdl.validateID(videoId);
    if (isValidId) {
      const videoInfo = await ytdl.getInfo(videoId);
      const title = videoInfo.videoDetails.title;
      ytdl
        .downloadFromInfo(videoInfo)
        .pipe(fs.createWriteStream(`${download_directory}\\${title}.mp4`))
        .on("finish", () => {
          console.log(chalk.cyan(`[downloaded] ${title}`));
          process.exit(0);
        });
    } else {
      console.log(chalk.redBright(`Invalid video Id.`));
      Usage();
    }
  } catch (error) {
    console.log(chalk.redBright(error.message));
    Usage();
    process.exit(1);
  }
}

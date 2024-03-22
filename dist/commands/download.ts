import chalk from "chalk";
import ytdl from "ytdl-core";
import fs from "fs";
import Usage from "../config/usage.js";
import os from "os";
import path from "path";
import openExplorer from "open-explorer-cross-platform";
import getVideoInfo from "./info.js";
import { loading } from "cli-loading-animation";

const { start, stop } = loading("Downloadig...", { clearOnEnd: true });
const download_directory: string = path.join(os.homedir() + "\\" + "Downloads");

export default async function downloadVideo(videoId: string) {
  try {
    const isValidId: boolean = ytdl.validateID(videoId);
    if (isValidId) {
      const videoInfo = await ytdl.getInfo(videoId);
      const title: string = videoInfo.videoDetails.title;
      console.log("\n", await getVideoInfo(videoId), "\n");
      start();
      ytdl
        .downloadFromInfo(videoInfo)
        .pipe(fs.createWriteStream(`${download_directory}\\${title}.mp4`))
        .on("finish", () => {
          stop();
          console.log(chalk.cyan(`[downloaded] ${title}`));
          openExplorer(download_directory);
          process.exit(0);
        })
        .on("error", (error) => {
          console.log(chalk.redBright(error.message));
          console.log(
            chalk.yellow(
              `Sorry for the inconvenience, please try another video.`
            )
          );
          process.exit(1);
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

import chalk from "chalk";
import ytdl from "ytdl-core";
import Table from "cli-table";
import Usage from "../config/usage.js";

let table = new Table({
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

export default async function getVideoInfo(videoId) {
  try {
    const isValidId = await ytdl.validateID(videoId);
    if (isValidId) {
      const videoInfo = await ytdl.getBasicInfo(videoId);
      const {
        title,
        lengthSeconds,
        ownerChannelName,
        viewCount,
        category,
        publishDate,
        keywords,
      } = videoInfo.videoDetails;
      table.push(
        ["Title", title],
        ["Length", lengthSeconds],
        ["Channel Name", ownerChannelName],
        ["Views", viewCount],
        ["Category", category],
        ["Published", publishDate]
      );
      console.log(table.toString());
      process.exit(1);
    } else {
      console.log(chalk.redBright(`Invalid Video Id.`));
      Usage();
    }
  } catch (error) {
    console.log(chalk.redBright(error.message));
    Usage();
  }
}

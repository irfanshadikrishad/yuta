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

function abbreviateNumber(number) {
  const SI_SYMBOL = ["", "k", "M", "G", "T", "P", "E"];

  const tier = (Math.log10(Math.abs(number)) / 3) | 0;

  if (tier === 0) return number;

  const suffix = SI_SYMBOL[tier];
  const scale = Math.pow(10, tier * 3);

  const scaled = number / scale;

  return scaled.toFixed(1) + suffix;
}

function formatTime(seconds) {
  const hours = Math.floor(seconds / 3600);
  const minutes = Math.floor((seconds % 3600) / 60);
  const remainingSeconds = seconds % 60;

  const formattedHours = String(hours).padStart(2, "0");
  const formattedMinutes = String(minutes).padStart(2, "0");
  const formattedSeconds = String(remainingSeconds).padStart(2, "0");

  return `${formattedHours}:${formattedMinutes}:${formattedSeconds}`;
}

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
        author,
        keywords,
      } = videoInfo.videoDetails;
      table.push(
        ["Title", title],
        ["Length", formatTime(lengthSeconds)],
        [
          "Author",
          `${ownerChannelName} (${abbreviateNumber(author.subscriber_count)})`,
        ],
        ["Views", abbreviateNumber(viewCount)],
        ["Category", category],
        ["Published", publishDate.slice(0, 10)]
      );
      return table.toString();
    } else {
      console.log(chalk.redBright(`Invalid Video Id.`));
      Usage();
    }
  } catch (error) {
    console.log(chalk.redBright(error.message));
    Usage();
  }
}

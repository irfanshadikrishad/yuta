import chalk from "chalk";
import ytdl from "ytdl-core";
import Table from "cli-table";
import Usage from "../config/usage.js";
import { abbreviateNumber, formatTime } from "../../utils/helpers.js";
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
            const { title, lengthSeconds, ownerChannelName, viewCount, category, publishDate, author, keywords, } = videoInfo.videoDetails;
            table.push(["Title", title], ["Length", formatTime(Number(lengthSeconds))], [
                "Author",
                `${ownerChannelName} (${abbreviateNumber(Number(author.subscriber_count))})`,
            ], ["Views", abbreviateNumber(Number(viewCount))], ["Category", category], ["Published", publishDate.slice(0, 10)]);
            return table.toString();
        }
        else {
            console.log(chalk.redBright(`Invalid Video Id.`));
            Usage();
        }
    }
    catch (error) {
        console.log(chalk.redBright(error.message));
        Usage();
    }
}

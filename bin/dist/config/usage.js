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
    usage.push(["Commands", "Arguments", "Usage"], ["--info | -i", "[id]", "Get video info from video id."], ["--download | -d", "[id]", "To download video with video id."], ["--version | -v", "", "Get the version."], ["--help | -h", "", "Get the available commands."]);
    console.log(usage.toString(), "\n");
}

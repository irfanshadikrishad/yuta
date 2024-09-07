function abbreviateNumber(number) {
    const SI_SYMBOL = ["", "k", "M", "G", "T", "P", "E"];
    const tier = (Math.log10(Math.abs(number)) / 3) | 0;
    if (tier === 0)
        return String(number);
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
export { abbreviateNumber, formatTime };

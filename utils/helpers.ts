function abbreviateNumber(number: number): string {
  const SI_SYMBOL: string[] = ["", "k", "M", "G", "T", "P", "E"];

  const tier: number = (Math.log10(Math.abs(number)) / 3) | 0;

  if (tier === 0) return String(number);

  const suffix = SI_SYMBOL[tier];
  const scale = Math.pow(10, tier * 3);

  const scaled = number / scale;

  return scaled.toFixed(1) + suffix;
}

function formatTime(seconds: number) {
  const hours = Math.floor(seconds / 3600);
  const minutes = Math.floor((seconds % 3600) / 60);
  const remainingSeconds = seconds % 60;

  const formattedHours: string = String(hours).padStart(2, "0");
  const formattedMinutes: string = String(minutes).padStart(2, "0");
  const formattedSeconds: string = String(remainingSeconds).padStart(2, "0");

  return `${formattedHours}:${formattedMinutes}:${formattedSeconds}`;
}

export { abbreviateNumber, formatTime };

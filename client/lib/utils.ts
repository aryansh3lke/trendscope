import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatTimestamp(timestamp: string): string {
  const date = new Date(timestamp + "Z");

  // Get month name
  const month = date.toLocaleString("en-US", { month: "long" });

  // Get day and add suffix (st, nd, rd, th)
  const day = date.getDate();
  const suffix =
    day % 10 === 1 && day !== 11
      ? "st"
      : day % 10 === 2 && day !== 12
        ? "nd"
        : day % 10 === 3 && day !== 13
          ? "rd"
          : "th";

  // Format time with AM/PM and timezone
  const time = date.toLocaleTimeString("en-US", {
    hour: "numeric",
    minute: "2-digit",
    hour12: true,
    timeZoneName: "short",
  });

  return `${month} ${day}${suffix} at ${time}`;
}

export function getSentimentColor(scoreString: string) {
  const score = parseFloat(scoreString.replace("%", "")); // Convert "-54.55%" to -54.55

  // Clamp the score between -100 and 100
  const clampedScore = Math.max(-100, Math.min(100, score));

  // Normalize the score to a range between 0 (red) and 1 (green)
  const normalized = (clampedScore + 100) / 200;

  if (normalized < 0.5) {
    // Interpolating between red (255, 0, 0) and white (255, 255, 255)
    const t = normalized * 2;
    return `rgb(255, ${Math.round(255 * t)}, ${Math.round(255 * t)})`; // Red to White
  } else {
    // Interpolating between white (255, 255, 255) and green (0, 255, 0)
    const t = (normalized - 0.5) * 2;
    return `rgb(${Math.round(255 * (1 - t))}, 255, ${Math.round(255 * (1 - t))})`; // White to Green
  }
}

export function getSentimentEmoji(scoreString: string) {
  const score = parseFloat(scoreString.replace("%", "")); // Convert "-54.55%" to -54.55

  if (score > 20) return "😊"; // Positive sentiment
  if (score < -20) return "😡"; // Negative sentiment
  return "😐"; // Neutral sentiment
}

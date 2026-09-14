import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatDate(date: Date | string): string {
  return new Date(date).toLocaleDateString("en-IN", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
}

export function formatRelativeTime(date: Date | string): string {
  const now = new Date();
  const d = new Date(date);
  const diff = now.getTime() - d.getTime();

  const minutes = Math.floor(diff / 60000);
  const hours = Math.floor(diff / 3600000);
  const days = Math.floor(diff / 86400000);

  if (minutes < 1) return "just now";
  if (minutes < 60) return `${minutes}m ago`;
  if (hours < 24) return `${hours}h ago`;
  if (days < 7) return `${days}d ago`;
  return formatDate(date);
}

export function getInitials(name: string): string {
  return name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);
}

export function truncate(str: string, length: number): string {
  if (str.length <= length) return str;
  return str.slice(0, length) + "…";
}

export const CONTRIBUTION_POINTS = {
  upload_resource: 10,
  answer_question: 5,
  add_viva_question: 5,
  add_viva_answer: 3,
  placement_experience: 15,
  internship_opportunity: 8,
  professor_insight: 5,
  verify_info: 2,
};

export const BADGE_THRESHOLDS = [
  { name: "First Contribution", threshold: 1, icon: "🌱" },
  { name: "Helper", threshold: 50, icon: "🤝" },
  { name: "Contributor", threshold: 150, icon: "⭐" },
  { name: "Trusted Contributor", threshold: 300, icon: "🏆" },
  { name: "Knowledge Champion", threshold: 500, icon: "🎓" },
];

import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatPercentage(value: number): string {
  return `${Math.round(value)}%`;
}

export function getRiskColorClass(level: string): {
  bg: string;
  text: string;
  border: string;
  badge: string;
  glow: string;
} {
  switch (level?.toLowerCase()) {
    case 'critical':
      return {
        bg: 'bg-red-500/10',
        text: 'text-red-400',
        border: 'border-red-500/30',
        badge: 'bg-red-500/20 text-red-300 border-red-500/40',
        glow: 'shadow-glow-red',
      };
    case 'high':
      return {
        bg: 'bg-orange-500/10',
        text: 'text-orange-400',
        border: 'border-orange-500/30',
        badge: 'bg-orange-500/20 text-orange-300 border-orange-500/40',
        glow: 'shadow-[0_0_15px_-3px_rgba(249,115,22,0.3)]',
      };
    case 'medium':
      return {
        bg: 'bg-amber-500/10',
        text: 'text-amber-400',
        border: 'border-amber-500/30',
        badge: 'bg-amber-500/20 text-amber-300 border-amber-500/40',
        glow: 'shadow-[0_0_15px_-3px_rgba(245,158,11,0.3)]',
      };
    case 'low':
    case 'verified':
    case 'ready':
      return {
        bg: 'bg-emerald-500/10',
        text: 'text-emerald-400',
        border: 'border-emerald-500/30',
        badge: 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40',
        glow: 'shadow-[0_0_15px_-3px_rgba(16,185,129,0.3)]',
      };
    default:
      return {
        bg: 'bg-blue-500/10',
        text: 'text-blue-400',
        border: 'border-blue-500/30',
        badge: 'bg-blue-500/20 text-blue-300 border-blue-500/40',
        glow: 'shadow-glow',
      };
  }
}

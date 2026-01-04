import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

/**
 * Utility function to merge Tailwind CSS classes, handling conditional classes gracefully.
 * Uses `clsx` for combining classes and `twMerge` for optimizing and resolving conflicts.
 * @param inputs - Array of class values or strings.
 * @returns A single, optimized class string.
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

/**
 * Formats a date object or string into a localized string (e.g., "Oct 26, 2023").
 * @param dateInput - Date object or ISO date string.
 * @param locale - The locale string (defaults to 'en-US').
 * @returns Formatted date string.
 */
export function formatDate(dateInput: string | Date, locale: string = 'en-US'): string {
  const date = new Date(dateInput);
  return new Intl.DateTimeFormat(locale, {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  }).format(date);
}

/**
 * Calculates the time difference and returns a human-readable relative time string
 * (e.g., "5 minutes ago", "3 hours ago", "yesterday").
 * @param dateInput - Date object or ISO date string.
 * @returns Relative time string.
 */
export function timeAgo(dateInput: string | Date): string {
  const now = new Date();
  const past = new Date(dateInput);
  const seconds = Math.floor((now.getTime() - past.getTime()) / 1000);

  if (seconds < 60) return `${seconds} second${seconds !== 1 ? 's' : ''} ago`;
  const minutes = Math.floor(seconds / 60);
  if (minutes < 60) return `${minutes} minute${minutes !== 1 ? 's' : ''} ago`;
  const hours = Math.floor(minutes / 60);
  if (hours < 24) return `${hours} hour${hours !== 1 ? 's' : ''} ago`;
  const days = Math.floor(hours / 24);
  if (days < 30) return `${days} day${days !== 1 ? 's' : ''} ago`;
  const months = Math.floor(days / 30);
  if (months < 12) return `${months} month${months !== 1 ? 's' : ''} ago`;
  const years = Math.floor(months / 12);
  return `${years} year${years !== 1 ? 's' : ''} ago`;
}

/**
 * Truncates a string to a specified length and adds an ellipsis if necessary.
 * @param str - The input string.
 * @param maxLength - The maximum length before truncation.
 * @returns The truncated string.
 */
export function truncateString(str: string, maxLength: number): string {
  if (str.length <= maxLength) {
    return str;
  }
  return str.substring(0, maxLength) + '...';
}

/**
 * Creates a unique identifier string (simple implementation based on timestamp and randomness).
 * Note: Use a more robust library like 'uuid' for critical applications.
 * @returns A simple UUID string.
 */
export function generateUniqueId(): string {
  return Math.random().toString(36).substring(2, 9) + Date.now().toString(36);
}

// Utility types often used across the application
export type ApiResponse<T> = {
  success: boolean;
  data: T;
  message?: string;
  error?: string;
};

// Simple debounce function for optimizing frequent calls (e.g., input handlers)
export function debounce<F extends (...args: any[]) => void>(func: F, delay: number): (...args: Parameters<F>) => void {
  let timeoutId: NodeJS.Timeout | null = null;

  return function(this: any, ...args: Parameters<F>) {
    const context = this;

    if (timeoutId) {
      clearTimeout(timeoutId);
    }

    timeoutId = setTimeout(() => {
      func.apply(context, args);
      timeoutId = null;
    }, delay);
  };
}
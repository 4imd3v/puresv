export type ToastTone = "info" | "success" | "warning" | "danger";

export interface ToastOptions {
  title: string;
  description?: string;
  tone?: ToastTone;
  /** Milliseconds before it dismisses itself; 0 keeps it until dismissed. */
  duration?: number;
}

export interface ToastItem extends ToastOptions {
  id: number;
}

export const toasts = $state<ToastItem[]>([]);

let nextId = 0;

export function toast(options: ToastOptions): number {
  const id = ++nextId;
  const duration = options.duration ?? 5000;
  toasts.push({ tone: "info", ...options, duration, id });
  if (typeof window !== "undefined" && duration > 0) {
    setTimeout(() => dismiss(id), duration);
  }
  return id;
}

export function dismiss(id: number) {
  const index = toasts.findIndex((item) => item.id === id);
  if (index !== -1) toasts.splice(index, 1);
}

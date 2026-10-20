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

interface Timer {
  remaining: number;
  started: number;
  timeout: ReturnType<typeof setTimeout> | null;
}

const timers = new Map<number, Timer>();
let nextId = 0;

export function toast(options: ToastOptions): number {
  const id = ++nextId;
  const duration = options.duration ?? 5000;
  toasts.push({ tone: "info", ...options, duration, id });
  if (typeof window !== "undefined" && duration > 0) {
    timers.set(id, {
      remaining: duration,
      started: Date.now(),
      timeout: setTimeout(() => dismiss(id), duration),
    });
  }
  return id;
}

/** Freeze a toast's countdown, e.g. while the pointer is over it. */
export function pause(id: number) {
  const timer = timers.get(id);
  if (!timer?.timeout) return;
  clearTimeout(timer.timeout);
  timer.timeout = null;
  timer.remaining = Math.max(0, timer.remaining - (Date.now() - timer.started));
}

/** Continue a paused countdown with whatever time was left. */
export function resume(id: number) {
  const timer = timers.get(id);
  if (!timer || timer.timeout) return;
  if (timer.remaining <= 0) {
    dismiss(id);
    return;
  }
  timer.started = Date.now();
  timer.timeout = setTimeout(() => dismiss(id), timer.remaining);
}

export function dismiss(id: number) {
  const timer = timers.get(id);
  if (timer?.timeout) clearTimeout(timer.timeout);
  timers.delete(id);
  const index = toasts.findIndex((item) => item.id === id);
  if (index !== -1) toasts.splice(index, 1);
}

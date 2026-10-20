import { render, screen, cleanup, fireEvent } from "@testing-library/svelte";
import { afterEach, describe, expect, it, vi } from "vite-plus/test";
import Toaster from "./Toaster.svelte";
import { dismiss, toast, toasts } from "../toast.svelte";

afterEach(() => {
  cleanup();
  toasts.splice(0, toasts.length);
  vi.useRealTimers();
});

describe("Toaster", () => {
  it("renders a toast with its title and description", () => {
    toast({ title: "Saved", description: "The file is up to date." });
    render(Toaster);
    expect(screen.getByText("Saved")).toBeTruthy();
    expect(screen.getByText("The file is up to date.")).toBeTruthy();
  });

  it("uses a passive role for info and an assertive one for problems", () => {
    toast({ title: "Saved", tone: "success" });
    toast({ title: "Upload failed", tone: "danger" });
    render(Toaster);
    expect(screen.getByRole("status").textContent).toContain("Saved");
    expect(screen.getByRole("alert").textContent).toContain("Upload failed");
  });

  it("dismisses a toast from its close button", async () => {
    toast({ title: "Saved" });
    render(Toaster);
    await fireEvent.click(screen.getByRole("button", { name: "Dismiss" }));
    expect(toasts.length).toBe(0);
  });

  it("dismisses itself after the duration", () => {
    vi.useFakeTimers();
    toast({ title: "Saved", duration: 1000 });
    expect(toasts.length).toBe(1);
    vi.advanceTimersByTime(1000);
    expect(toasts.length).toBe(0);
  });

  it("stays put when the duration is zero", () => {
    vi.useFakeTimers();
    toast({ title: "Saved", duration: 0 });
    vi.advanceTimersByTime(60_000);
    expect(toasts.length).toBe(1);
  });

  it("removes a toast by id", () => {
    const id = toast({ title: "Saved" });
    dismiss(id);
    expect(toasts.length).toBe(0);
  });
});

import { render, screen, cleanup } from "@testing-library/svelte";
import { createRawSnippet } from "svelte";
import { afterEach, describe, expect, it } from "vite-plus/test";
import Alert from "./Alert.svelte";

const text = (value: string) => createRawSnippet(() => ({ render: () => value }));

afterEach(cleanup);

describe("Alert", () => {
  it("renders its message", () => {
    render(Alert, { props: { children: text("Saved.") } });
    expect(screen.getByText("Saved.")).toBeTruthy();
  });

  it("defaults to the info tone and a status role", () => {
    render(Alert, { props: { children: text("Saved.") } });
    expect(screen.getByRole("status").dataset.tone).toBe("info");
  });

  // Guards against a typo in the Tone union silently rendering unstyled.
  it.each(["info", "success", "warning", "danger"] as const)("applies the %s tone", (tone) => {
    render(Alert, { props: { tone, children: text("Saved.") } });
    const role = tone === "danger" || tone === "warning" ? "alert" : "status";
    expect(screen.getByRole(role).dataset.tone).toBe(tone);
  });

  it("uses an assertive role for warnings and errors", () => {
    render(Alert, { props: { tone: "danger", children: text("Failed.") } });
    expect(screen.getByRole("alert")).toBeTruthy();
  });

  it("renders a title when given", () => {
    render(Alert, { props: { title: "Heads up", children: text("Saved.") } });
    expect(screen.getByText("Heads up")).toBeTruthy();
  });

  it("forwards native attributes", () => {
    render(Alert, { props: { children: text("Saved."), id: "note" } });
    expect(document.getElementById("note")).not.toBeNull();
  });
});

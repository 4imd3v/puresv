import { render, screen, cleanup, fireEvent, waitFor } from "@testing-library/svelte";
import { createRawSnippet } from "svelte";
import { afterEach, describe, expect, it } from "vite-plus/test";
import Popover from "./Popover.svelte";

type Descriptor = {
  onclick: (event: MouseEvent) => void;
  onkeydown: (event: KeyboardEvent) => void;
  "aria-expanded": boolean;
  "aria-controls": string;
};

let read: (() => Descriptor) | undefined;

const trigger = createRawSnippet<[Descriptor]>((get) => ({
  render: () => `<button>Filters</button>`,
  setup: (element) => {
    read = get as () => Descriptor;
    element.addEventListener("click", () => get().onclick(new MouseEvent("click")));
    element.addEventListener("keydown", (event) => get().onkeydown(event as KeyboardEvent));
  },
}));

const body = createRawSnippet(() => ({ render: () => "<p>Popover body</p>" }));

afterEach(cleanup);

describe("Popover", () => {
  it("starts collapsed and points the trigger at the panel", () => {
    render(Popover, { props: { trigger, children: body } });
    expect(read?.()["aria-expanded"]).toBe(false);
    expect(read?.()["aria-controls"]).toBeTruthy();
    expect(screen.queryByRole("dialog")).toBeNull();
  });

  it("opens a labelled dialog panel on click", async () => {
    render(Popover, { props: { trigger, children: body, label: "Filters" } });
    await fireEvent.click(screen.getByRole("button", { name: "Filters" }));
    const panel = await screen.findByRole("dialog", { name: "Filters" });
    expect(panel.textContent).toContain("Popover body");
    expect(panel.id).toBe(read?.()["aria-controls"]);
    expect(read?.()["aria-expanded"]).toBe(true);
  });

  it("closes on Escape", async () => {
    render(Popover, { props: { trigger, children: body } });
    await fireEvent.click(screen.getByRole("button", { name: "Filters" }));
    const panel = await screen.findByRole("dialog");
    await fireEvent.keyDown(panel, { key: "Escape" });
    await waitFor(() => expect(screen.queryByRole("dialog")).toBeNull());
  });

  it("closes on an outside press", async () => {
    render(Popover, { props: { trigger, children: body } });
    await fireEvent.click(screen.getByRole("button", { name: "Filters" }));
    await screen.findByRole("dialog");
    await fireEvent.pointerDown(document.body);
    await waitFor(() => expect(screen.queryByRole("dialog")).toBeNull());
  });

  it("positions when opened by the prop", async () => {
    render(Popover, { props: { trigger, children: body, open: true } });
    const panel = await screen.findByRole("dialog");
    expect(panel.hasAttribute("data-ready")).toBe(true);
  });

  it("exposes its side and align", async () => {
    render(Popover, { props: { trigger, children: body, side: "top", align: "end" } });
    await fireEvent.click(screen.getByRole("button", { name: "Filters" }));
    const panel = await screen.findByRole("dialog");
    expect(panel.getAttribute("data-side")).toBe("top");
    expect(panel.getAttribute("data-align")).toBe("end");
  });
});

import { render, screen, cleanup, fireEvent, waitFor } from "@testing-library/svelte";
import { createRawSnippet } from "svelte";
import { afterEach, describe, expect, it, vi } from "vite-plus/test";
import Dropdown from "./Dropdown.svelte";

type Descriptor = {
  onclick: (event: MouseEvent) => void;
  onkeydown: (event: KeyboardEvent) => void;
  "aria-haspopup": string;
  "aria-expanded": boolean;
};

// Keep the latest descriptor props so the test can read the trigger contract,
// which raw snippets cannot re-render.
let read: (() => Descriptor) | undefined;

const trigger = createRawSnippet<[Descriptor]>((get) => ({
  render: () => `<button>Open</button>`,
  setup: (element) => {
    read = get as () => Descriptor;
    element.addEventListener("click", () => get().onclick(new MouseEvent("click")));
    element.addEventListener("keydown", (event) => get().onkeydown(event as KeyboardEvent));
  },
}));

const items = [
  { id: "profile", label: "Profile" },
  { id: "settings", label: "Settings" },
  { id: "billing", label: "Billing", disabled: true },
];

afterEach(cleanup);

describe("Dropdown", () => {
  it("describes the trigger as a collapsed menu button", () => {
    render(Dropdown, { props: { items, trigger } });
    expect(read?.()["aria-haspopup"]).toBe("menu");
    expect(read?.()["aria-expanded"]).toBe(false);
    expect(screen.queryByRole("menu")).toBeNull();
  });

  it("opens a menu on click and reports the expanded state", async () => {
    render(Dropdown, { props: { items, trigger } });
    await fireEvent.click(screen.getByRole("button", { name: "Open" }));
    await waitFor(() => expect(screen.getByRole("menu")).toBeTruthy());
    expect(screen.getAllByRole("menuitem").length).toBe(3);
    expect(read?.()["aria-expanded"]).toBe(true);
  });

  it("calls onSelect with the item id and closes", async () => {
    const onSelect = vi.fn();
    render(Dropdown, { props: { items, trigger, onSelect } });
    await fireEvent.click(screen.getByRole("button", { name: "Open" }));
    await fireEvent.click(screen.getByRole("menuitem", { name: "Settings" }));
    expect(onSelect).toHaveBeenCalledWith("settings");
    await waitFor(() => expect(screen.queryByRole("menu")).toBeNull());
  });

  it("closes on Escape", async () => {
    render(Dropdown, { props: { items, trigger } });
    await fireEvent.click(screen.getByRole("button", { name: "Open" }));
    const item = screen.getByRole("menuitem", { name: "Profile" });
    item.focus();
    await fireEvent.keyDown(item, { key: "Escape" });
    await waitFor(() => expect(screen.queryByRole("menu")).toBeNull());
  });

  it("moves focus with the arrow keys", async () => {
    render(Dropdown, { props: { items, trigger } });
    await fireEvent.click(screen.getByRole("button", { name: "Open" }));
    const [first] = screen.getAllByRole("menuitem");
    first.focus();
    await fireEvent.keyDown(first, { key: "ArrowDown" });
    expect(document.activeElement?.textContent).toBe("Settings");
  });

  it("aligns the menu to the end", () => {
    const { container } = render(Dropdown, { props: { items, trigger, align: "end" } });
    expect(container.querySelector(".dropdown")?.getAttribute("data-align")).toBe("end");
  });
});

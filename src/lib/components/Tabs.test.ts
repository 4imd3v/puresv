import { render, screen, cleanup, fireEvent, waitFor } from "@testing-library/svelte";
import { createRawSnippet } from "svelte";
import { afterEach, describe, expect, it } from "vite-plus/test";
import Tabs from "./Tabs.svelte";

const tabs = [
  { id: "home", label: "Home" },
  { id: "profile", label: "Profile" },
];
const panel = createRawSnippet(() => ({ render: () => "Panel" }));

afterEach(cleanup);

describe("Tabs", () => {
  it("renders the tabs with the first active", () => {
    render(Tabs, { props: { tabs, panel } });
    const els = screen.getAllByRole("tab");
    expect(els.length).toBe(2);
    expect(els[0].getAttribute("aria-selected")).toBe("true");
    expect(els[1].getAttribute("aria-selected")).toBe("false");
  });

  it("renders the panel", () => {
    render(Tabs, { props: { tabs, panel } });
    expect(screen.getByRole("tabpanel")).toBeTruthy();
    expect(screen.getByText("Panel")).toBeTruthy();
  });

  it("links the panel to the active tab", () => {
    render(Tabs, { props: { tabs, panel } });
    const [first] = screen.getAllByRole("tab");
    const tabpanel = screen.getByRole("tabpanel");
    expect(tabpanel.getAttribute("aria-labelledby")).toBe(first.id);
    expect(first.getAttribute("aria-controls")).toBe(tabpanel.id);
  });

  it("switches the active tab on click", async () => {
    render(Tabs, { props: { tabs, panel } });
    await fireEvent.click(screen.getByText("Profile"));
    const els = screen.getAllByRole("tab");
    expect(els[0].getAttribute("aria-selected")).toBe("false");
    expect(els[1].getAttribute("aria-selected")).toBe("true");
  });

  it("moves selection with arrow keys", async () => {
    render(Tabs, { props: { tabs, panel } });
    await fireEvent.keyDown(screen.getAllByRole("tab")[0], { key: "ArrowRight" });
    await waitFor(() =>
      expect(screen.getAllByRole("tab")[1].getAttribute("aria-selected")).toBe("true"),
    );
  });
});

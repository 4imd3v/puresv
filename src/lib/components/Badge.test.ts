import { render, screen, cleanup } from "@testing-library/svelte";
import { createRawSnippet } from "svelte";
import { afterEach, describe, expect, it } from "vite-plus/test";
import Badge from "./Badge.svelte";

// Svelte 5 snippets render into an anchor node, so tests must build them with
// `createRawSnippet` instead of passing a plain function.
const text = (value: string) => createRawSnippet(() => ({ render: () => value }));

afterEach(cleanup);

describe("Badge", () => {
  it("renders its children", () => {
    render(Badge, { props: { children: text("paid") } });
    expect(screen.getByText("paid")).toBeTruthy();
  });

  it("defaults to the neutral tone", () => {
    render(Badge, { props: { children: text("paid") } });
    expect(screen.getByText("paid").dataset.tone).toBe("neutral");
  });

  // Guards against a typo in the Tone union silently rendering unstyled.
  it.each(["neutral", "accent", "success", "warning", "danger"] as const)(
    "applies the %s tone",
    (tone) => {
      render(Badge, { props: { tone, children: text("paid") } });
      expect(screen.getByText("paid").dataset.tone).toBe(tone);
    },
  );

  it("forwards native span attributes", () => {
    render(Badge, { props: { children: text("paid"), title: "Payment status" } });
    expect(screen.getByText("paid").getAttribute("title")).toBe("Payment status");
  });

  it("renders a status dot when dot is set", () => {
    const { container } = render(Badge, { props: { dot: true, children: text("live") } });
    expect(container.querySelector(".dot")).not.toBeNull();
  });
});

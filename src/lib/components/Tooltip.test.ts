import { render, screen, cleanup } from "@testing-library/svelte";
import { createRawSnippet } from "svelte";
import { afterEach, describe, expect, it } from "vite-plus/test";
import Tooltip from "./Tooltip.svelte";

// createRawSnippet receives one getter per snippet prop.
const trigger = createRawSnippet<[{ "aria-describedby": string }]>((getProps) => ({
  render: () => `<button aria-describedby="${getProps()["aria-describedby"]}">Copy</button>`,
}));

afterEach(cleanup);

describe("Tooltip", () => {
  it("renders a tooltip with its label", () => {
    render(Tooltip, { props: { label: "Copy to clipboard", trigger } });
    const tip = screen.getByRole("tooltip");
    expect(tip.textContent).toBe("Copy to clipboard");
    expect(tip.id).toBeTruthy();
  });

  it("describes the trigger with the tooltip id", () => {
    render(Tooltip, { props: { label: "Copy", trigger } });
    const button = screen.getByRole("button");
    expect(button.getAttribute("aria-describedby")).toBe(screen.getByRole("tooltip").id);
  });

  it("defaults to the top placement", () => {
    const { container } = render(Tooltip, { props: { label: "Copy", trigger } });
    expect(container.querySelector(".tooltip")?.getAttribute("data-placement")).toBe("top");
  });

  it("supports the bottom placement", () => {
    const { container } = render(Tooltip, {
      props: { label: "Copy", trigger, placement: "bottom" },
    });
    expect(container.querySelector(".tooltip")?.getAttribute("data-placement")).toBe("bottom");
  });
});

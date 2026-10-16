import { render, screen, cleanup } from "@testing-library/svelte";
import { afterEach, describe, expect, it } from "vite-plus/test";
import Separator from "./Separator.svelte";

afterEach(cleanup);

describe("Separator", () => {
  it("renders a horizontal separator by default", () => {
    const { container } = render(Separator, {});
    const sep = container.querySelector(".separator") as HTMLElement;
    expect(sep.getAttribute("data-orientation")).toBe("horizontal");
    expect(sep.getAttribute("role")).toBe("separator");
  });

  it("supports vertical orientation", () => {
    const { container } = render(Separator, { props: { orientation: "vertical" } });
    expect(container.querySelector(".separator")?.getAttribute("data-orientation")).toBe(
      "vertical",
    );
  });

  it("renders a label with flanking lines", () => {
    const { container } = render(Separator, { props: { label: "OR" } });
    expect(container.querySelector(".separator")?.classList.contains("labeled")).toBe(true);
    expect(container.querySelectorAll(".line").length).toBe(2);
    expect(screen.getByText("OR")).toBeTruthy();
  });

  it("forwards native attributes", () => {
    const { container } = render(Separator, { props: { class: "my-4" } });
    expect(container.querySelector(".separator")?.classList.contains("my-4")).toBe(true);
  });
});

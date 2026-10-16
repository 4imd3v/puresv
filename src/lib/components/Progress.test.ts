import { render, screen, cleanup } from "@testing-library/svelte";
import { afterEach, describe, expect, it } from "vite-plus/test";
import Progress from "./Progress.svelte";

afterEach(cleanup);

describe("Progress", () => {
  it("exposes progressbar semantics", () => {
    render(Progress, { props: { value: 30, max: 100, label: "Upload" } });
    const bar = screen.getByRole("progressbar");
    expect(bar.getAttribute("aria-valuenow")).toBe("30");
    expect(bar.getAttribute("aria-valuemin")).toBe("0");
    expect(bar.getAttribute("aria-valuemax")).toBe("100");
  });

  it("scales the fill to the fraction", () => {
    const { container } = render(Progress, { props: { value: 30, max: 100 } });
    const fill = container.querySelector(".fill") as HTMLElement;
    expect(fill.style.transform).toBe("scaleX(0.3)");
  });

  it("clamps out-of-range values", () => {
    const { container } = render(Progress, { props: { value: 150, max: 100 } });
    const bar = screen.getByRole("progressbar");
    expect(bar.getAttribute("aria-valuenow")).toBe("100");
    expect((container.querySelector(".fill") as HTMLElement).style.transform).toBe("scaleX(1)");
  });

  it("treats a zero max as empty", () => {
    const { container } = render(Progress, { props: { value: 5, max: 0 } });
    expect((container.querySelector(".fill") as HTMLElement).style.transform).toBe("scaleX(0)");
  });
});

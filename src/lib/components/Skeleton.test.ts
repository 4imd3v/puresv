import { render, cleanup } from "@testing-library/svelte";
import { afterEach, describe, expect, it } from "vite-plus/test";
import Skeleton from "./Skeleton.svelte";

afterEach(cleanup);

describe("Skeleton", () => {
  it("renders a decorative placeholder", () => {
    const { container } = render(Skeleton, {});
    const el = container.querySelector(".skeleton") as HTMLElement;
    expect(el).toBeTruthy();
    expect(el.getAttribute("aria-hidden")).toBe("true");
  });

  it("applies width and height", () => {
    const { container } = render(Skeleton, { props: { width: "200px", height: "2rem" } });
    const el = container.querySelector(".skeleton") as HTMLElement;
    expect(el.style.width).toBe("200px");
    expect(el.style.height).toBe("2rem");
  });

  it("renders a circle when circle is set", () => {
    const { container } = render(Skeleton, { props: { circle: true } });
    expect(container.querySelector(".skeleton")?.classList.contains("circle")).toBe(true);
  });

  it("forwards native attributes", () => {
    const { container } = render(Skeleton, { props: { class: "mt-4", "data-testid": "sk" } });
    const el = container.querySelector(".skeleton") as HTMLElement;
    expect(el.classList.contains("mt-4")).toBe(true);
    expect(el.getAttribute("data-testid")).toBe("sk");
  });
});

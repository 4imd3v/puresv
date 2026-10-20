import { render, screen, cleanup } from "@testing-library/svelte";
import { afterEach, describe, expect, it } from "vite-plus/test";
import Stat from "./Stat.svelte";

afterEach(cleanup);

describe("Stat", () => {
  it("renders a label and value", () => {
    render(Stat, { props: { label: "Revenue", value: "$12,400" } });
    expect(screen.getByText("Revenue")).toBeTruthy();
    expect(screen.getByText("$12,400")).toBeTruthy();
  });

  it("renders the delta with its tone", () => {
    render(Stat, {
      props: { label: "Revenue", value: "$12,400", delta: "+12%", tone: "positive" },
    });
    const delta = screen.getByText("+12%");
    expect(delta.getAttribute("data-tone")).toBe("positive");
  });

  it("forwards class and native attributes", () => {
    const { container } = render(Stat, {
      props: { label: "Revenue", value: "$1", class: "kpi", id: "revenue" },
    });
    const root = container.querySelector(".stat") as HTMLElement;
    expect(root.id).toBe("revenue");
    expect(root.classList.contains("kpi")).toBe(true);
  });
});

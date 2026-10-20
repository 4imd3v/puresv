import { render, screen, cleanup } from "@testing-library/svelte";
import { afterEach, describe, expect, it } from "vite-plus/test";
import DescriptionList from "./DescriptionList.svelte";

const items = [
  { term: "Plan", description: "Pro" },
  { term: "Billing", description: "Yearly" },
];

afterEach(cleanup);

describe("DescriptionList", () => {
  it("renders a term and description per row", () => {
    render(DescriptionList, { props: { items } });
    expect(screen.getByText("Plan")).toBeTruthy();
    expect(screen.getByText("Pro")).toBeTruthy();
    expect(screen.getByText("Billing")).toBeTruthy();
  });

  it("forwards class and native attributes", () => {
    const { container } = render(DescriptionList, {
      props: { items, class: "details", id: "meta" },
    });
    const root = container.querySelector("dl") as HTMLElement;
    expect(root.id).toBe("meta");
    expect(root.classList.contains("details")).toBe(true);
  });
});

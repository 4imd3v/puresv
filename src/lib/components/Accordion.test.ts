import { render, screen, cleanup, fireEvent } from "@testing-library/svelte";
import { createRawSnippet } from "svelte";
import { afterEach, describe, expect, it } from "vite-plus/test";
import Accordion from "./Accordion.svelte";

const items = [
  { id: "a", title: "First", content: "First body" },
  { id: "b", title: "Second", content: "Second body" },
];

afterEach(cleanup);

describe("Accordion", () => {
  it("renders all items", () => {
    const { container } = render(Accordion, { props: { items } });
    expect(container.querySelectorAll("details").length).toBe(2);
    expect(screen.getByText("First")).toBeTruthy();
    expect(screen.getByText("Second")).toBeTruthy();
  });

  it("toggles an item open on click", async () => {
    const { container } = render(Accordion, { props: { items } });
    await fireEvent.click(screen.getByText("First"));
    expect((container.querySelector("details") as HTMLDetailsElement).open).toBe(true);
  });

  it("forwards native attributes", () => {
    const { container } = render(Accordion, { props: { items, class: "x" } });
    expect(container.querySelector(".accordion")?.classList.contains("x")).toBe(true);
  });

  it("accepts a snippet as the content", () => {
    const markup = createRawSnippet(() => ({ render: () => "<strong>Rich body</strong>" }));
    render(Accordion, {
      props: { items: [{ id: "a", title: "First", content: markup }] },
    });
    expect(screen.getByText("Rich body").tagName).toBe("STRONG");
  });
});

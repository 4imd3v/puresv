import { render, screen, cleanup } from "@testing-library/svelte";
import { createRawSnippet } from "svelte";
import { afterEach, describe, expect, it } from "vite-plus/test";
import Card from "./Card.svelte";

// Svelte 5 snippets render into an anchor node, so tests must build them with
// `createRawSnippet` instead of passing a plain function.
const text = (value: string) => createRawSnippet(() => ({ render: () => value }));

afterEach(cleanup);

describe("Card", () => {
  it("renders its body", () => {
    render(Card, { props: { children: text("Body") } });
    expect(screen.getByText("Body")).toBeTruthy();
  });

  it("omits header and footer when the snippets are absent", () => {
    const { container } = render(Card, { props: { children: text("Body") } });
    expect(container.querySelector("header")).toBeNull();
    expect(container.querySelector("footer")).toBeNull();
  });

  it("renders header and footer when the snippets are given", () => {
    render(Card, {
      props: {
        children: text("Body"),
        header: text("Head"),
        footer: text("Foot"),
      },
    });
    expect(screen.getByText("Head")).toBeTruthy();
    expect(screen.getByText("Foot")).toBeTruthy();
  });

  it("forwards native div attributes", () => {
    render(Card, { props: { children: text("Body"), id: "report", class: "wide" } });
    const card = document.getElementById("report");
    expect(card).not.toBeNull();
    expect(card?.classList.contains("wide")).toBe(true);
  });
});

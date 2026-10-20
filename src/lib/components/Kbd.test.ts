import { render, screen, cleanup } from "@testing-library/svelte";
import { createRawSnippet } from "svelte";
import { afterEach, describe, expect, it } from "vite-plus/test";
import Kbd from "./Kbd.svelte";

const text = (value: string) => createRawSnippet(() => ({ render: () => value }));

afterEach(cleanup);

describe("Kbd", () => {
  it("renders its children in a kbd element", () => {
    render(Kbd, { props: { children: text("Ctrl") } });
    expect(screen.getByText("Ctrl").tagName).toBe("KBD");
  });

  it("forwards native attributes and class", () => {
    render(Kbd, { props: { children: text("K"), id: "key", class: "wide" } });
    const key = screen.getByText("K");
    expect(key.id).toBe("key");
    expect(key.classList.contains("wide")).toBe(true);
  });
});

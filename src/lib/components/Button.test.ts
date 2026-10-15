import { render, screen, cleanup } from "@testing-library/svelte";
import { createRawSnippet } from "svelte";
import { afterEach, describe, expect, it } from "vite-plus/test";
import Button from "./Button.svelte";

// Svelte 5 snippets render into an anchor node, so tests must build them with
// `createRawSnippet` instead of passing a plain function.
const text = (value: string) => createRawSnippet(() => ({ render: () => value }));

afterEach(cleanup);

describe("Button", () => {
  it("renders its children", () => {
    render(Button, { props: { children: text("Save") } });
    expect(screen.getByRole("button").textContent).toBe("Save");
  });

  it("defaults to the solid variant and md size", () => {
    render(Button, { props: { children: text("Save") } });
    const button = screen.getByRole("button");
    expect(button.dataset.variant).toBe("solid");
    expect(button.dataset.size).toBe("md");
  });

  it("forwards native button attributes", () => {
    render(Button, {
      props: { children: text("Save"), type: "submit", disabled: true },
    });
    const button = screen.getByRole("button") as HTMLButtonElement;
    expect(button.type).toBe("submit");
    expect(button.disabled).toBe(true);
  });
});

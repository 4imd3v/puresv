import { render, screen, cleanup } from "@testing-library/svelte";
import { createRawSnippet } from "svelte";
import { afterEach, describe, expect, it } from "vite-plus/test";
import EmptyState from "./EmptyState.svelte";

afterEach(cleanup);

describe("EmptyState", () => {
  it("renders a title and description", () => {
    render(EmptyState, { props: { title: "No results", description: "Try another search." } });
    expect(screen.getByRole("heading", { name: "No results", level: 3 })).toBeTruthy();
    expect(screen.getByText("Try another search.")).toBeTruthy();
  });

  it("renders an optional icon and action", () => {
    const icon = createRawSnippet(() => ({ render: () => "<svg></svg>" }));
    const action = createRawSnippet(() => ({ render: () => "<button>Clear</button>" }));
    const { container } = render(EmptyState, {
      props: { title: "No results", icon, action },
    });
    expect(container.querySelector(".icon svg")).toBeTruthy();
    expect(screen.getByRole("button", { name: "Clear" })).toBeTruthy();
  });

  it("respects the heading level", () => {
    render(EmptyState, { props: { title: "No results", level: 2 } });
    expect(screen.getByRole("heading", { level: 2 }).textContent).toBe("No results");
  });
});

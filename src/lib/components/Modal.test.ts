import { render, screen, cleanup } from "@testing-library/svelte";
import { createRawSnippet } from "svelte";
import { afterEach, describe, expect, it } from "vite-plus/test";
import Modal from "./Modal.svelte";

const text = (value: string) => createRawSnippet(() => ({ render: () => value }));

afterEach(cleanup);

describe("Modal", () => {
  it("renders its title, body and a close control", () => {
    const { container } = render(Modal, {
      props: { open: true, title: "Confirm", children: text("Delete this?") },
    });
    expect(screen.getByText("Confirm")).toBeTruthy();
    expect(screen.getByText("Delete this?")).toBeTruthy();
    expect(container.querySelector("button.close")).toBeTruthy();
    // The heading names the dialog for assistive tech.
    expect(container.querySelector("dialog")?.getAttribute("aria-labelledby")).toBe(
      screen.getByRole("heading", { name: "Confirm" }).id,
    );
  });

  it("renders without a title", () => {
    const { container } = render(Modal, { props: { open: true, children: text("Body") } });
    expect(screen.getByText("Body")).toBeTruthy();
    expect(container.querySelector("button.close")).toBeTruthy();
  });

  it("forwards native attributes", () => {
    const { container } = render(Modal, {
      props: { open: true, children: text("Body"), id: "dlg" },
    });
    expect(container.querySelector("dialog")?.id).toBe("dlg");
  });
});

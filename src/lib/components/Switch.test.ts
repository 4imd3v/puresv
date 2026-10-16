import { render, screen, cleanup, fireEvent } from "@testing-library/svelte";
import { afterEach, describe, expect, it } from "vite-plus/test";
import Switch from "./Switch.svelte";

afterEach(cleanup);

describe("Switch", () => {
  it("exposes switch semantics and its label", () => {
    render(Switch, { props: { label: "Notifications" } });
    const toggle = screen.getByRole("switch") as HTMLInputElement;
    expect(toggle.checked).toBe(false);
    expect(screen.getByText("Notifications")).toBeTruthy();
  });

  it("toggles when clicked", async () => {
    render(Switch, { props: { label: "Notifications" } });
    const toggle = screen.getByRole("switch") as HTMLInputElement;
    await fireEvent.click(toggle);
    expect(toggle.checked).toBe(true);
  });

  it("forwards the disabled state", () => {
    render(Switch, { props: { label: "Notifications", disabled: true } });
    expect((screen.getByRole("switch") as HTMLInputElement).disabled).toBe(true);
  });
});

import { render, screen, cleanup, fireEvent } from "@testing-library/svelte";
import { afterEach, describe, expect, it } from "vite-plus/test";
import Checkbox from "./Checkbox.svelte";

afterEach(cleanup);

describe("Checkbox", () => {
  it("renders its label and a checkbox", () => {
    render(Checkbox, { props: { label: "Accept the terms" } });
    expect(screen.getByText("Accept the terms")).toBeTruthy();
    expect(screen.getByRole("checkbox")).toBeTruthy();
  });

  it("toggles when clicked", async () => {
    render(Checkbox, { props: { label: "Accept the terms" } });
    const box = screen.getByRole("checkbox") as HTMLInputElement;
    expect(box.checked).toBe(false);
    await fireEvent.click(box);
    expect(box.checked).toBe(true);
  });

  it("forwards the disabled state", () => {
    render(Checkbox, { props: { label: "Accept the terms", disabled: true } });
    expect((screen.getByRole("checkbox") as HTMLInputElement).disabled).toBe(true);
  });
});

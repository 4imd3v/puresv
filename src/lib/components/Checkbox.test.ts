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

  it("sets the native indeterminate property and clears it on change", async () => {
    const { container } = render(Checkbox, {
      props: { label: "Select all", indeterminate: true },
    });
    const input = screen.getByLabelText("Select all") as HTMLInputElement;
    expect(input.indeterminate).toBe(true);
    expect(container.querySelector(".checkbox")?.hasAttribute("data-indeterminate")).toBe(true);

    await fireEvent.change(input);
    expect(container.querySelector(".checkbox")?.hasAttribute("data-indeterminate")).toBe(false);
    expect(input.indeterminate).toBe(false);
  });

  it("forwards the disabled state", () => {
    render(Checkbox, { props: { label: "Accept the terms", disabled: true } });
    expect((screen.getByRole("checkbox") as HTMLInputElement).disabled).toBe(true);
  });
});

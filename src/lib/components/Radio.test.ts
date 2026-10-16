import { render, screen, cleanup, fireEvent } from "@testing-library/svelte";
import { afterEach, describe, expect, it } from "vite-plus/test";
import Radio from "./Radio.svelte";

afterEach(cleanup);

describe("Radio", () => {
  it("renders a radio with its label", () => {
    render(Radio, { props: { label: "Free", value: "free" } });
    expect(screen.getByRole("radio")).toBeTruthy();
    expect(screen.getByText("Free")).toBeTruthy();
  });

  it("checks when clicked", async () => {
    render(Radio, { props: { label: "Free", value: "free" } });
    const radio = screen.getByRole("radio") as HTMLInputElement;
    expect(radio.checked).toBe(false);
    await fireEvent.click(radio);
    expect(radio.checked).toBe(true);
  });

  it("forwards the value and disabled state", () => {
    render(Radio, { props: { label: "Free", value: "free", disabled: true } });
    const radio = screen.getByRole("radio") as HTMLInputElement;
    expect(radio.value).toBe("free");
    expect(radio.disabled).toBe(true);
  });
});

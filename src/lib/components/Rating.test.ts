import { render, screen, cleanup, fireEvent } from "@testing-library/svelte";
import { afterEach, describe, expect, it } from "vite-plus/test";
import Rating from "./Rating.svelte";

afterEach(cleanup);

describe("Rating", () => {
  it("renders a radiogroup of stars", () => {
    render(Rating, { props: { label: "Quality" } });
    expect(screen.getByRole("radiogroup", { name: "Quality" })).toBeTruthy();
    expect(screen.getAllByRole("radio").length).toBe(5);
    expect(screen.getByLabelText("1 star")).toBeTruthy();
  });

  it("checks the selected value", () => {
    render(Rating, { props: { label: "Quality", value: 3 } });
    expect((screen.getByLabelText("3 stars") as HTMLInputElement).checked).toBe(true);
    expect((screen.getByLabelText("4 stars") as HTMLInputElement).checked).toBe(false);
  });

  it("updates the value on click", async () => {
    render(Rating, { props: { label: "Quality" } });
    await fireEvent.click(screen.getByLabelText("4 stars"));
    expect((screen.getByLabelText("4 stars") as HTMLInputElement).checked).toBe(true);
  });

  it("disables the inputs when readonly", () => {
    render(Rating, { props: { label: "Quality", value: 2, readonly: true } });
    expect((screen.getByLabelText("2 stars") as HTMLInputElement).disabled).toBe(true);
  });
});

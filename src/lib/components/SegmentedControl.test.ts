import { render, screen, cleanup, fireEvent } from "@testing-library/svelte";
import { afterEach, describe, expect, it } from "vite-plus/test";
import SegmentedControl from "./SegmentedControl.svelte";

const options = [
  { value: "day", label: "Day" },
  { value: "week", label: "Week" },
  { value: "month", label: "Month" },
];

afterEach(cleanup);

describe("SegmentedControl", () => {
  it("renders one radio per option with the first selected", () => {
    render(SegmentedControl, { props: { options, "aria-label": "Range" } });
    const radios = screen.getAllByRole("radio");
    expect(radios.length).toBe(3);
    expect(radios[0].getAttribute("aria-checked")).toBe("true");
    expect(screen.getByRole("radiogroup", { name: "Range" })).toBeTruthy();
  });

  it("renders one decorative ink indicator behind the segments", () => {
    render(SegmentedControl, { props: { options } });
    const group = screen.getByRole("radiogroup");
    const indicators = group.querySelectorAll(":scope > .indicator");
    expect(indicators.length).toBe(1);
    expect(indicators[0].getAttribute("aria-hidden")).toBe("true");
  });

  it("selects on click", async () => {
    render(SegmentedControl, { props: { options } });
    await fireEvent.click(screen.getByRole("radio", { name: "Week" }));
    expect(screen.getByRole("radio", { name: "Week" }).getAttribute("aria-checked")).toBe("true");
    expect(screen.getByRole("radio", { name: "Day" }).getAttribute("aria-checked")).toBe("false");
  });

  it("moves the selection with arrow keys and skips disabled options", async () => {
    render(SegmentedControl, {
      props: { options: [options[0], { ...options[1], disabled: true }, options[2]] },
    });
    await fireEvent.keyDown(screen.getByRole("radio", { name: "Day" }), { key: "ArrowRight" });
    expect(screen.getByRole("radio", { name: "Month" }).getAttribute("aria-checked")).toBe("true");
  });
});

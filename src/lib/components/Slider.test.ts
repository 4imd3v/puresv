import { render, screen, cleanup } from "@testing-library/svelte";
import { afterEach, describe, expect, it } from "vite-plus/test";
import Slider from "./Slider.svelte";

afterEach(cleanup);

describe("Slider", () => {
  it("associates the label with the range input", () => {
    render(Slider, { props: { label: "Volume" } });
    const input = screen.getByLabelText("Volume") as HTMLInputElement;
    expect(input.type).toBe("range");
  });

  it("forwards native range attributes", () => {
    render(Slider, { props: { label: "Volume", min: 0, max: 50, step: 5, name: "volume" } });
    const input = screen.getByLabelText("Volume") as HTMLInputElement;
    expect(input.min).toBe("0");
    expect(input.max).toBe("50");
    expect(input.step).toBe("5");
    expect(input.name).toBe("volume");
  });

  it("paints the fill from the value", () => {
    render(Slider, { props: { label: "Volume", min: 0, max: 200, value: 50 } });
    const input = screen.getByLabelText("Volume") as HTMLInputElement;
    expect(input.style.getPropertyValue("--puresv-slider-fill")).toBe("25%");
  });

  it("clamps the fill when the value is outside the range", () => {
    render(Slider, { props: { label: "Volume", min: 0, max: 100, value: 150 } });
    const input = screen.getByLabelText("Volume") as HTMLInputElement;
    expect(input.style.getPropertyValue("--puresv-slider-fill")).toBe("100%");
  });
});

import { render, screen, cleanup } from "@testing-library/svelte";
import { afterEach, describe, expect, it } from "vite-plus/test";
import Spinner from "./Spinner.svelte";

afterEach(cleanup);

describe("Spinner", () => {
  it("exposes a status with an accessible label", () => {
    render(Spinner, {});
    expect(screen.getByRole("status").getAttribute("aria-label")).toBe("Loading");
  });

  it.each(["sm", "md", "lg"] as const)("applies the %s size", (size) => {
    render(Spinner, { props: { size } });
    expect(screen.getByRole("status").dataset.size).toBe(size);
  });

  it("accepts a custom label", () => {
    render(Spinner, { props: { label: "Saving" } });
    expect(screen.getByRole("status").getAttribute("aria-label")).toBe("Saving");
  });
});

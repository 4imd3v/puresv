import { render, screen, cleanup } from "@testing-library/svelte";
import { createRawSnippet } from "svelte";
import { afterEach, describe, expect, it } from "vite-plus/test";
import Select from "./Select.svelte";

// Options are children, so build them with createRawSnippet.
const options = createRawSnippet(() => ({
  render: () => '<option value="us">United States</option><option value="ca">Canada</option>',
}));

afterEach(cleanup);

describe("Select", () => {
  it("associates the label with the select", () => {
    render(Select, { props: { label: "Country", children: options } });
    expect(screen.getByLabelText("Country")).toBeTruthy();
  });

  it("renders its children", () => {
    render(Select, { props: { label: "Country", children: options } });
    const select = screen.getByLabelText("Country") as HTMLSelectElement;
    expect(select.textContent).toContain("United States");
  });

  it("marks invalid and shows the message in the error state", () => {
    render(Select, { props: { label: "Country", error: "Required", children: options } });
    const select = screen.getByLabelText("Country") as HTMLSelectElement;
    expect(select.getAttribute("aria-invalid")).toBe("true");
    expect(screen.getByText("Required")).toBeTruthy();
  });
});

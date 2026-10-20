import { render, screen, cleanup } from "@testing-library/svelte";
import { createRawSnippet } from "svelte";
import { afterEach, describe, expect, it } from "vite-plus/test";
import Field from "./Field.svelte";

// Raw snippet params are getters, one per snippet parameter.
const control = createRawSnippet<[string | undefined]>((getErrorId) => ({
  render: () => {
    const id = getErrorId();
    return `<input ${id ? `aria-describedby="${id}"` : ""} />`;
  },
}));

afterEach(cleanup);

describe("Field", () => {
  it("associates the label with the control", () => {
    render(Field, { props: { label: "Email", children: control } });
    expect(screen.getByLabelText("Email")).toBeTruthy();
  });

  it("gives the error an id and passes it to the control", () => {
    const { container } = render(Field, {
      props: { label: "Email", error: "Required", children: control },
    });
    const message = screen.getByText("Required");
    const input = screen.getByLabelText("Email") as HTMLInputElement;
    expect(input.getAttribute("aria-describedby")).toBe(message.id);
    expect(container.querySelector(".field")?.hasAttribute("data-error")).toBe(true);
  });

  it("passes no id when there is no error", () => {
    render(Field, { props: { label: "Email", children: control } });
    expect(screen.getByLabelText("Email").getAttribute("aria-describedby")).toBeNull();
  });
});

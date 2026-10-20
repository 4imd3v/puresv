import { render, screen, cleanup } from "@testing-library/svelte";
import { afterEach, describe, expect, it } from "vite-plus/test";
import Input from "./Input.svelte";

afterEach(cleanup);

describe("Input", () => {
  it("associates the label with the input", () => {
    render(Input, { props: { label: "Email" } });
    expect(screen.getByLabelText("Email")).toBeTruthy();
  });

  it("forwards native input attributes", () => {
    render(Input, {
      props: { label: "Email", type: "email", placeholder: "you@example.com", name: "email" },
    });
    const input = screen.getByLabelText("Email") as HTMLInputElement;
    expect(input.type).toBe("email");
    expect(input.placeholder).toBe("you@example.com");
    expect(input.name).toBe("email");
  });

  it("marks the input invalid and shows the message in the error state", () => {
    render(Input, { props: { label: "Email", error: "Required" } });
    const input = screen.getByLabelText("Email") as HTMLInputElement;
    expect(input.getAttribute("aria-invalid")).toBe("true");
    expect(screen.getByText("Required")).toBeTruthy();
    // The message must be announced with the field, not just shown.
    expect(input.getAttribute("aria-describedby")).toBe(screen.getByText("Required").id);
  });

  it("is not marked invalid by default", () => {
    render(Input, { props: { label: "Email" } });
    const input = screen.getByLabelText("Email") as HTMLInputElement;
    expect(input.hasAttribute("aria-invalid")).toBe(false);
  });
});

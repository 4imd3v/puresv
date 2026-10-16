import { render, screen, cleanup } from "@testing-library/svelte";
import { afterEach, describe, expect, it } from "vite-plus/test";
import Textarea from "./Textarea.svelte";

afterEach(cleanup);

describe("Textarea", () => {
  it("associates the label with the textarea", () => {
    render(Textarea, { props: { label: "Notes" } });
    expect(screen.getByLabelText("Notes")).toBeTruthy();
  });

  it("forwards native textarea attributes", () => {
    render(Textarea, {
      props: { label: "Notes", placeholder: "Add a note", rows: 4, name: "notes" },
    });
    const ta = screen.getByLabelText("Notes") as HTMLTextAreaElement;
    expect(ta.placeholder).toBe("Add a note");
    expect(ta.getAttribute("rows")).toBe("4");
    expect(ta.name).toBe("notes");
  });

  it("marks invalid and shows the message in the error state", () => {
    render(Textarea, { props: { label: "Notes", error: "Too short" } });
    const ta = screen.getByLabelText("Notes") as HTMLTextAreaElement;
    expect(ta.getAttribute("aria-invalid")).toBe("true");
    expect(screen.getByText("Too short")).toBeTruthy();
  });
});

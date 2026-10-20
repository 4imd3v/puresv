import { render, screen, cleanup } from "@testing-library/svelte";
import { createRawSnippet } from "svelte";
import { afterEach, describe, expect, it } from "vite-plus/test";
import Table from "./Table.svelte";

// A raw snippet must render one root element, so the test supplies the body only.
const body = createRawSnippet(() => ({
  render: () => `
    <tbody>
      <tr><th scope="row">Ada</th><td>Engineer</td></tr>
    </tbody>
  `,
}));

afterEach(cleanup);

describe("Table", () => {
  it("renders the caption and rows", () => {
    render(Table, { props: { caption: "Team", children: body } });
    expect(screen.getByText("Team")).toBeTruthy();
    expect(screen.getByRole("table", { name: "Team" })).toBeTruthy();
    expect(screen.getByText("Ada")).toBeTruthy();
  });

  it("forwards native table attributes", () => {
    render(Table, { props: { id: "team", children: body } });
    expect(screen.getByRole("table").id).toBe("team");
  });

  it("puts the class on the scroll wrapper", () => {
    const { container } = render(Table, { props: { class: "wide", children: body } });
    expect(container.querySelector(".table")?.classList.contains("wide")).toBe(true);
  });
});

import { render, screen, cleanup, fireEvent, waitFor } from "@testing-library/svelte";
import { afterEach, describe, expect, it } from "vite-plus/test";
import Pagination from "./Pagination.svelte";

afterEach(cleanup);

describe("Pagination", () => {
  it("renders nothing for a single page", () => {
    const { container } = render(Pagination, { props: { pages: 1 } });
    expect(container.querySelector("nav")).toBeNull();
  });

  it("renders a labelled navigation landmark", () => {
    render(Pagination, { props: { pages: 10 } });
    expect(screen.getByRole("navigation", { name: "Pagination" })).toBeTruthy();
  });

  it("marks the current page and collapses the rest", () => {
    const { container } = render(Pagination, { props: { pages: 10, page: 5 } });
    expect(screen.getByRole("button", { name: "Page 5" }).getAttribute("aria-current")).toBe(
      "page",
    );
    // 1 … 4 5 6 … 10
    expect(container.querySelectorAll(".gap").length).toBe(2);
    expect(screen.queryByRole("button", { name: "Page 2" })).toBeNull();
  });

  it("disables the steps at the ends", () => {
    render(Pagination, { props: { pages: 3, page: 1 } });
    expect(
      (screen.getByRole("button", { name: "Previous page" }) as HTMLButtonElement).disabled,
    ).toBe(true);
    expect((screen.getByRole("button", { name: "Next page" }) as HTMLButtonElement).disabled).toBe(
      false,
    );
  });

  it("moves the current page on click", async () => {
    render(Pagination, { props: { pages: 3, page: 1 } });
    await fireEvent.click(screen.getByRole("button", { name: "Page 2" }));
    await waitFor(() =>
      expect(screen.getByRole("button", { name: "Page 2" }).getAttribute("aria-current")).toBe(
        "page",
      ),
    );
  });
});

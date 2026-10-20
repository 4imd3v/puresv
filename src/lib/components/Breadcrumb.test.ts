import { render, screen, cleanup } from "@testing-library/svelte";
import { afterEach, describe, expect, it } from "vite-plus/test";
import Breadcrumb from "./Breadcrumb.svelte";

const items = [
  { label: "Home", href: "/" },
  { label: "Components", href: "/components" },
  { label: "Button" },
];

afterEach(cleanup);

describe("Breadcrumb", () => {
  it("renders a labelled navigation landmark", () => {
    render(Breadcrumb, { props: { items } });
    expect(screen.getByRole("navigation", { name: "Breadcrumb" })).toBeTruthy();
  });

  it("links every trail item but the last", () => {
    render(Breadcrumb, { props: { items } });
    expect(screen.getAllByRole("link").length).toBe(2);
    expect(screen.getByRole("link", { name: "Home" }).getAttribute("href")).toBe("/");
  });

  it("marks the last item as the current page", () => {
    render(Breadcrumb, { props: { items } });
    expect(screen.getByText("Button").getAttribute("aria-current")).toBe("page");
  });

  it("accepts a custom label", () => {
    render(Breadcrumb, { props: { items, "aria-label": "You are here" } });
    expect(screen.getByRole("navigation", { name: "You are here" })).toBeTruthy();
  });
});

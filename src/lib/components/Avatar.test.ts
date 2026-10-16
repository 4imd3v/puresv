import { render, screen, cleanup } from "@testing-library/svelte";
import { afterEach, describe, expect, it } from "vite-plus/test";
import Avatar from "./Avatar.svelte";

afterEach(cleanup);

describe("Avatar", () => {
  it.each([
    ["Ada Lovelace", "AL"],
    ["Jo", "J"],
    ["Aleksandra Wisniewska-Kowalczyk", "AW"],
  ])("derives initials from %s", (name, expected) => {
    const { container } = render(Avatar, { props: { name } });
    expect(container.querySelector(".initials")?.textContent).toBe(expected);
  });

  it("labels the initials for assistive tech", () => {
    render(Avatar, { props: { name: "Ada Lovelace" } });
    expect(screen.getByRole("img", { name: "Ada Lovelace" })).toBeTruthy();
  });

  it("renders an image when src is given", () => {
    const { container } = render(Avatar, { props: { name: "Ada", src: "/a.png" } });
    const img = container.querySelector("img");
    expect(img?.getAttribute("src")).toBe("/a.png");
    expect(img?.getAttribute("alt")).toBe("Ada");
  });

  it("falls back to the icon when there is no name or src", () => {
    const { container } = render(Avatar, {});
    expect(container.querySelector(".icon")).toBeTruthy();
    expect(container.querySelector(".initials")).toBeNull();
  });

  it("applies the size", () => {
    const { container } = render(Avatar, { props: { name: "Ada", size: "lg" } });
    expect(container.querySelector(".avatar")?.getAttribute("data-size")).toBe("lg");
  });
});

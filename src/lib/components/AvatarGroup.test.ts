import { render, screen, cleanup } from "@testing-library/svelte";
import { afterEach, describe, expect, it } from "vite-plus/test";
import AvatarGroup from "./AvatarGroup.svelte";

const items = [
  "Ada Lovelace",
  "Grace Hopper",
  "Alan Turing",
  "Edsger Dijkstra",
  "Barbara Liskov",
  "Donald Knuth",
].map((name) => ({ name }));

afterEach(cleanup);

describe("AvatarGroup", () => {
  it("renders up to max avatars and an overflow chip", () => {
    render(AvatarGroup, { props: { items } });
    expect(screen.getByText("AL")).toBeTruthy();
    expect(screen.getAllByRole("img").length).toBe(4);
    expect(screen.getByText("+2")).toBeTruthy();
  });

  it("omits the chip when everything fits", () => {
    render(AvatarGroup, { props: { items: items.slice(0, 2) } });
    expect(screen.queryByText(/^\+\d+$/)).toBeNull();
  });

  it("forwards size, class and native attributes", () => {
    const { container } = render(AvatarGroup, {
      props: { items: items.slice(0, 1), size: "lg", class: "team", id: "group" },
    });
    const root = container.querySelector(".avatar-group") as HTMLElement;
    expect(root.id).toBe("group");
    expect(root.classList.contains("team")).toBe(true);
    expect(root.querySelector(".more")).toBeNull();
    expect(root.querySelector("[data-size='lg']")).toBeTruthy();
  });
});

// Blocks are full-page compositions, not library components: the source is
// shown on /blocks/<slug> to be copied and owned, so nothing here ships in the
// package. A block's file is its slug — see src/routes/blocks/_blocks.
export type Category = "Application" | "Authentication" | "Marketing";

export interface BlockMeta {
  slug: string;
  title: string;
  description: string;
  category: Category;
  components: string[];
}

export const categories: Category[] = ["Application", "Authentication", "Marketing"];

export const blocks: BlockMeta[] = [
  {
    slug: "dashboard",
    title: "Dashboard",
    description: "Rail navigation, four key metrics and a live orders table.",
    category: "Application",
    components: [
      "Avatar",
      "AvatarGroup",
      "Badge",
      "Button",
      "Card",
      "Progress",
      "SegmentedControl",
      "Stat",
      "Table",
    ],
  },
  {
    slug: "inbox",
    title: "Inbox",
    description: "A message list beside a reading pane, with a reply composer.",
    category: "Application",
    components: ["Avatar", "Button", "Input", "SegmentedControl", "Separator", "Textarea"],
  },
  {
    slug: "settings",
    title: "Settings",
    description: "Tabbed account settings: profile, notifications and security.",
    category: "Application",
    components: ["Avatar", "Button", "Input", "Select", "Separator", "Switch", "Tabs", "Textarea"],
  },
  {
    slug: "login",
    title: "Login",
    description: "A split sign-in page with a quiet testimonial panel.",
    category: "Authentication",
    components: ["Avatar", "Button", "Checkbox", "Input", "Separator"],
  },
  {
    slug: "signup",
    title: "Sign up",
    description: "One centered card, from name fields to the terms checkbox.",
    category: "Authentication",
    components: ["Button", "Card", "Checkbox", "Input", "Separator"],
  },
  {
    slug: "pricing",
    title: "Pricing",
    description: "Three plans with a billing toggle and a short FAQ.",
    category: "Marketing",
    components: ["Accordion", "Badge", "Button", "Card", "SegmentedControl"],
  },
];

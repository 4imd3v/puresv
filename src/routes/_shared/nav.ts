// Top-bar links (also the mobile nav). Kept short on purpose — the full
// component list lives in the sidebar and the /components browse page.
export const topLinks = [
  { href: "/", label: "Home" },
  { href: "/components", label: "Components" },
];

// Sidebar + browse-page groups, by category.
export const groups = [
  {
    title: "Actions",
    links: [{ href: "/components/button", label: "Button" }],
  },
  {
    title: "Forms",
    links: [
      { href: "/components/input", label: "Input" },
      { href: "/components/textarea", label: "Textarea" },
      { href: "/components/select", label: "Select" },
      { href: "/components/checkbox", label: "Checkbox" },
      { href: "/components/radio", label: "Radio" },
      { href: "/components/switch", label: "Switch" },
      { href: "/components/slider", label: "Slider" },
      { href: "/components/segmented-control", label: "SegmentedControl" },
    ],
  },
  {
    title: "Feedback",
    links: [
      { href: "/components/alert", label: "Alert" },
      { href: "/components/progress", label: "Progress" },
      { href: "/components/spinner", label: "Spinner" },
      { href: "/components/skeleton", label: "Skeleton" },
      { href: "/components/toast", label: "Toast" },
    ],
  },
  {
    title: "Display",
    links: [
      { href: "/components/avatar", label: "Avatar" },
      { href: "/components/badge", label: "Badge" },
      { href: "/components/card", label: "Card" },
      { href: "/components/separator", label: "Separator" },
      { href: "/components/table", label: "Table" },
      { href: "/components/kbd", label: "Kbd" },
    ],
  },
  {
    title: "Navigation",
    links: [
      { href: "/components/breadcrumb", label: "Breadcrumb" },
      { href: "/components/tabs", label: "Tabs" },
      { href: "/components/accordion", label: "Accordion" },
      { href: "/components/pagination", label: "Pagination" },
    ],
  },
  {
    title: "Overlays",
    links: [
      { href: "/components/modal", label: "Modal" },
      { href: "/components/dropdown", label: "Dropdown" },
      { href: "/components/tooltip", label: "Tooltip" },
    ],
  },
];

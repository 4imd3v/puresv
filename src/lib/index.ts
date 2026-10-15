export { default as Badge } from "./components/Badge.svelte";
export { default as Button } from "./components/Button.svelte";
export { default as Card } from "./components/Card.svelte";

// Design tokens. Side-effect import so every component is styled out of the box;
// consumers who want the tokens on their own can `import "puresv/theme.css"`.
import "./theme.css";

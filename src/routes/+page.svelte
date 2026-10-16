<script lang="ts">
  import { Badge, Button } from "#lib";

  let copied = $state(false);

  const install = "pnpm add puresv";

  async function copy() {
    await navigator.clipboard.writeText(install);
    copied = true;
    setTimeout(() => (copied = false), 1500);
  }

  const features = [
    {
      title: "Zero runtime dependencies",
      body: "Everything is Svelte and CSS. Nothing to audit, nothing to keep up to date.",
    },
    {
      title: "Design tokens",
      body: "Every color, radius and spacing value is a --puresv-* custom property you can override.",
    },
    {
      title: "Modern CSS",
      body: "Scoped styles inside @layer puresv, so your unlayered CSS always wins.",
    },
    {
      title: "Svelte 5 runes",
      body: "Snippets instead of slots, typed props, and native attributes forwarded through.",
    },
  ];

  const components = [
    {
      href: "/components/button",
      name: "Button",
      summary: "Five variants and three sizes, with hover, press and focus states.",
    },
    {
      href: "/components/card",
      name: "Card",
      summary: "A surface with optional header and footer snippets around the body.",
    },
    {
      href: "/components/badge",
      name: "Badge",
      summary: "A compact label in five tones for status and metadata.",
    },
    {
      href: "/components/input",
      name: "Input",
      summary: "A labelled text field with focus, disabled and error states.",
    },
    {
      href: "/components/switch",
      name: "Switch",
      summary: "An animated on/off toggle built on a native checkbox.",
    },
    {
      href: "/components/alert",
      name: "Alert",
      summary: "An inline status banner in four tones.",
    },
    {
      href: "/components/checkbox",
      name: "Checkbox",
      summary: "A checkbox on a native input with a drawn-in check.",
    },
    {
      href: "/components/textarea",
      name: "Textarea",
      summary: "A multi-line field matching Input's states.",
    },
    {
      href: "/components/spinner",
      name: "Spinner",
      summary: "A loading indicator that rotates on the compositor.",
    },
    {
      href: "/components/radio",
      name: "Radio",
      summary: "Exclusive selection with bind:group over native radios.",
    },
    {
      href: "/components/select",
      name: "Select",
      summary: "A native select restyled to match Input.",
    },
    {
      href: "/components/skeleton",
      name: "Skeleton",
      summary: "A loading placeholder that pulses on the compositor.",
    },
    {
      href: "/components/avatar",
      name: "Avatar",
      summary: "Image, initials or icon with a broken-image fallback.",
    },
    {
      href: "/components/separator",
      name: "Separator",
      summary: "A horizontal or vertical divider, with an optional label.",
    },
    {
      href: "/components/progress",
      name: "Progress",
      summary: "A determinate bar that scales on the compositor.",
    },
    {
      href: "/components/modal",
      name: "Modal",
      summary: "A native dialog with focus trap, Escape and backdrop close.",
    },
    {
      href: "/components/tabs",
      name: "Tabs",
      summary: "An accessible tab list with arrow-key navigation.",
    },
    {
      href: "/components/accordion",
      name: "Accordion",
      summary: "A disclosure list built on the native details element.",
    },
  ];
</script>

<svelte:head>
  <title>PureSV — Svelte 5 components styled with modern CSS</title>
</svelte:head>

<main id="main">
<section class="hero">
  <Badge tone="accent">v0.0.1</Badge>
  <h1>Pure<span class="accent">SV</span></h1>
  <p class="lede">
    Reusable Svelte 5 components styled with modern CSS. No runtime
    dependencies, no utility-class framework — just Svelte and CSS.
  </p>

  <div class="cta">
    <a class="btn btn-lg btn-solid" href="/components/button">Get started</a>
    <a class="btn btn-lg btn-outline" href="/components/card">Browse components</a>
  </div>

  <div class="install">
    <code>{install}</code>
    <Button variant="ghost" size="sm" onclick={copy}>
      {copied ? "Copied" : "Copy"}
    </Button>
  </div>
</section>

<section class="section">
  <h2>Why PureSV</h2>
  <ul class="features">
    {#each features as feature (feature.title)}
      <li>
        <h3>{feature.title}</h3>
        <p>{feature.body}</p>
      </li>
    {/each}
  </ul>
</section>

<section class="section">
  <h2>Components</h2>
  <ul class="cards">
    {#each components as component (component.href)}
      <li>
        <a href={component.href}>
          <h3>{component.name}</h3>
          <p>{component.summary}</p>
          <span class="more">Read the docs →</span>
        </a>
      </li>
    {/each}
  </ul>
</section>
</main>

<style>
  @layer puresv {
    main {
      display: block;
      max-width: 56rem;
      margin-inline: auto;
      padding: var(--puresv-space-6) var(--puresv-space-4);
    }

    .hero {
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: var(--puresv-space-4);
      padding-block: var(--puresv-space-6) var(--puresv-space-6);
      text-align: center;
    }

    .hero h1 {
      margin: 0;
      font-size: clamp(2.75rem, 9vw, 4.5rem);
      font-weight: var(--puresv-weight-semibold);
      line-height: 1;
      letter-spacing: -0.04em;
    }

    .accent {
      color: var(--puresv-accent);
    }

    .lede {
      max-width: 34rem;
      margin: 0;
      font-size: var(--puresv-text-lg);
      line-height: 1.6;
      color: var(--puresv-text-muted);
    }

    .cta {
      display: flex;
      flex-wrap: wrap;
      gap: var(--puresv-space-3);
      justify-content: center;
      margin-block-start: var(--puresv-space-2);
    }

    /* Mirror the library's Button so the CTAs stay semantic links. */
    .btn {
      display: inline-flex;
      align-items: center;
      justify-content: center;
      gap: var(--puresv-space-2);
      border: 1px solid transparent;
      border-radius: var(--puresv-radius-md);
      font-family: var(--puresv-font);
      font-weight: var(--puresv-weight-medium);
      line-height: 1;
      letter-spacing: -0.01em;
      text-decoration: none;
      white-space: nowrap;
      cursor: pointer;
      transition:
        background-color var(--puresv-duration) var(--puresv-ease),
        border-color var(--puresv-duration) var(--puresv-ease),
        color var(--puresv-duration) var(--puresv-ease);
    }


    .btn-lg {
      height: 3rem;
      padding-inline: var(--puresv-space-5);
      font-size: var(--puresv-text-md);
    }

    .btn-solid {
      background-color: var(--puresv-primary);
      color: var(--puresv-on-primary);
    }

    .btn-solid:hover {
      background-color: var(--puresv-primary-hover);
    }

    .btn-outline {
      border-color: var(--puresv-border);
      color: var(--puresv-text);
    }

    .btn-outline:hover {
      border-color: var(--puresv-border-strong);
      background-color: var(--puresv-surface);
    }

    .install {
      display: flex;
      gap: var(--puresv-space-2);
      align-items: center;
      margin-block-start: var(--puresv-space-3);
      padding: var(--puresv-space-2) var(--puresv-space-2) var(--puresv-space-2)
        var(--puresv-space-4);
      border: 1px solid var(--puresv-border);
      border-radius: var(--puresv-radius-md);
      background-color: var(--puresv-surface);
    }

    .install code {
      font-family: var(--puresv-font-mono);
      font-size: var(--puresv-text-sm);
      color: var(--puresv-text);
    }

    .section {
      margin-block-start: var(--puresv-space-6);
    }

    .section h2 {
      margin: 0 0 var(--puresv-space-4);
      font-size: var(--puresv-text-xs);
      font-weight: var(--puresv-weight-semibold);
      text-transform: uppercase;
      letter-spacing: 0.08em;
      color: var(--puresv-text-muted);
    }

    .features,
    .cards {
      display: grid;
      gap: var(--puresv-space-4);
      margin: 0;
      padding: 0;
      list-style: none;
    }

    /* Explicit column counts, not auto-fit: auto-fit picks whatever fits,
		   which leaves a lone card on a second row for a fixed item count. */
    .features {
      grid-template-columns: repeat(2, minmax(0, 1fr));
    }

    @media (width < 40rem) {
      .features {
        grid-template-columns: minmax(0, 1fr);
      }
    }

    .features li {
      padding: var(--puresv-space-4);
      border: 1px solid var(--puresv-border);
      border-radius: var(--puresv-radius-lg);
      background-color: var(--puresv-canvas);
      box-shadow: inset 0 1px 0 var(--puresv-inset-hl);
    }

    .features h3 {
      margin: 0 0 var(--puresv-space-2);
      font-size: var(--puresv-text-md);
      font-weight: var(--puresv-weight-semibold);
      letter-spacing: -0.01em;
    }

    .features p,
    .cards p {
      margin: 0;
      font-size: var(--puresv-text-sm);
      line-height: 1.6;
      color: var(--puresv-text-muted);
    }

    .cards {
      grid-template-columns: repeat(3, minmax(0, 1fr));
    }

    @media (width < 40rem) {
      .cards {
        grid-template-columns: minmax(0, 1fr);
      }
    }

    .cards a {
      display: block;
      height: 100%;
      padding: var(--puresv-space-5);
      border: 1px solid var(--puresv-border);
      border-radius: var(--puresv-radius-lg);
      background-color: var(--puresv-canvas);
      color: inherit;
      text-decoration: none;
      box-shadow: inset 0 1px 0 var(--puresv-inset-hl);
      transition: border-color var(--puresv-duration) var(--puresv-ease);
    }

    .cards a:hover {
      border-color: var(--puresv-border-strong);
    }

    .cards h3 {
      margin: 0 0 var(--puresv-space-2);
      font-size: var(--puresv-text-lg);
      font-weight: var(--puresv-weight-semibold);
      letter-spacing: -0.02em;
    }

    .more {
      display: inline-block;
      margin-block-start: var(--puresv-space-4);
      font-size: var(--puresv-text-sm);
      font-weight: var(--puresv-weight-medium);
      color: var(--puresv-accent);
    }
  }
</style>

<script lang="ts">
  import { Accordion, Badge, Button, Card, SegmentedControl } from "#lib";

  const cycles = [
    { value: "monthly", label: "Monthly" },
    { value: "yearly", label: "Yearly" },
  ];
  let cycle = $state("monthly");
  const yearly = $derived(cycle === "yearly");

  const plans = [
    {
      name: "Starter",
      price: { monthly: 0, yearly: 0 },
      description: "For side projects and first prototypes.",
      cta: "Start for free",
      featured: false,
      features: ["1 workspace", "3 projects", "Community support"],
    },
    {
      name: "Team",
      price: { monthly: 24, yearly: 19 },
      description: "For product teams shipping every week.",
      cta: "Start a trial",
      featured: true,
      features: ["Unlimited workspaces", "Unlimited projects", "SSO and audit log", "Priority support"],
    },
    {
      name: "Scale",
      price: { monthly: 48, yearly: 39 },
      description: "For organisations with compliance needs.",
      cta: "Talk to sales",
      featured: false,
      features: ["Everything in Team", "SAML single sign-on", "Custom data retention", "Dedicated support"],
    },
  ];

  const faq = [
    {
      id: "change",
      title: "Can I change plans later?",
      content:
        "Yes. Upgrades apply immediately and we prorate the difference; downgrades take effect at the end of the billing period.",
    },
    {
      id: "seats",
      title: "How are seats counted?",
      content:
        "Every member with access to a workspace uses one seat. Guests with read-only links do not count.",
    },
    {
      id: "cancel",
      title: "What happens to my data if I cancel?",
      content:
        "Your workspace stays readable for 30 days, and you can export everything as JSON or CSV at any point.",
    },
  ];

  const amount = (plan: (typeof plans)[number]) =>
    `$${yearly ? plan.price.yearly : plan.price.monthly}`;
</script>

{#snippet check()}
  <svg viewBox="0 0 16 16" fill="none" aria-hidden="true">
    <path
      d="M3.5 8.5l3 3 6-7"
      stroke="currentColor"
      stroke-width="1.75"
      stroke-linecap="round"
      stroke-linejoin="round"
    />
  </svg>
{/snippet}

<div class="pricing">
  <header class="intro">
    <h2>Pricing that scales with the team</h2>
    <p>
      Start free and add seats as you grow. Every plan includes the full component
      library and unlimited viewers.
    </p>
    <SegmentedControl options={cycles} bind:value={cycle} aria-label="Billing period" />
    <p class="hint">
      {yearly ? "Billed yearly. Two months free." : "Billed monthly. Cancel anytime."}
    </p>
  </header>

  <div class="plans">
    {#each plans as plan (plan.name)}
      <Card>
        {#snippet header()}
          <div class="plan-head">
            <span>{plan.name}</span>
            {#if plan.featured}<Badge tone="accent">Popular</Badge>{/if}
          </div>
        {/snippet}

        <div class="plan-body">
          <p class="plan-price">
            {amount(plan)}<span class="plan-unit">per user / month</span>
          </p>
          <p class="plan-desc">{plan.description}</p>
          <Button variant={plan.featured ? "solid" : "outline"}>{plan.cta}</Button>
          <ul class="features">
            {#each plan.features as feature (feature)}
              <li><span class="check">{@render check()}</span>{feature}</li>
            {/each}
          </ul>
        </div>
      </Card>
    {/each}
  </div>

  <section class="faq">
    <h2>Questions</h2>
    <Accordion items={faq} />
  </section>

  <p class="note">Prices in USD. Cancel anytime.</p>
</div>

<style>
  @layer puresv {
    .pricing {
      container-type: inline-size;
      display: grid;
      gap: var(--puresv-space-6);
      padding: var(--puresv-space-6) var(--puresv-space-4);
      background-color: var(--puresv-canvas);
      color: var(--puresv-text);
      font-family: var(--puresv-font);
      font-size: var(--puresv-text-md);
      text-align: start;
    }

    .intro {
      display: grid;
      gap: var(--puresv-space-3);
      justify-items: center;
      text-align: center;
    }

    .intro h2 {
      max-width: 30ch;
      margin: 0;
      font-size: 1.75rem;
      text-wrap: balance;
      font-weight: var(--puresv-weight-semibold);
      line-height: 1.15;
      letter-spacing: -0.03em;
    }

    .intro p {
      max-width: 34rem;
      margin: 0;
      color: var(--puresv-text-muted);
      font-size: var(--puresv-text-sm);
      line-height: 1.6;
    }

    .intro .hint {
      font-size: var(--puresv-text-xs);
    }

    .plans {
      display: grid;
      grid-template-columns: repeat(3, minmax(0, 1fr));
      gap: var(--puresv-space-4);
    }

    .plan-head {
      display: flex;
      gap: var(--puresv-space-2);
      align-items: center;
      justify-content: space-between;
    }

    .plan-body {
      display: grid;
      gap: var(--puresv-space-3);
    }

    .plan-price {
      margin: 0;
      font-size: 2rem;
      font-weight: var(--puresv-weight-semibold);
      line-height: 1.1;
      letter-spacing: -0.03em;
      font-variant-numeric: tabular-nums;
    }

    .plan-unit {
      margin-inline-start: var(--puresv-space-1);
      color: var(--puresv-text-muted);
      font-size: var(--puresv-text-xs);
      font-weight: var(--puresv-weight-normal);
      letter-spacing: 0;
    }

    .plan-desc {
      margin: 0;
      color: var(--puresv-text-muted);
      font-size: var(--puresv-text-sm);
      line-height: 1.6;
    }

    .features {
      display: grid;
      gap: var(--puresv-space-2);
      margin: 0;
      padding: var(--puresv-space-3) 0 0;
      border-top: 1px solid var(--puresv-border);
      color: var(--puresv-text-muted);
      font-size: var(--puresv-text-sm);
      list-style: none;
    }

    .features li {
      display: flex;
      gap: var(--puresv-space-2);
      align-items: center;
    }

    .check {
      display: inline-flex;
      flex-shrink: 0;
      width: 1rem;
      height: 1rem;
      color: var(--puresv-accent);
    }

    .check svg {
      width: 100%;
      height: 100%;
    }

    .faq {
      display: grid;
      gap: var(--puresv-space-3);
      width: 100%;
      max-width: 42rem;
      margin-inline: auto;
    }

    .faq h2 {
      margin: 0;
      font-size: var(--puresv-text-lg);
      font-weight: var(--puresv-weight-semibold);
      letter-spacing: -0.02em;
    }

    .note {
      margin: 0;
      color: var(--puresv-text-muted);
      font-size: var(--puresv-text-xs);
      text-align: center;
    }

    @container (width < 52rem) {
      .plans {
        grid-template-columns: minmax(0, 1fr);
      }
    }
  }
</style>

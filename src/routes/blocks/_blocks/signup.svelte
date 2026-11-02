<script lang="ts">
  import { Button, Card, Checkbox, Input, Separator } from "#lib";

  let first = $state("");
  let last = $state("");
  let email = $state("");
  let password = $state("");
  let terms = $state(false);
</script>

<div class="signup">
  <Card>
    {#snippet header()}
      <p class="brand"><span class="brand-mark" aria-hidden="true">A</span>Acme</p>
    {/snippet}

    <div class="body">
      <div class="intro">
        <h2>Create your account</h2>
        <p>Start with a 14-day trial. No card required.</p>
      </div>

      <form onsubmit={(event) => event.preventDefault()}>
        <div class="pair">
          <Input label="First name" bind:value={first} autocomplete="given-name" />
          <Input label="Last name" bind:value={last} autocomplete="family-name" />
        </div>

        <Input label="Work email" type="email" bind:value={email} autocomplete="email" />

        <div class="group">
          <Input
            label="Password"
            type="password"
            bind:value={password}
            autocomplete="new-password"
          />
          <p class="hint">At least 10 characters.</p>
        </div>

        <Checkbox label="I agree to the terms and privacy policy" bind:checked={terms} />

        <Button type="submit">Create account</Button>

        <Separator label="or" />

        <Button variant="outline" type="button">Continue with SSO</Button>
      </form>
    </div>

    {#snippet footer()}
      Already have an account? <a class="link" href="#login">Sign in</a>
    {/snippet}
  </Card>
</div>

<style>
  @layer puresv {
    .signup {
      container-type: inline-size;
      /* One centered column instead of a wrapper element: the Card fills
         it, and minmax(0, …) still shrinks on a narrow frame. */
      display: grid;
      grid-template-columns: minmax(0, 26rem);
      justify-content: center;
      padding: var(--puresv-space-6) var(--puresv-space-4);
      background-color: var(--puresv-canvas);
      color: var(--puresv-text);
      font-family: var(--puresv-font);
      font-size: var(--puresv-text-md);
      text-align: start;
    }

    .brand {
      display: flex;
      gap: var(--puresv-space-2);
      align-items: center;
      margin: 0;
      font-weight: var(--puresv-weight-semibold);
      letter-spacing: -0.01em;
    }

    .brand-mark {
      display: grid;
      place-items: center;
      width: 1.5rem;
      height: 1.5rem;
      border-radius: var(--puresv-radius-sm);
      background-color: var(--puresv-primary);
      color: var(--puresv-on-primary);
      font-size: var(--puresv-text-xs);
    }

    .body {
      display: grid;
      gap: var(--puresv-space-4);
    }

    .intro h2 {
      margin: 0 0 var(--puresv-space-2);
      font-size: 1.25rem;
      font-weight: var(--puresv-weight-semibold);
      letter-spacing: -0.02em;
    }

    .intro p {
      margin: 0;
      color: var(--puresv-text-muted);
      font-size: var(--puresv-text-sm);
      line-height: 1.6;
    }

    form {
      display: grid;
      gap: var(--puresv-space-3);
    }

    .pair {
      display: grid;
      grid-template-columns: repeat(2, minmax(0, 1fr));
      gap: var(--puresv-space-3);
    }

    .group {
      display: grid;
      gap: var(--puresv-space-2);
    }

    .hint {
      margin: 0;
      color: var(--puresv-text-muted);
      font-size: var(--puresv-text-xs);
    }

    .link {
      border-radius: var(--puresv-radius-sm);
      color: var(--puresv-accent-text);
      font-weight: var(--puresv-weight-medium);
      text-decoration: none;
    }

    .link:hover {
      text-decoration: underline;
    }

    .link:focus-visible {
      outline: 2px solid var(--puresv-ring);
      outline-offset: 2px;
    }

    @container (width < 24rem) {
      .pair {
        grid-template-columns: minmax(0, 1fr);
      }
    }
  }
</style>

<script lang="ts">
  import { Avatar, Button, Checkbox, Input, Separator } from "#lib";

  let email = $state("ada@acme.com");
  let password = $state("");
  let remember = $state(true);
</script>

<div class="login">
  <div class="layout">
    <div class="form-side">
      <div class="form">
        <p class="brand"><span class="brand-mark" aria-hidden="true">A</span>Acme</p>

        <div class="intro">
          <h2>Sign in</h2>
          <p>Welcome back. Enter your details to continue.</p>
        </div>

        <form onsubmit={(event) => event.preventDefault()}>
          <Input label="Email" type="email" bind:value={email} autocomplete="email" />
          <Input
            label="Password"
            type="password"
            bind:value={password}
            autocomplete="current-password"
          />

          <div class="row">
            <Checkbox label="Remember me" bind:checked={remember} />
            <a class="link" href="#reset">Forgot password?</a>
          </div>

          <Button type="submit">Sign in</Button>

          <Separator label="or" />

          <Button variant="outline" type="button">Continue with SSO</Button>
        </form>

        <p class="alt">New to Acme? <a class="link" href="#signup">Create an account</a></p>
      </div>
    </div>

    <aside class="quote-side">
      <p class="brand"><span class="brand-mark" aria-hidden="true">A</span>Acme</p>

      <blockquote class="quote">
        <p>
          “We replaced four internal tools with Acme in a quarter. The team stopped
          asking where things live.”
        </p>
      </blockquote>

      <div class="author">
        <Avatar name="Grace Hopper" />
        <div>
          <p class="author-name">Grace Hopper</p>
          <p class="author-role">VP Engineering, Acme</p>
        </div>
      </div>
    </aside>
  </div>
</div>

<style>
  @layer puresv {
    /* The root is the query container; the layout sits one level down, because
       @container cannot style the container element itself. */
    .login {
      container-type: inline-size;
      background-color: var(--puresv-canvas);
      color: var(--puresv-text);
      font-family: var(--puresv-font);
      font-size: var(--puresv-text-md);
      text-align: start;
    }

    .layout {
      display: grid;
      grid-template-columns: repeat(2, minmax(0, 1fr));
    }

    .form-side {
      display: grid;
      place-items: center;
      padding: var(--puresv-space-6) var(--puresv-space-4);
    }

    .form {
      display: grid;
      gap: var(--puresv-space-3);
      width: 100%;
      max-width: 22rem;
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

    .intro {
      margin-block: var(--puresv-space-2);
    }

    .intro h2 {
      margin: 0 0 var(--puresv-space-2);
      font-size: 1.5rem;
      font-weight: var(--puresv-weight-semibold);
      letter-spacing: -0.02em;
    }

    .intro p {
      margin: 0;
      color: var(--puresv-text-muted);
      font-size: var(--puresv-text-sm);
      line-height: 1.6;
    }

    /* A grid, so every control and the button stretch to the same width. */
    form {
      display: grid;
      gap: var(--puresv-space-3);
    }

    .row {
      display: flex;
      flex-wrap: wrap;
      gap: var(--puresv-space-3);
      align-items: center;
      justify-content: space-between;
    }

    .alt {
      margin: var(--puresv-space-2) 0 0;
      color: var(--puresv-text-muted);
      font-size: var(--puresv-text-sm);
      text-align: center;
    }

    .link {
      border-radius: var(--puresv-radius-sm);
      color: var(--puresv-accent-text);
      font-size: var(--puresv-text-sm);
      font-weight: var(--puresv-weight-medium);
      text-decoration: none;
    }

    @media (hover: hover) {
      .link:hover {
        text-decoration: underline;
      }
    }

    .link:focus-visible {
      outline: 2px solid var(--puresv-ring);
      outline-offset: 2px;
    }

    .quote-side {
      display: flex;
      flex-direction: column;
      gap: var(--puresv-space-6);
      justify-content: space-between;
      padding: var(--puresv-space-6);
      border-inline-start: 1px solid var(--puresv-border);
      background-color: var(--puresv-surface);
    }

    .quote {
      margin: 0;
      font-size: var(--puresv-text-lg);
      line-height: 1.6;
      letter-spacing: -0.01em;
      text-wrap: pretty;
    }

    .quote p {
      margin: 0;
    }

    .author {
      display: flex;
      gap: var(--puresv-space-3);
      align-items: center;
    }

    .author-name,
    .author-role {
      margin: 0;
    }

    .author-name {
      font-size: var(--puresv-text-sm);
      font-weight: var(--puresv-weight-medium);
    }

    .author-role {
      color: var(--puresv-text-muted);
      font-size: var(--puresv-text-xs);
    }

    @container (width < 56rem) {
      .layout {
        grid-template-columns: minmax(0, 1fr);
      }

      .quote-side {
        display: none;
      }
    }
  }
</style>

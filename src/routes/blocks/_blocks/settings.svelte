<script lang="ts">
  import { Avatar, Button, Input, Select, Separator, Switch, Tabs, Textarea } from "#lib";

  const tabs = [
    { id: "profile", label: "Profile" },
    { id: "notifications", label: "Notifications" },
    { id: "security", label: "Security" },
  ];

  const notifications = [
    {
      id: "product",
      label: "Product updates",
      description: "New features and improvements, roughly twice a month.",
      checked: true,
    },
    {
      id: "summary",
      label: "Weekly summary",
      description: "A digest of workspace activity every Monday morning.",
      checked: true,
    },
    {
      id: "security",
      label: "Security alerts",
      description: "Sign-ins from a new device or location. Recommended.",
      checked: false,
    },
  ];

  const timezones = ["UTC", "Europe/Berlin", "Europe/London", "America/New York", "Asia/Tokyo"];
</script>

<div class="settings">
  <header class="page-head">
    <h2>Account</h2>
    <p>Manage your profile, notifications and sign-in security.</p>
  </header>

  <Tabs {tabs} active="profile">
    {#snippet panel(id)}
      {#if id === "profile"}
        <div class="panel">
          <div class="photo">
            <Avatar name="Ada Lovelace" size="lg" />
            <div class="photo-actions">
              <Button variant="outline" size="sm">Change photo</Button>
              <Button variant="ghost" size="sm">Remove</Button>
              <p class="hint">JPG or PNG, up to 2 MB.</p>
            </div>
          </div>

          <Separator />

          <div class="fields">
            <Input label="Full name" value="Ada Lovelace" autocomplete="name" />
            <Input label="Email" type="email" value="ada@acme.com" autocomplete="email" />
            <Input label="Company" value="Acme Inc." autocomplete="organization" />
            <Select label="Timezone">
              {#each timezones as zone (zone)}
                <option value={zone} selected={zone === "Europe/Berlin"}>{zone}</option>
              {/each}
            </Select>
          </div>

          <Textarea
            label="Bio"
            rows={3}
            value="Builds the design system and keeps the component count honest."
          />

          <div class="save-bar">
            <p class="hint">Changes apply to your account immediately.</p>
            <div class="save-actions">
              <Button variant="ghost" size="sm">Cancel</Button>
              <Button size="sm">Save changes</Button>
            </div>
          </div>
        </div>
      {:else if id === "notifications"}
        <div class="panel">
          <ul class="switches">
            {#each notifications as item (item.id)}
              <li>
                <div class="switch-text">
                  <p class="switch-label">{item.label}</p>
                  <p class="hint">{item.description}</p>
                </div>
                <Switch aria-label={item.label} checked={item.checked} />
              </li>
            {/each}
          </ul>
        </div>
      {:else}
        <div class="panel">
          <div class="section">
            <h3 class="section-title">Password</h3>
            <p class="hint">Last changed three months ago.</p>
          </div>

          <div class="fields">
            <Input label="Current password" type="password" autocomplete="current-password" />
            <Input label="New password" type="password" autocomplete="new-password" />
          </div>

          <Separator />

          <div class="switch-row">
            <div class="switch-text">
              <p class="switch-label">Two-factor authentication</p>
              <p class="hint">Require a code from your authenticator app when signing in.</p>
            </div>
            <Switch aria-label="Two-factor authentication" checked />
          </div>

          <div class="save-bar">
            <p class="hint">Sessions on other devices stay signed in.</p>
            <div class="save-actions">
              <Button size="sm">Update password</Button>
            </div>
          </div>
        </div>
      {/if}
    {/snippet}
  </Tabs>
</div>

<style>
  @layer puresv {
    .settings {
      container-type: inline-size;
      padding: var(--puresv-space-5);
      background-color: var(--puresv-canvas);
      color: var(--puresv-text);
      font-family: var(--puresv-font);
      font-size: var(--puresv-text-md);
      text-align: start;
    }

    .page-head h2 {
      margin: 0 0 var(--puresv-space-1);
      font-size: 1.25rem;
      font-weight: var(--puresv-weight-semibold);
      letter-spacing: -0.02em;
    }

    .page-head p {
      margin: 0 0 var(--puresv-space-4);
      color: var(--puresv-text-muted);
      font-size: var(--puresv-text-sm);
    }

    .panel {
      display: grid;
      gap: var(--puresv-space-4);
      max-width: 44rem;
    }

    .photo {
      display: flex;
      gap: var(--puresv-space-4);
      align-items: center;
    }

    .photo-actions {
      display: flex;
      flex-wrap: wrap;
      gap: var(--puresv-space-2);
      align-items: center;
    }

    .photo-actions .hint {
      flex-basis: 100%;
    }

    .hint {
      margin: 0;
      color: var(--puresv-text-muted);
      font-size: var(--puresv-text-xs);
      line-height: 1.6;
    }

    .fields {
      display: grid;
      grid-template-columns: repeat(2, minmax(0, 1fr));
      gap: var(--puresv-space-3);
    }

    .switches {
      display: grid;
      gap: var(--puresv-space-4);
      margin: 0;
      padding: 0;
      list-style: none;
    }

    .switches li,
    .switch-row {
      display: flex;
      gap: var(--puresv-space-4);
      align-items: flex-start;
      justify-content: space-between;
    }

    .switch-text {
      display: grid;
      gap: var(--puresv-space-1);
      min-width: 0;
    }

    .switch-label {
      margin: 0;
      font-size: var(--puresv-text-md);
      font-weight: var(--puresv-weight-medium);
    }

    .section {
      display: grid;
      gap: var(--puresv-space-1);
    }

    .section-title {
      margin: 0;
      font-size: var(--puresv-text-md);
      font-weight: var(--puresv-weight-semibold);
      letter-spacing: -0.01em;
    }

    .save-bar {
      display: flex;
      flex-wrap: wrap;
      gap: var(--puresv-space-3);
      align-items: center;
      justify-content: space-between;
      padding-block-start: var(--puresv-space-4);
      border-top: 1px solid var(--puresv-border);
    }

    .save-actions {
      display: flex;
      gap: var(--puresv-space-2);
      align-items: center;
      margin-inline-start: auto;
    }

    @container (width < 40rem) {
      .fields {
        grid-template-columns: minmax(0, 1fr);
      }
    }

    @container (width < 30rem) {
      .save-bar {
        align-items: flex-start;
        flex-direction: column;
      }
    }
  }
</style>

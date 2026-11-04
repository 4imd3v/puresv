<script lang="ts">
  import {
    Avatar,
    Button,
    Input,
    SegmentedControl,
    Separator,
    Textarea,
  } from "#lib";

  const filters = [
    { value: "all", label: "All" },
    { value: "unread", label: "Unread" },
  ];
  let filter = $state("all");

  const messages = [
    {
      id: 1,
      from: "Ada Lovelace",
      subject: "Q3 roadmap review",
      preview: "I folded the feedback into the deck and added the two open questions about pricing.",
      time: "9:24",
      unread: true,
      body: [
        "Hi team — the Q3 deck is ready for review. I folded in the feedback from Tuesday and added the two open questions about pricing that we keep circling.",
        "Could you take a look before Thursday? I would rather settle the packaging question now than carry it into the planning offsite.",
      ],
    },
    {
      id: 2,
      from: "Grace Hopper",
      subject: "Re: onboarding copy",
      preview: "Shorter is better here. The second screen is doing too much work.",
      time: "8:02",
      unread: true,
      body: [
        "Shorter is better here. The second screen is doing too much work — three of the four choices are really the same choice.",
        "I have drafted a two-step version in the doc, take a look when you have a minute.",
      ],
    },
    {
      id: 3,
      from: "Alan Turing",
      subject: "Invoice #4471 is paid",
      preview: "Payment landed this morning. Nothing needed from you.",
      time: "Yesterday",
      unread: false,
      body: [
        "Payment landed this morning, so invoice #4471 is settled. Nothing needed from you.",
        "I have attached the receipt for your records.",
      ],
    },
    {
      id: 4,
      from: "Barbara Liskov",
      subject: "Design review moved to 14:00",
      preview: "The room is booked for 14:00 instead of 11:00 to fit the timezone.",
      time: "Mon",
      unread: false,
      body: [
        "The room is booked for 14:00 instead of 11:00 so the Berlin team can join. Same agenda.",
        "I will post the notes afterwards either way.",
      ],
    },
  ];

  let active = $state(messages[0].id);
  const current = $derived(messages.find((message) => message.id === active) ?? messages[0]);
  const visible = $derived(
    filter === "unread" ? messages.filter((message) => message.unread) : messages,
  );
</script>

<div class="inbox">
  <div class="layout">
    <div class="list">
      <div class="toolbar">
        <div class="toolbar-head">
          <h2>Inbox</h2>
          <Button size="sm">Compose</Button>
        </div>
        <Input type="search" placeholder="Search messages" aria-label="Search messages" />
        <SegmentedControl options={filters} bind:value={filter} aria-label="Filter messages" />
      </div>

      <ul class="messages">
        {#each visible as message (message.id)}
          <li>
            <button
              type="button"
              class="message"
              data-unread={message.unread || undefined}
              aria-current={message.id === active ? "true" : undefined}
              onclick={() => (active = message.id)}
            >
              <span class="message-top">
                <Avatar name={message.from} size="sm" />
                <span class="from">{message.from}</span>
                <span class="time">{message.time}</span>
              </span>
              <span class="subject">
                {#if message.unread}<span class="dot" aria-hidden="true"></span>{/if}{message.subject}
              </span>
              <span class="preview">{message.preview}</span>
            </button>
          </li>
        {/each}
      </ul>
    </div>

    <article class="reader">
      {#key current.id}
        <header class="reader-head">
          <div>
            <h3>{current.subject}</h3>
            <p class="reader-meta">
              <Avatar name={current.from} size="sm" />
              {current.from} · {current.time}
            </p>
          </div>
          <Button variant="outline" size="sm">Reply</Button>
        </header>

        <Separator />

        <div class="reader-body">
          {#each current.body as paragraph (paragraph)}
            <p>{paragraph}</p>
          {/each}
        </div>
      {/key}

      <div class="composer">
        <Textarea label="Reply" rows={3} placeholder="Write a reply…" />
        <div class="composer-actions">
          <Button size="sm">Send reply</Button>
        </div>
      </div>
    </article>
  </div>
</div>

<style>
  @layer puresv {
    /* The root is the query container; the layout sits one level down, because
       @container cannot style the container element itself. */
    .inbox {
      container-type: inline-size;
      background-color: var(--puresv-canvas);
      color: var(--puresv-text);
      font-family: var(--puresv-font);
      font-size: var(--puresv-text-md);
      text-align: start;
    }

    .layout {
      display: grid;
      grid-template-columns: 19rem minmax(0, 1fr);
    }

    .list {
      display: flex;
      flex-direction: column;
      min-width: 0;
      border-inline-end: 1px solid var(--puresv-border);
      background-color: var(--puresv-surface);
    }

    .toolbar {
      display: grid;
      gap: var(--puresv-space-3);
      padding: var(--puresv-space-4);
      border-bottom: 1px solid var(--puresv-border);
    }

    .toolbar-head {
      display: flex;
      gap: var(--puresv-space-2);
      align-items: center;
      justify-content: space-between;
    }

    .toolbar-head h2 {
      margin: 0;
      font-size: var(--puresv-text-lg);
      font-weight: var(--puresv-weight-semibold);
      letter-spacing: -0.02em;
    }

    .messages {
      display: flex;
      flex-direction: column;
      gap: 1px;
      margin: 0;
      padding: var(--puresv-space-2);
      overflow-y: auto;
      list-style: none;
    }

    .message {
      display: grid;
      gap: var(--puresv-space-1);
      width: 100%;
      padding: var(--puresv-space-3);
      border: 0;
      border-radius: var(--puresv-radius-md);
      background: none;
      color: inherit;
      font: inherit;
      text-align: start;
      cursor: pointer;
      transition: background-color var(--puresv-duration) var(--puresv-ease-out);
    }

    @media (hover: hover) {
      .message:hover {
        background-color: var(--puresv-surface-2);
      }
    }

    .message[aria-current="true"] {
      background-color: var(--puresv-accent-soft);
    }

    .message:focus-visible {
      outline: 2px solid var(--puresv-ring);
      outline-offset: -2px;
    }

    .message-top {
      display: flex;
      gap: var(--puresv-space-2);
      align-items: center;
      min-width: 0;
    }

    .from {
      overflow: hidden;
      margin-inline-end: auto;
      font-size: var(--puresv-text-sm);
      font-weight: var(--puresv-weight-medium);
      text-overflow: ellipsis;
      white-space: nowrap;
    }

    .time {
      flex-shrink: 0;
      color: var(--puresv-text-muted);
      font-size: var(--puresv-text-xs);
      font-variant-numeric: tabular-nums;
    }

    .subject {
      overflow: hidden;
      font-size: var(--puresv-text-sm);
      text-overflow: ellipsis;
      white-space: nowrap;
    }

    .message[data-unread] .subject {
      font-weight: var(--puresv-weight-semibold);
    }

    .dot {
      display: inline-block;
      width: 0.375rem;
      height: 0.375rem;
      margin-inline-end: var(--puresv-space-2);
      border-radius: var(--puresv-radius-full);
      background-color: var(--puresv-accent);
      vertical-align: middle;
    }

    /* Two lines of preview, then clipped. */
    .preview {
      display: -webkit-box;
      overflow: hidden;
      color: var(--puresv-text-muted);
      font-size: var(--puresv-text-xs);
      line-height: 1.5;
      -webkit-box-orient: vertical;
      -webkit-line-clamp: 2;
      line-clamp: 2;
    }

    .reader {
      display: flex;
      flex-direction: column;
      min-width: 0;
      background-color: var(--puresv-canvas);
    }

    .reader-head {
      display: flex;
      gap: var(--puresv-space-3);
      align-items: flex-start;
      justify-content: space-between;
      padding: var(--puresv-space-4);
    }

    .reader-head h3 {
      margin: 0 0 var(--puresv-space-2);
      font-size: var(--puresv-text-lg);
      font-weight: var(--puresv-weight-semibold);
      letter-spacing: -0.02em;
    }

    .reader-meta {
      display: flex;
      gap: var(--puresv-space-2);
      align-items: center;
      margin: 0;
      color: var(--puresv-text-muted);
      font-size: var(--puresv-text-sm);
    }

    /* Constrained measure: a 50rem-wide column of prose is unreadable. */
    .reader-body {
      display: grid;
      gap: var(--puresv-space-3);
      max-width: 46rem;
      padding: var(--puresv-space-4);
      line-height: 1.7;
    }

    .reader-body p {
      margin: 0;
    }

    /* The incoming message fades in; the old one is gone at once, so there is
       nothing to double-expose. Opacity only — no movement on a list click. */
    .reader-head,
    .reader-body {
      transition: opacity var(--puresv-duration) var(--puresv-ease-out);
    }

    @starting-style {
      .reader-head,
      .reader-body {
        opacity: 0;
      }
    }

    .composer {
      display: grid;
      gap: var(--puresv-space-3);
      margin-block-start: auto;
      padding: var(--puresv-space-4);
      border-top: 1px solid var(--puresv-border);
      background-color: var(--puresv-surface);
    }

    .composer-actions {
      display: flex;
      justify-content: flex-end;
    }

    @container (width < 52rem) {
      .layout {
        grid-template-columns: minmax(0, 1fr);
      }

      .list {
        border-inline-end: 0;
        border-block-end: 1px solid var(--puresv-border);
      }

      .messages {
        max-height: 15rem;
      }
    }
  }
</style>

# Design Principles

## Core Principles

- Prefer plain HTML + CSS + minimal JS
- Keep folder structure flat and predictable
- Avoid premature abstraction
- Every page should work without JavaScript

## Typography & Spacing Rules

### Font Size & Line Height
- Base font size: 18px
- Paragraph line-height: 1.7
- List item line-height: 1.6

### Paragraph Spacing
- Paragraph bottom margin: 2rem (clear separation between paragraphs)
- This creates obvious visual breaks between different ideas

### List Spacing
- List items within same list: 0.3rem margin-bottom (tight, cohesive)
- Lists that immediately follow a paragraph (no blank line in Markdown):
  - Paragraph bottom margin: 0.3rem
  - List top margin: 0.3rem
  - Total gap: ~0.6rem (tight, shows they belong together)
- This reflects Markdown structure: no blank line = same logical unit

### CSS Implementation
```css
/* Base paragraph spacing */
.note-content p {
    margin-bottom: 2rem;
    line-height: 1.7;
}

/* Tight spacing when paragraph immediately precedes list */
.note-content p:has(+ ul),
.note-content p:has(+ ol) {
    margin-bottom: 0.3rem;
}

.note-content p + ul,
.note-content p + ol {
    margin-top: 0.3rem !important;
}

/* List item spacing */
.note-content li {
    margin-bottom: 0.3rem;
    line-height: 1.6;
}
```

### Rationale
- Large paragraph spacing (2rem) makes it easy to distinguish separate thoughts
- Tight list spacing (0.3rem) keeps related items grouped together
- When a paragraph and list are adjacent in Markdown (no blank line), they get tight spacing to show they're one logical unit
- Example: "使用AI工具来提升效率：" followed immediately by a numbered list should appear as one cohesive block

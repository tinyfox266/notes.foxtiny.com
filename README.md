# notes.foxtiny.com

A long-term personal static website for daily notes, hosted on GitHub Pages.

## Features

- 📝 **Daily Notes**: One Markdown file per day (`notes/YYYY-MM-DD.md`)
- 📅 **Timeline View**: All notes on a single page, newest first
- 🔍 **Client-side Search**: Fast, real-time search with highlighting
- 🎨 **Simple Design**: Clean, readable, mobile-friendly
- 🚀 **Static Site**: Built locally, hosted on GitHub Pages
- ⚡ **Fast**: No frameworks, pure HTML/CSS/JS

## Structure

```
/
├── index.html          # Generated homepage (timeline of all notes)
├── about/              # About page
│   └── index.html
├── notes/              # Markdown source files (one per day)
│   ├── 2026-01-14.md
│   └── 2026-01-15.md
├── assets/             # Styles and scripts
│   ├── style.css
│   └── main.js
├── docs/               # Project documentation
├── build.js            # Build script
├── package.json        # Dependencies
└── README.md
```

## Usage

### 1. Add a New Note

Create a new Markdown file in the `notes/` directory:

```bash
# Create today's note
echo "# $(date +%Y-%m-%d)\n\nYour content here..." > notes/$(date +%Y-%m-%d).md

# Or manually create
vim notes/2026-01-16.md
```

### 2. Build

Run the build script to generate `index.html`:

```bash
npm run build
# or
node build.js
```

### 3. Deploy

Push to GitHub and it will be live on GitHub Pages:

```bash
git add .
git commit -m "Add daily note"
git push
```

GitHub Pages will automatically deploy in 1-2 minutes.

## Local Development

First, install dependencies:

```bash
npm install
```

Build the site:

```bash
npm run build
```

Preview locally:

```bash
npm run dev
# or
python3 -m http.server 8000
```

Then visit `http://localhost:8000`

## Markdown Format

Each note should be named `YYYY-MM-DD.md`. Example:

```markdown
# 2026-01-16

Today I learned about...

## Section Title

- Bullet point
- Another point

### Subsection

Code example:

\`\`\`javascript
console.log('Hello!');
\`\`\`

> Quote block

---

More content...
```

## Principles

- Simple, fast, readable
- Content-first, one note per day
- No heavy frameworks or build pipelines
- Works without JavaScript
- Easy to extend over time

## Search

The website includes a client-side search feature:

- Type in the search box to filter notes in real-time
- Search results show matching excerpts with highlights
- Click a result to scroll to that note
- Press `Escape` to clear search
- No backend required - all search happens in the browser

## Tech Stack

- **Markdown**: For writing notes
- **marked.js**: Markdown to HTML conversion (only dependency)
- **Node.js**: Build script
- **Vanilla JavaScript**: Search functionality
- **GitHub Pages**: Free hosting

## Contributing

Read `CLAUDE.md` and the docs in `/docs` before making changes.

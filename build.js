#!/usr/bin/env node

/**
 * Build script for notes.foxtiny.com
 * Reads all Markdown files from notes/ and generates index.html
 */

const fs = require('fs');
const path = require('path');
const { marked } = require('marked');

// Configure marked to use GitHub Flavored Markdown
marked.setOptions({
  gfm: true,
  breaks: false,
  headerIds: false,
  mangle: false
});

// Configuration
const NOTES_DIR = './notes';
const OUTPUT_FILE = './index.html';
const SEARCH_INDEX_FILE = './assets/search-index.json';

// Read all markdown files from notes directory
function getNoteFiles() {
  if (!fs.existsSync(NOTES_DIR)) {
    console.log('Notes directory not found. Creating...');
    fs.mkdirSync(NOTES_DIR);
    return [];
  }

  const files = fs.readdirSync(NOTES_DIR)
    .filter(file => file.endsWith('.md'))
    .sort()
    .reverse(); // Reverse to show newest first

  return files;
}

// Parse a note file and return metadata + HTML content
function parseNote(filename) {
  const filepath = path.join(NOTES_DIR, filename);
  const content = fs.readFileSync(filepath, 'utf-8');

  // Extract date from filename (YYYY-MM-DD.md)
  const date = filename.replace('.md', '');

  // Convert Markdown to HTML
  const html = marked(content);

  // Extract plain text for search (remove HTML tags)
  const plainText = content;

  return {
    date,
    html,
    plainText
  };
}

// Generate search index JSON
function generateSearchIndex(notes) {
  const index = {
    notes: notes.map(note => ({
      date: note.date,
      content: note.plainText,
      // Generate excerpt (first 200 chars)
      excerpt: note.plainText.substring(0, 200).replace(/\n/g, ' ')
    }))
  };

  return JSON.stringify(index, null, 2);
}

// Generate the complete index.html
function generateIndexHTML(notes) {
  const notesHTML = notes.map(note => `
        <article class="note-entry" data-date="${note.date}">
            <time datetime="${note.date}">${note.date}</time>
            <div class="note-content">
                ${note.html}
            </div>
        </article>
  `).join('\n');

  return `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>notes.foxtiny.com</title>
    <link rel="stylesheet" href="/assets/style.css">
</head>
<body>
    <header>
        <nav>
            <a href="/">Home</a>
            <a href="/about/">About</a>
        </nav>
        <div class="search-container">
            <input type="search" id="search-input" placeholder="Search notes..." autocomplete="off">
            <div id="search-results" class="search-results hidden"></div>
        </div>
    </header>

    <main class="timeline">
${notesHTML}
    </main>

    <footer>
        <p>&copy; 2026 notes.foxtiny.com</p>
    </footer>

    <script src="/assets/main.js"></script>
</body>
</html>
`;
}

// Main build function
function build() {
  console.log('Building notes.foxtiny.com...');

  const files = getNoteFiles();
  console.log(`Found ${files.length} note(s)`);

  if (files.length === 0) {
    console.log('No notes found. Please add .md files to the notes/ directory.');
    console.log('Example: notes/2026-01-14.md');
    return;
  }

  const notes = files.map(file => {
    console.log(`Processing ${file}...`);
    return parseNote(file);
  });

  const html = generateIndexHTML(notes);
  fs.writeFileSync(OUTPUT_FILE, html);

  // Generate search index
  const searchIndex = generateSearchIndex(notes);
  fs.writeFileSync(SEARCH_INDEX_FILE, searchIndex);

  console.log(`✓ Built ${OUTPUT_FILE} with ${notes.length} note(s)`);
  console.log(`✓ Generated ${SEARCH_INDEX_FILE}`);
}

// Run the build
build();

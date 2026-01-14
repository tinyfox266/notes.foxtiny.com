// Minimal JavaScript for progressive enhancement
// Site works fully without this file

document.addEventListener('DOMContentLoaded', function() {
    // Add current page indicator to navigation
    const currentPath = window.location.pathname;
    const navLinks = document.querySelectorAll('nav a');

    navLinks.forEach(link => {
        if (link.getAttribute('href') === currentPath ||
            (currentPath === '/' && link.getAttribute('href') === '/') ||
            (currentPath.startsWith('/about') && link.getAttribute('href') === '/about/')) {
            link.style.fontWeight = 'bold';
        }
    });

    // Search functionality
    initSearch();
});

// Search functionality
let searchIndex = null;

async function initSearch() {
    const searchInput = document.getElementById('search-input');
    const searchResults = document.getElementById('search-results');

    if (!searchInput || !searchResults) {
        return; // Search not available on this page
    }

    // Load search index
    try {
        const response = await fetch('/assets/search-index.json');
        searchIndex = await response.json();
    } catch (error) {
        console.error('Failed to load search index:', error);
        return;
    }

    // Search input handler
    searchInput.addEventListener('input', function(e) {
        const query = e.target.value.trim();

        if (query.length === 0) {
            searchResults.classList.add('hidden');
            showAllNotes();
            return;
        }

        if (query.length < 2) {
            return; // Wait for at least 2 characters
        }

        performSearch(query);
    });

    // Click outside to close search results
    document.addEventListener('click', function(e) {
        if (!searchInput.contains(e.target) && !searchResults.contains(e.target)) {
            searchResults.classList.add('hidden');
        }
    });

    // Clear search on Escape
    searchInput.addEventListener('keydown', function(e) {
        if (e.key === 'Escape') {
            searchInput.value = '';
            searchResults.classList.add('hidden');
            showAllNotes();
        }
    });
}

function performSearch(query) {
    if (!searchIndex) return;

    const queryLower = query.toLowerCase();
    const results = [];

    // Search through all notes
    searchIndex.notes.forEach(note => {
        const contentLower = note.content.toLowerCase();

        if (contentLower.includes(queryLower)) {
            // Find the position of the match
            const index = contentLower.indexOf(queryLower);
            const start = Math.max(0, index - 50);
            const end = Math.min(note.content.length, index + query.length + 100);

            let excerpt = note.content.substring(start, end);
            if (start > 0) excerpt = '...' + excerpt;
            if (end < note.content.length) excerpt = excerpt + '...';

            // Highlight the match
            const regex = new RegExp(`(${query})`, 'gi');
            excerpt = excerpt.replace(regex, '<mark>$1</mark>');

            results.push({
                date: note.date,
                excerpt: excerpt
            });
        }
    });

    displaySearchResults(results, query);
    filterNotesByDates(results.map(r => r.date));
}

function displaySearchResults(results, query) {
    const searchResults = document.getElementById('search-results');

    if (results.length === 0) {
        searchResults.innerHTML = '<div class="search-no-results">No results found</div>';
        searchResults.classList.remove('hidden');
        return;
    }

    const html = `
        <div class="search-results-header">${results.length} result(s) found</div>
        ${results.map(result => `
            <div class="search-result-item" data-date="${result.date}">
                <div class="search-result-date">${result.date}</div>
                <div class="search-result-excerpt">${result.excerpt}</div>
            </div>
        `).join('')}
    `;

    searchResults.innerHTML = html;
    searchResults.classList.remove('hidden');

    // Add click handlers to results
    searchResults.querySelectorAll('.search-result-item').forEach(item => {
        item.addEventListener('click', function() {
            const date = this.getAttribute('data-date');
            scrollToNote(date);
            searchResults.classList.add('hidden');
        });
    });
}

function filterNotesByDates(dates) {
    const allNotes = document.querySelectorAll('.note-entry');

    allNotes.forEach(note => {
        const noteDate = note.getAttribute('data-date');
        if (dates.includes(noteDate)) {
            note.style.display = 'block';
        } else {
            note.style.display = 'none';
        }
    });
}

function showAllNotes() {
    const allNotes = document.querySelectorAll('.note-entry');
    allNotes.forEach(note => {
        note.style.display = 'block';
    });
}

function scrollToNote(date) {
    const note = document.querySelector(`.note-entry[data-date="${date}"]`);
    if (note) {
        note.scrollIntoView({ behavior: 'smooth', block: 'start' });
        // Highlight briefly
        note.style.backgroundColor = '#fff3cd';
        setTimeout(() => {
            note.style.backgroundColor = '';
        }, 2000);
    }
}

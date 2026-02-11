// All participants data
let allParticipants = [];
let filteredParticipants = [];

const countryFlags = {
    KAZ: '🇰🇿', UZB: '🇺🇿', KGZ: '🇰🇬', TJK: '🇹🇯', TKM: '🇹🇲',
    RUS: '🇷🇺', BLR: '🇧🇾', ARM: '🇦🇲', AZE: '🇦🇿', MDA: '🇲🇩'
};

const countryNames = {
    KAZ: 'Казахстан', UZB: 'Узбекистан', RUS: 'Россия', BLR: 'Беларусь', ARM: 'Армения'
};

const medalEmojis = { gold: '🥇', silver: '🥈', bronze: '🥉', hm: '🎖️' };
const medalColors = { gold: 'medal-gold', silver: 'medal-silver', bronze: 'medal-bronze' };

// Load all data
async function loadAllData() {
    const olympiads = ['imo', 'ioi', 'ipho', 'icho', 'ibo', 'iol', 'iao', 'igeo', 'ieso', 'ijso'];
    
    for (const olympiadId of olympiads) {
        try {
            const res = await fetch(`/data/${olympiadId}-countries.json`);
            if (!res.ok) continue;
            const data = await res.json();
            
            // Extract participants from all countries
            if (data.countries) {
                for (const [countryCode, countryData] of Object.entries(data.countries)) {
                    if (countryData.notableParticipants) {
                        countryData.notableParticipants.forEach(p => {
                            p.years.forEach((year, i) => {
                                allParticipants.push({
                                    name: p.name,
                                    nameRu: p.nameRu,
                                    country: countryCode,
                                    olympiad: olympiadId.toUpperCase(),
                                    year: year,
                                    medal: extractMedal(p.medals[i]),
                                    score: p.scores ? p.scores[i] : null,
                                    notes: p.notes
                                });
                            });
                        });
                    }
                    
                    if (countryData.topScorers) {
                        countryData.topScorers.forEach(p => {
                            p.years.forEach((year, i) => {
                                allParticipants.push({
                                    name: p.name,
                                    nameRu: p.nameRu,
                                    country: countryCode,
                                    olympiad: olympiadId.toUpperCase(),
                                    year: year,
                                    medal: extractMedal(p.medals[i]),
                                    score: p.scores ? p.scores[i] : null,
                                    notes: p.notes
                                });
                            });
                        });
                    }
                }
            }
        } catch (e) {
            console.log(`Failed to load ${olympiadId}:`, e);
        }
    }
    
    // Sort by year descending
    allParticipants.sort((a, b) => b.year - a.year);
    filteredParticipants = [...allParticipants];
    
    console.log(`Loaded ${allParticipants.length} participants`);
    renderResults();
}

function extractMedal(medalString) {
    if (!medalString) return 'hm';
    const lower = medalString.toLowerCase();
    if (lower.includes('gold')) return 'gold';
    if (lower.includes('silver')) return 'silver';
    if (lower.includes('bronze')) return 'bronze';
    return 'hm';
}

// Search
const searchInput = document.getElementById('search');
const clearBtn = document.getElementById('clearSearch');
const autocompleteBox = document.getElementById('autocomplete');

searchInput.addEventListener('input', (e) => {
    const query = e.target.value;
    clearBtn.classList.toggle('hidden', !query);
    
    if (query.length >= 2) {
        showAutocomplete(query);
    } else {
        autocompleteBox.classList.add('hidden');
    }
});

searchInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        performSearch();
    }
});

clearBtn.addEventListener('click', () => {
    searchInput.value = '';
    clearBtn.classList.add('hidden');
    autocompleteBox.classList.add('hidden');
    applyFilters();
});

function showAutocomplete(query) {
    const lower = query.toLowerCase();
    const matches = allParticipants.filter(p => 
        p.name.toLowerCase().includes(lower) || 
        p.nameRu.toLowerCase().includes(lower)
    ).slice(0, 8);
    
    if (matches.length === 0) {
        autocompleteBox.classList.add('hidden');
        return;
    }
    
    autocompleteBox.innerHTML = matches.map(p => `
        <a href="/participant.html?olympiad=${p.olympiad.toLowerCase()}&name=${encodeURIComponent(p.name)}" 
           class="flex items-center gap-3 p-3 rounded-md hover:bg-accent transition-colors">
            <div class="text-xl ${medalColors[p.medal]}">${medalEmojis[p.medal]}</div>
            <div class="flex-1 min-w-0">
                <div class="font-medium truncate">${p.name}</div>
                <div class="text-sm text-muted-foreground truncate">${p.nameRu}</div>
            </div>
            <div class="flex items-center gap-2 text-sm">
                <span class="px-2 py-0.5 rounded text-xs bg-secondary border border-border">${p.olympiad} ${p.year}</span>
                <span>${countryFlags[p.country]}</span>
            </div>
        </a>
    `).join('');
    
    autocompleteBox.classList.remove('hidden');
}

function performSearch() {
    autocompleteBox.classList.add('hidden');
    applyFilters();
}

// Filters
document.getElementById('filterCountry').addEventListener('change', applyFilters);
document.getElementById('filterOlympiad').addEventListener('change', applyFilters);
document.getElementById('filterMedal').addEventListener('change', applyFilters);
document.getElementById('filterYear').addEventListener('change', applyFilters);
document.getElementById('resetFilters').addEventListener('click', resetAll);

function applyFilters() {
    const query = searchInput.value.toLowerCase();
    const country = document.getElementById('filterCountry').value;
    const olympiad = document.getElementById('filterOlympiad').value;
    const medal = document.getElementById('filterMedal').value;
    const year = document.getElementById('filterYear').value;
    
    filteredParticipants = allParticipants.filter(p => {
        if (query && !p.name.toLowerCase().includes(query) && !p.nameRu.toLowerCase().includes(query)) return false;
        if (country && p.country !== country) return false;
        if (olympiad && p.olympiad !== olympiad) return false;
        if (medal && p.medal !== medal) return false;
        if (year) {
            if (year.includes('-')) {
                const [start, end] = year.split('-').map(Number);
                if (p.year < start || p.year > end) return false;
            } else {
                if (p.year !== parseInt(year)) return false;
            }
        }
        return true;
    });
    
    const isSearching = query || country || olympiad || medal || year;
    document.getElementById('resultsTitle').textContent = isSearching ? 'Результаты поиска' : 'Недавние медалисты';
    
    renderResults();
}

function resetAll() {
    searchInput.value = '';
    clearBtn.classList.add('hidden');
    document.getElementById('filterCountry').value = '';
    document.getElementById('filterOlympiad').value = '';
    document.getElementById('filterMedal').value = '';
    document.getElementById('filterYear').value = '';
    applyFilters();
}

function renderResults() {
    const container = document.getElementById('results');
    const noResults = document.getElementById('noResults');
    const count = document.getElementById('resultsCount');
    
    count.textContent = `${filteredParticipants.length} участников`;
    
    if (filteredParticipants.length === 0) {
        container.classList.add('hidden');
        noResults.classList.remove('hidden');
        return;
    }
    
    container.classList.remove('hidden');
    noResults.classList.add('hidden');
    
    const toShow = filteredParticipants.slice(0, 50);
    
    container.innerHTML = toShow.map(p => `
        <a href="/participant.html?olympiad=${p.olympiad.toLowerCase()}&name=${encodeURIComponent(p.name)}" 
           class="flex items-center gap-4 p-4 rounded-lg border border-border bg-card card-hover">
            <div class="text-2xl ${medalColors[p.medal]}">${medalEmojis[p.medal]}</div>
            <div class="flex-1 min-w-0">
                <div class="font-semibold">${p.name}</div>
                <div class="text-sm text-muted-foreground">${p.nameRu}</div>
            </div>
            <div class="flex flex-col items-end gap-1">
                <div class="flex items-center gap-2">
                    <span class="text-xs px-2 py-1 rounded bg-secondary border border-border">${p.olympiad} ${p.year}</span>
                    <span>${countryFlags[p.country]}</span>
                </div>
                ${p.score ? `<div class="text-xs text-muted-foreground">${p.score} pts</div>` : ''}
            </div>
        </a>
    `).join('');
}

// Close autocomplete on click outside
document.addEventListener('click', (e) => {
    if (!searchInput.contains(e.target) && !autocompleteBox.contains(e.target)) {
        autocompleteBox.classList.add('hidden');
    }
});

// Initialize
loadAllData();

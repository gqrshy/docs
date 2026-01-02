import { c as createComponent, r as renderTemplate, a as renderComponent, b as renderHead, d as addAttribute } from '../../chunks/astro/server_348rjAom.mjs';
import 'piccolore';
import { $ as $$CustomNav } from '../../chunks/CustomNav_B9qbyrj7.mjs';
import { $ as $$Footer } from '../../chunks/Footer_DueVcqUK.mjs';
import { $ as $$LanguageSwitcher } from '../../chunks/LanguageSwitcher_BukXjv8D.mjs';
/* empty css                                           */
export { renderers } from '../../renderers.mjs';

var __freeze = Object.freeze;
var __defProp = Object.defineProperty;
var __template = (cooked, raw) => __freeze(__defProp(cooked, "raw", { value: __freeze(raw || cooked.slice()) }));
var _a;
const $$RankedStats = createComponent(($$result, $$props, $$slots) => {
  const title = "CobbleRanked Live Stats Demo";
  const description = "Live demo of Pokemon usage statistics and ranked leaderboard data from CobbleRanked API.";
  return renderTemplate(_a || (_a = __template(['<html lang="en"> <head><meta charset="UTF-8"><meta name="viewport" content="width=device-width, initial-scale=1.0"><link rel="icon" type="image/png" href="/gashistudios.png"><meta name="description"', "><title>", '</title><meta property="og:title"', '><meta property="og:description"', '><meta name="theme-color" content="#7c3aed"><link rel="preconnect" href="https://fonts.googleapis.com"><link rel="preconnect" href="https://fonts.gstatic.com" crossorigin><link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800;900&family=Noto+Sans+JP:wght@400;500;700;900&display=swap" rel="stylesheet">', "</head> <body> ", ' <!-- Main Stats Layout --> <div class="stats-layout"> <!-- Left Sidebar --> <aside class="sidebar"> <!-- Format Selector --> <div class="sidebar-section"> <div class="section-label">Format</div> <div class="format-tabs"> <button class="format-tab active" data-format="SINGLES">Singles</button> <button class="format-tab" data-format="DOUBLES">Doubles</button> <button class="format-tab" data-format="TRIPLES">Triples</button> </div> </div> <!-- Season Selector --> <div class="sidebar-section"> <div class="section-label">Season</div> <div class="season-tabs"> <button class="season-tab" data-season="1">1</button> <button class="season-tab" data-season="2">2</button> <button class="season-tab" data-season="3">3</button> <button class="season-tab active" data-season="4">4</button> </div> </div> <!-- Season Stage --> <div class="sidebar-section"> <div class="section-label">Season Stage</div> <div class="stage-tabs"> <button class="stage-tab active" data-stage="MID">MID</button> <button class="stage-tab" data-stage="END">END</button> </div> </div> <!-- ELO Range Slider --> <div class="sidebar-section"> <div class="section-label">Elo Range</div> <div class="elo-range-container"> <div class="elo-range-inputs"> <div class="elo-input-group"> <input type="number" id="elo-min-input" class="elo-input" value="1000" min="0" max="3000"> </div> <div class="elo-input-group"> <input type="number" id="elo-max-input" class="elo-input" value="1500" min="0" max="3000"> </div> </div> <div class="elo-slider-container"> <div class="elo-slider-track"> <div class="elo-slider-range" id="elo-slider-range"></div> </div> <input type="range" id="elo-min-slider" class="elo-slider" min="0" max="3000" value="1000" step="50"> <input type="range" id="elo-max-slider" class="elo-slider" min="0" max="3000" value="1500" step="50"> </div> </div> </div> <!-- Pokemon Usage List --> <div class="sidebar-section pokemon-list-section"> <div class="pokemon-list" id="pokemon-list"> <!-- Populated by JavaScript --> </div> </div> </aside> <!-- Main Content --> <main class="main-content"> <!-- Pokemon Detail View --> <div class="pokemon-detail" id="pokemon-detail"> <!-- Header --> <div class="detail-header"> <h1 class="pokemon-title"> <span id="pokemon-name">Ogerpon-Wellspring</span> <span class="pokemon-types" id="pokemon-types"></span> </h1> <div class="usage-stats-summary"> <div class="stat-box"> <span class="stat-label">Usage Rank</span> <span class="stat-value rank" id="usage-rank">#1</span> </div> <div class="stat-box"> <span class="stat-label">Usage Percent</span> <span class="stat-value percent" id="usage-percent">32.58%</span> </div> <div class="stat-box"> <span class="stat-label">Samples</span> <span class="stat-value" id="usage-samples">3,939</span> </div> </div> </div> <!-- Detail Grid --> <div class="detail-grid"> <!-- Base Stats --> <div class="detail-card"> <h3 class="card-title">Base Stats</h3> <div class="base-stats" id="base-stats"> <!-- Populated by JavaScript --> </div> </div> <!-- Moves --> <div class="detail-card"> <h3 class="card-title">Moves</h3> <div class="moves-list" id="moves-list"> <!-- Populated by JavaScript --> </div> </div> <!-- Teammates --> <div class="detail-card"> <h3 class="card-title">Teammates</h3> <div class="teammates-list" id="teammates-list"> <!-- Populated by JavaScript --> </div> </div> <!-- Items --> <div class="detail-card"> <h3 class="card-title">Items</h3> <div class="items-list" id="items-list"> <!-- Populated by JavaScript --> </div> </div> <!-- Abilities --> <div class="detail-card"> <h3 class="card-title">Abilities</h3> <div class="abilities-list" id="abilities-list"> <!-- Populated by JavaScript --> </div> </div> <!-- EV Spreads --> <div class="detail-card ev-spreads-card"> <h3 class="card-title">EV Spreads (HP, Atk, Def, SpA, SpD, Spe)</h3> <div class="ev-spreads-list" id="ev-spreads-list"> <!-- Populated by JavaScript --> </div> </div> </div> </div> </main> </div> <!-- API Info Section --> <section class="api-info-section"> <div class="container"> <div class="api-card"> <div class="api-card-header"> <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"> <path d="M12 2L2 7l10 5 10-5-10-5z"></path> <path d="M2 17l10 5 10-5M2 12l10 5 10-5"></path> </svg> <h3>CobbleRanked Web API</h3> </div> <p class="api-desc">\nThis demo showcases data that can be synced from your CobbleRanked server to your website using the Web API integration.\n					Configure automatic sync intervals, API authentication, and customize what data to push.\n</p> <a href="/docs/cobbleranked/configuration/api/" class="api-link"> <span>Learn more about API configuration</span> <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"> <path d="M5 12h14M12 5l7 7-7 7"></path> </svg> </a> </div> </div> </section> ', " ", ` <script>
	(function() {
		// Demo Pokemon data with detailed stats
		const pokemonData = [
			{
				name: 'Ogerpon-Wellspring', usage: 32.58, rank: 1, samples: 3939,
				baseStats: { hp: 80, atk: 120, def: 84, spa: 60, spd: 96, spe: 110 },
				moves: [
					{ name: 'cobblemon.move.ivycudgel', pct: 100.0 },
					{ name: 'Horn Leech', pct: 78.55 },
					{ name: 'Swords Dance', pct: 75.88 },
					{ name: 'Superpower', pct: 34.48 },
					{ name: 'U-turn', pct: 30.41 }
				],
				teammates: [
					{ name: 'Moltres', pct: 18.99 },
					{ name: 'Ironvaliant', pct: 18.13 },
					{ name: 'Dragapult-Ultra', pct: 17.47 },
					{ name: 'Lopunny-Delta', pct: 15.26 },
					{ name: 'Alomomola', pct: 14.12 }
				],
				items: [{ name: 'Wellspring Mask', pct: 100.0 }],
				abilities: [{ name: 'Waterabsorb', pct: 100.0 }],
				evSpreads: [
					{ nature: 'Jolly', spread: '0/252/0/0/4/252', pct: 36.15 },
					{ nature: 'Jolly', spread: '4/252/0/0/0/252', pct: 20.03 },
					{ nature: 'Jolly', spread: '0/252/4/0/0/252', pct: 13.79 },
					{ nature: 'Jolly', spread: '0/252/0/0/0/252', pct: 11.63 },
					{ nature: 'Timid', spread: '0/252/0/0/4/252', pct: 7.72 }
				]
			},
			{
				name: 'Alomomola', usage: 30.09, rank: 2, samples: 3638,
				baseStats: { hp: 165, atk: 75, def: 80, spa: 40, spd: 45, spe: 65 },
				moves: [
					{ name: 'Flip Turn', pct: 95.2 },
					{ name: 'Wish', pct: 92.4 },
					{ name: 'Protect', pct: 88.1 },
					{ name: 'Scald', pct: 45.3 }
				],
				teammates: [
					{ name: 'Ogerpon-Wellspring', pct: 22.1 },
					{ name: 'Corviknight', pct: 18.4 },
					{ name: 'Ferrothorn', pct: 15.2 }
				],
				items: [{ name: 'Heavy-Duty Boots', pct: 78.4 }, { name: 'Leftovers', pct: 21.6 }],
				abilities: [{ name: 'Regenerator', pct: 100.0 }],
				evSpreads: [
					{ nature: 'Bold', spread: '252/0/252/0/4/0', pct: 45.2 },
					{ nature: 'Impish', spread: '252/0/252/0/4/0', pct: 32.1 }
				]
			},
			{
				name: 'Gengar-Ultra', usage: 26.66, rank: 3, samples: 3223,
				baseStats: { hp: 60, atk: 65, def: 60, spa: 130, spd: 75, spe: 110 },
				moves: [
					{ name: 'Shadow Ball', pct: 98.5 },
					{ name: 'Sludge Wave', pct: 78.2 },
					{ name: 'Focus Blast', pct: 62.4 },
					{ name: 'Nasty Plot', pct: 45.1 }
				],
				teammates: [
					{ name: 'Landorus-Therian', pct: 28.4 },
					{ name: 'Corviknight', pct: 22.1 }
				],
				items: [{ name: 'Choice Specs', pct: 52.3 }, { name: 'Life Orb', pct: 38.2 }],
				abilities: [{ name: 'Cursed Body', pct: 100.0 }],
				evSpreads: [
					{ nature: 'Timid', spread: '0/0/0/252/4/252', pct: 68.4 }
				]
			},
			{
				name: 'Landorus-Therian', usage: 24.96, rank: 4, samples: 3018,
				baseStats: { hp: 89, atk: 145, def: 90, spa: 105, spd: 80, spe: 91 },
				moves: [
					{ name: 'Earthquake', pct: 99.1 },
					{ name: 'U-turn', pct: 85.4 },
					{ name: 'Stealth Rock', pct: 72.3 },
					{ name: 'Stone Edge', pct: 45.8 }
				],
				teammates: [
					{ name: 'Corviknight', pct: 32.1 },
					{ name: 'Gengar-Ultra', pct: 28.4 }
				],
				items: [{ name: 'Rocky Helmet', pct: 45.8 }, { name: 'Leftovers', pct: 32.1 }],
				abilities: [{ name: 'Intimidate', pct: 99.2 }],
				evSpreads: [
					{ nature: 'Impish', spread: '252/0/252/0/4/0', pct: 52.3 }
				]
			},
			{
				name: 'Ironvaliant', usage: 23.58, rank: 5, samples: 2851,
				baseStats: { hp: 74, atk: 130, def: 90, spa: 120, spd: 60, spe: 116 },
				moves: [
					{ name: 'Close Combat', pct: 92.4 },
					{ name: 'Moonblast', pct: 88.2 },
					{ name: 'Swords Dance', pct: 65.1 },
					{ name: 'Knock Off', pct: 42.3 }
				],
				teammates: [
					{ name: 'Ogerpon-Wellspring', pct: 25.4 },
					{ name: 'Alomomola', pct: 18.2 }
				],
				items: [{ name: 'Booster Energy', pct: 78.4 }],
				abilities: [{ name: 'Quark Drive', pct: 100.0 }],
				evSpreads: [
					{ nature: 'Jolly', spread: '0/252/0/0/4/252', pct: 58.2 }
				]
			},
			{
				name: 'Gliscor', usage: 23.54, rank: 6, samples: 2846,
				baseStats: { hp: 75, atk: 95, def: 125, spa: 45, spd: 75, spe: 95 },
				moves: [
					{ name: 'Earthquake', pct: 98.2 },
					{ name: 'Toxic', pct: 72.4 },
					{ name: 'Protect', pct: 68.1 },
					{ name: 'Roost', pct: 55.3 }
				],
				teammates: [
					{ name: 'Corviknight', pct: 28.4 },
					{ name: 'Alomomola', pct: 22.1 }
				],
				items: [{ name: 'Toxic Orb', pct: 95.2 }],
				abilities: [{ name: 'Poison Heal', pct: 95.2 }],
				evSpreads: [
					{ nature: 'Careful', spread: '244/0/8/0/200/56', pct: 42.1 }
				]
			},
			{
				name: 'Corviknight', usage: 22.34, rank: 7, samples: 2701,
				baseStats: { hp: 98, atk: 87, def: 105, spa: 53, spd: 85, spe: 67 },
				moves: [
					{ name: 'Brave Bird', pct: 92.1 },
					{ name: 'Roost', pct: 88.4 },
					{ name: 'Defog', pct: 72.3 },
					{ name: 'Body Press', pct: 52.4 }
				],
				teammates: [
					{ name: 'Landorus-Therian', pct: 32.1 },
					{ name: 'Alomomola', pct: 18.4 }
				],
				items: [{ name: 'Leftovers', pct: 52.3 }, { name: 'Rocky Helmet', pct: 38.2 }],
				abilities: [{ name: 'Pressure', pct: 68.4 }, { name: 'Mirror Armor', pct: 31.6 }],
				evSpreads: [
					{ nature: 'Impish', spread: '252/0/252/0/4/0', pct: 48.2 }
				]
			},
			{
				name: 'Moltres', usage: 21.72, rank: 8, samples: 2626,
				baseStats: { hp: 90, atk: 100, def: 90, spa: 125, spd: 85, spe: 90 },
				moves: [
					{ name: 'Flamethrower', pct: 88.2 },
					{ name: 'Hurricane', pct: 72.4 },
					{ name: 'Roost', pct: 65.1 },
					{ name: 'U-turn', pct: 42.3 }
				],
				teammates: [
					{ name: 'Ogerpon-Wellspring', pct: 28.4 },
					{ name: 'Landorus-Therian', pct: 22.1 }
				],
				items: [{ name: 'Heavy-Duty Boots', pct: 85.4 }],
				abilities: [{ name: 'Flame Body', pct: 72.3 }, { name: 'Pressure', pct: 27.7 }],
				evSpreads: [
					{ nature: 'Timid', spread: '0/0/0/252/4/252', pct: 52.3 }
				]
			},
			{
				name: 'Ferrothorn', usage: 21.30, rank: 9, samples: 2575,
				baseStats: { hp: 74, atk: 94, def: 131, spa: 54, spd: 116, spe: 20 },
				moves: [
					{ name: 'Stealth Rock', pct: 92.4 },
					{ name: 'Leech Seed', pct: 88.2 },
					{ name: 'Power Whip', pct: 72.1 },
					{ name: 'Knock Off', pct: 65.4 }
				],
				teammates: [
					{ name: 'Corviknight', pct: 32.4 },
					{ name: 'Alomomola', pct: 28.1 }
				],
				items: [{ name: 'Leftovers', pct: 78.4 }, { name: 'Rocky Helmet', pct: 21.6 }],
				abilities: [{ name: 'Iron Barbs', pct: 99.8 }],
				evSpreads: [
					{ nature: 'Relaxed', spread: '252/0/252/0/4/0', pct: 58.2 }
				]
			},
			{
				name: 'Kingambit', usage: 21.02, rank: 10, samples: 2541,
				baseStats: { hp: 100, atk: 135, def: 120, spa: 60, spd: 85, spe: 50 },
				moves: [
					{ name: 'Kowtow Cleave', pct: 98.2 },
					{ name: 'Sucker Punch', pct: 92.4 },
					{ name: 'Iron Head', pct: 72.1 },
					{ name: 'Swords Dance', pct: 58.3 }
				],
				teammates: [
					{ name: 'Landorus-Therian', pct: 32.1 },
					{ name: 'Corviknight', pct: 28.4 }
				],
				items: [{ name: 'Leftovers', pct: 45.2 }, { name: 'Air Balloon', pct: 32.1 }],
				abilities: [{ name: 'Supreme Overlord', pct: 98.2 }],
				evSpreads: [
					{ nature: 'Adamant', spread: '252/252/0/0/4/0', pct: 48.2 }
				]
			}
		];

		let selectedPokemon = pokemonData[0];

		// Render Pokemon List
		function renderPokemonList() {
			const container = document.getElementById('pokemon-list');
			container.innerHTML = '';

			pokemonData.forEach((pokemon, index) => {
				const item = document.createElement('div');
				item.className = \`pokemon-item \${index === 0 ? 'active' : ''}\`;
				item.dataset.index = index;

				item.innerHTML = \`
					<span class="pokemon-item-name">\${pokemon.name}</span>
					<span class="pokemon-item-usage">\${pokemon.usage.toFixed(2)}%</span>
				\`;

				item.addEventListener('click', () => {
					document.querySelectorAll('.pokemon-item').forEach(el => el.classList.remove('active'));
					item.classList.add('active');
					selectedPokemon = pokemonData[index];
					renderPokemonDetail();
				});

				container.appendChild(item);
			});
		}

		// Render Pokemon Detail
		function renderPokemonDetail() {
			const p = selectedPokemon;

			document.getElementById('pokemon-name').textContent = p.name;
			document.getElementById('usage-rank').textContent = \`#\${p.rank}\`;
			document.getElementById('usage-percent').textContent = \`\${p.usage.toFixed(2)}%\`;
			document.getElementById('usage-samples').textContent = p.samples.toLocaleString();

			// Base Stats
			const statsContainer = document.getElementById('base-stats');
			const statNames = ['HP', 'Attack', 'Defense', 'Sp. Atk', 'Sp. Def', 'Speed'];
			const statKeys = ['hp', 'atk', 'def', 'spa', 'spd', 'spe'];
			const maxStat = 255;

			statsContainer.innerHTML = statKeys.map((key, i) => {
				const value = p.baseStats[key];
				const percent = (value / maxStat) * 100;
				const color = value >= 100 ? '#22c55e' : value >= 70 ? '#eab308' : '#ef4444';
				return \`
					<div class="stat-row">
						<span class="stat-name">\${statNames[i]}</span>
						<span class="stat-num">\${value}</span>
						<div class="stat-bar-container">
							<div class="stat-bar" style="width: \${percent}%; background: \${color};"></div>
						</div>
					</div>
				\`;
			}).join('');

			// Moves
			const movesContainer = document.getElementById('moves-list');
			movesContainer.innerHTML = p.moves.map(m => \`
				<div class="list-item">
					<span class="item-name">\${m.name}</span>
					<span class="item-pct">\${m.pct.toFixed(2)}%</span>
				</div>
			\`).join('');

			// Teammates
			const teammatesContainer = document.getElementById('teammates-list');
			teammatesContainer.innerHTML = p.teammates.map(t => \`
				<div class="list-item teammate-item">
					<span class="item-name">\${t.name}</span>
					<span class="item-pct">\${t.pct.toFixed(2)}%</span>
				</div>
			\`).join('');

			// Items
			const itemsContainer = document.getElementById('items-list');
			itemsContainer.innerHTML = p.items.map(item => \`
				<div class="list-item">
					<span class="item-name">\${item.name}</span>
					<span class="item-pct">\${item.pct.toFixed(2)}%</span>
				</div>
			\`).join('');

			// Abilities
			const abilitiesContainer = document.getElementById('abilities-list');
			abilitiesContainer.innerHTML = p.abilities.map(a => \`
				<div class="list-item">
					<span class="item-name">\${a.name}</span>
					<span class="item-pct">\${a.pct.toFixed(2)}%</span>
				</div>
			\`).join('');

			// EV Spreads
			const evContainer = document.getElementById('ev-spreads-list');
			evContainer.innerHTML = p.evSpreads.map(ev => \`
				<div class="list-item ev-item">
					<span class="ev-nature">\${ev.nature}</span>
					<span class="ev-spread">\${ev.spread}</span>
					<span class="item-pct">\${ev.pct.toFixed(2)}%</span>
				</div>
			\`).join('');
		}

		// Tab handlers
		document.querySelectorAll('.format-tab').forEach(btn => {
			btn.addEventListener('click', () => {
				document.querySelectorAll('.format-tab').forEach(b => b.classList.remove('active'));
				btn.classList.add('active');
			});
		});

		document.querySelectorAll('.season-tab').forEach(btn => {
			btn.addEventListener('click', () => {
				document.querySelectorAll('.season-tab').forEach(b => b.classList.remove('active'));
				btn.classList.add('active');
			});
		});

		document.querySelectorAll('.stage-tab').forEach(btn => {
			btn.addEventListener('click', () => {
				document.querySelectorAll('.stage-tab').forEach(b => b.classList.remove('active'));
				btn.classList.add('active');
			});
		});

		// ELO Range Slider
		const eloMinSlider = document.getElementById('elo-min-slider');
		const eloMaxSlider = document.getElementById('elo-max-slider');
		const eloMinInput = document.getElementById('elo-min-input');
		const eloMaxInput = document.getElementById('elo-max-input');
		const eloSliderRange = document.getElementById('elo-slider-range');

		function updateSliderRange() {
			const min = parseInt(eloMinSlider.value);
			const max = parseInt(eloMaxSlider.value);
			const sliderMax = parseInt(eloMinSlider.max);

			const minPercent = (min / sliderMax) * 100;
			const maxPercent = (max / sliderMax) * 100;

			eloSliderRange.style.left = minPercent + '%';
			eloSliderRange.style.width = (maxPercent - minPercent) + '%';
		}

		function syncSliderToInput() {
			eloMinInput.value = eloMinSlider.value;
			eloMaxInput.value = eloMaxSlider.value;
			updateSliderRange();
		}

		function syncInputToSlider() {
			let minVal = parseInt(eloMinInput.value) || 0;
			let maxVal = parseInt(eloMaxInput.value) || 3000;

			// Ensure min doesn't exceed max
			if (minVal > maxVal) {
				minVal = maxVal;
				eloMinInput.value = minVal;
			}

			eloMinSlider.value = minVal;
			eloMaxSlider.value = maxVal;
			updateSliderRange();
		}

		eloMinSlider.addEventListener('input', () => {
			if (parseInt(eloMinSlider.value) > parseInt(eloMaxSlider.value)) {
				eloMinSlider.value = eloMaxSlider.value;
			}
			syncSliderToInput();
		});

		eloMaxSlider.addEventListener('input', () => {
			if (parseInt(eloMaxSlider.value) < parseInt(eloMinSlider.value)) {
				eloMaxSlider.value = eloMinSlider.value;
			}
			syncSliderToInput();
		});

		eloMinInput.addEventListener('change', syncInputToSlider);
		eloMaxInput.addEventListener('change', syncInputToSlider);

		// Initialize slider range
		updateSliderRange();

		// Initialize
		renderPokemonList();
		renderPokemonDetail();
	})();
	<\/script>  </body> </html>`], ['<html lang="en"> <head><meta charset="UTF-8"><meta name="viewport" content="width=device-width, initial-scale=1.0"><link rel="icon" type="image/png" href="/gashistudios.png"><meta name="description"', "><title>", '</title><meta property="og:title"', '><meta property="og:description"', '><meta name="theme-color" content="#7c3aed"><link rel="preconnect" href="https://fonts.googleapis.com"><link rel="preconnect" href="https://fonts.gstatic.com" crossorigin><link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800;900&family=Noto+Sans+JP:wght@400;500;700;900&display=swap" rel="stylesheet">', "</head> <body> ", ' <!-- Main Stats Layout --> <div class="stats-layout"> <!-- Left Sidebar --> <aside class="sidebar"> <!-- Format Selector --> <div class="sidebar-section"> <div class="section-label">Format</div> <div class="format-tabs"> <button class="format-tab active" data-format="SINGLES">Singles</button> <button class="format-tab" data-format="DOUBLES">Doubles</button> <button class="format-tab" data-format="TRIPLES">Triples</button> </div> </div> <!-- Season Selector --> <div class="sidebar-section"> <div class="section-label">Season</div> <div class="season-tabs"> <button class="season-tab" data-season="1">1</button> <button class="season-tab" data-season="2">2</button> <button class="season-tab" data-season="3">3</button> <button class="season-tab active" data-season="4">4</button> </div> </div> <!-- Season Stage --> <div class="sidebar-section"> <div class="section-label">Season Stage</div> <div class="stage-tabs"> <button class="stage-tab active" data-stage="MID">MID</button> <button class="stage-tab" data-stage="END">END</button> </div> </div> <!-- ELO Range Slider --> <div class="sidebar-section"> <div class="section-label">Elo Range</div> <div class="elo-range-container"> <div class="elo-range-inputs"> <div class="elo-input-group"> <input type="number" id="elo-min-input" class="elo-input" value="1000" min="0" max="3000"> </div> <div class="elo-input-group"> <input type="number" id="elo-max-input" class="elo-input" value="1500" min="0" max="3000"> </div> </div> <div class="elo-slider-container"> <div class="elo-slider-track"> <div class="elo-slider-range" id="elo-slider-range"></div> </div> <input type="range" id="elo-min-slider" class="elo-slider" min="0" max="3000" value="1000" step="50"> <input type="range" id="elo-max-slider" class="elo-slider" min="0" max="3000" value="1500" step="50"> </div> </div> </div> <!-- Pokemon Usage List --> <div class="sidebar-section pokemon-list-section"> <div class="pokemon-list" id="pokemon-list"> <!-- Populated by JavaScript --> </div> </div> </aside> <!-- Main Content --> <main class="main-content"> <!-- Pokemon Detail View --> <div class="pokemon-detail" id="pokemon-detail"> <!-- Header --> <div class="detail-header"> <h1 class="pokemon-title"> <span id="pokemon-name">Ogerpon-Wellspring</span> <span class="pokemon-types" id="pokemon-types"></span> </h1> <div class="usage-stats-summary"> <div class="stat-box"> <span class="stat-label">Usage Rank</span> <span class="stat-value rank" id="usage-rank">#1</span> </div> <div class="stat-box"> <span class="stat-label">Usage Percent</span> <span class="stat-value percent" id="usage-percent">32.58%</span> </div> <div class="stat-box"> <span class="stat-label">Samples</span> <span class="stat-value" id="usage-samples">3,939</span> </div> </div> </div> <!-- Detail Grid --> <div class="detail-grid"> <!-- Base Stats --> <div class="detail-card"> <h3 class="card-title">Base Stats</h3> <div class="base-stats" id="base-stats"> <!-- Populated by JavaScript --> </div> </div> <!-- Moves --> <div class="detail-card"> <h3 class="card-title">Moves</h3> <div class="moves-list" id="moves-list"> <!-- Populated by JavaScript --> </div> </div> <!-- Teammates --> <div class="detail-card"> <h3 class="card-title">Teammates</h3> <div class="teammates-list" id="teammates-list"> <!-- Populated by JavaScript --> </div> </div> <!-- Items --> <div class="detail-card"> <h3 class="card-title">Items</h3> <div class="items-list" id="items-list"> <!-- Populated by JavaScript --> </div> </div> <!-- Abilities --> <div class="detail-card"> <h3 class="card-title">Abilities</h3> <div class="abilities-list" id="abilities-list"> <!-- Populated by JavaScript --> </div> </div> <!-- EV Spreads --> <div class="detail-card ev-spreads-card"> <h3 class="card-title">EV Spreads (HP, Atk, Def, SpA, SpD, Spe)</h3> <div class="ev-spreads-list" id="ev-spreads-list"> <!-- Populated by JavaScript --> </div> </div> </div> </div> </main> </div> <!-- API Info Section --> <section class="api-info-section"> <div class="container"> <div class="api-card"> <div class="api-card-header"> <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"> <path d="M12 2L2 7l10 5 10-5-10-5z"></path> <path d="M2 17l10 5 10-5M2 12l10 5 10-5"></path> </svg> <h3>CobbleRanked Web API</h3> </div> <p class="api-desc">\nThis demo showcases data that can be synced from your CobbleRanked server to your website using the Web API integration.\n					Configure automatic sync intervals, API authentication, and customize what data to push.\n</p> <a href="/docs/cobbleranked/configuration/api/" class="api-link"> <span>Learn more about API configuration</span> <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"> <path d="M5 12h14M12 5l7 7-7 7"></path> </svg> </a> </div> </div> </section> ', " ", ` <script>
	(function() {
		// Demo Pokemon data with detailed stats
		const pokemonData = [
			{
				name: 'Ogerpon-Wellspring', usage: 32.58, rank: 1, samples: 3939,
				baseStats: { hp: 80, atk: 120, def: 84, spa: 60, spd: 96, spe: 110 },
				moves: [
					{ name: 'cobblemon.move.ivycudgel', pct: 100.0 },
					{ name: 'Horn Leech', pct: 78.55 },
					{ name: 'Swords Dance', pct: 75.88 },
					{ name: 'Superpower', pct: 34.48 },
					{ name: 'U-turn', pct: 30.41 }
				],
				teammates: [
					{ name: 'Moltres', pct: 18.99 },
					{ name: 'Ironvaliant', pct: 18.13 },
					{ name: 'Dragapult-Ultra', pct: 17.47 },
					{ name: 'Lopunny-Delta', pct: 15.26 },
					{ name: 'Alomomola', pct: 14.12 }
				],
				items: [{ name: 'Wellspring Mask', pct: 100.0 }],
				abilities: [{ name: 'Waterabsorb', pct: 100.0 }],
				evSpreads: [
					{ nature: 'Jolly', spread: '0/252/0/0/4/252', pct: 36.15 },
					{ nature: 'Jolly', spread: '4/252/0/0/0/252', pct: 20.03 },
					{ nature: 'Jolly', spread: '0/252/4/0/0/252', pct: 13.79 },
					{ nature: 'Jolly', spread: '0/252/0/0/0/252', pct: 11.63 },
					{ nature: 'Timid', spread: '0/252/0/0/4/252', pct: 7.72 }
				]
			},
			{
				name: 'Alomomola', usage: 30.09, rank: 2, samples: 3638,
				baseStats: { hp: 165, atk: 75, def: 80, spa: 40, spd: 45, spe: 65 },
				moves: [
					{ name: 'Flip Turn', pct: 95.2 },
					{ name: 'Wish', pct: 92.4 },
					{ name: 'Protect', pct: 88.1 },
					{ name: 'Scald', pct: 45.3 }
				],
				teammates: [
					{ name: 'Ogerpon-Wellspring', pct: 22.1 },
					{ name: 'Corviknight', pct: 18.4 },
					{ name: 'Ferrothorn', pct: 15.2 }
				],
				items: [{ name: 'Heavy-Duty Boots', pct: 78.4 }, { name: 'Leftovers', pct: 21.6 }],
				abilities: [{ name: 'Regenerator', pct: 100.0 }],
				evSpreads: [
					{ nature: 'Bold', spread: '252/0/252/0/4/0', pct: 45.2 },
					{ nature: 'Impish', spread: '252/0/252/0/4/0', pct: 32.1 }
				]
			},
			{
				name: 'Gengar-Ultra', usage: 26.66, rank: 3, samples: 3223,
				baseStats: { hp: 60, atk: 65, def: 60, spa: 130, spd: 75, spe: 110 },
				moves: [
					{ name: 'Shadow Ball', pct: 98.5 },
					{ name: 'Sludge Wave', pct: 78.2 },
					{ name: 'Focus Blast', pct: 62.4 },
					{ name: 'Nasty Plot', pct: 45.1 }
				],
				teammates: [
					{ name: 'Landorus-Therian', pct: 28.4 },
					{ name: 'Corviknight', pct: 22.1 }
				],
				items: [{ name: 'Choice Specs', pct: 52.3 }, { name: 'Life Orb', pct: 38.2 }],
				abilities: [{ name: 'Cursed Body', pct: 100.0 }],
				evSpreads: [
					{ nature: 'Timid', spread: '0/0/0/252/4/252', pct: 68.4 }
				]
			},
			{
				name: 'Landorus-Therian', usage: 24.96, rank: 4, samples: 3018,
				baseStats: { hp: 89, atk: 145, def: 90, spa: 105, spd: 80, spe: 91 },
				moves: [
					{ name: 'Earthquake', pct: 99.1 },
					{ name: 'U-turn', pct: 85.4 },
					{ name: 'Stealth Rock', pct: 72.3 },
					{ name: 'Stone Edge', pct: 45.8 }
				],
				teammates: [
					{ name: 'Corviknight', pct: 32.1 },
					{ name: 'Gengar-Ultra', pct: 28.4 }
				],
				items: [{ name: 'Rocky Helmet', pct: 45.8 }, { name: 'Leftovers', pct: 32.1 }],
				abilities: [{ name: 'Intimidate', pct: 99.2 }],
				evSpreads: [
					{ nature: 'Impish', spread: '252/0/252/0/4/0', pct: 52.3 }
				]
			},
			{
				name: 'Ironvaliant', usage: 23.58, rank: 5, samples: 2851,
				baseStats: { hp: 74, atk: 130, def: 90, spa: 120, spd: 60, spe: 116 },
				moves: [
					{ name: 'Close Combat', pct: 92.4 },
					{ name: 'Moonblast', pct: 88.2 },
					{ name: 'Swords Dance', pct: 65.1 },
					{ name: 'Knock Off', pct: 42.3 }
				],
				teammates: [
					{ name: 'Ogerpon-Wellspring', pct: 25.4 },
					{ name: 'Alomomola', pct: 18.2 }
				],
				items: [{ name: 'Booster Energy', pct: 78.4 }],
				abilities: [{ name: 'Quark Drive', pct: 100.0 }],
				evSpreads: [
					{ nature: 'Jolly', spread: '0/252/0/0/4/252', pct: 58.2 }
				]
			},
			{
				name: 'Gliscor', usage: 23.54, rank: 6, samples: 2846,
				baseStats: { hp: 75, atk: 95, def: 125, spa: 45, spd: 75, spe: 95 },
				moves: [
					{ name: 'Earthquake', pct: 98.2 },
					{ name: 'Toxic', pct: 72.4 },
					{ name: 'Protect', pct: 68.1 },
					{ name: 'Roost', pct: 55.3 }
				],
				teammates: [
					{ name: 'Corviknight', pct: 28.4 },
					{ name: 'Alomomola', pct: 22.1 }
				],
				items: [{ name: 'Toxic Orb', pct: 95.2 }],
				abilities: [{ name: 'Poison Heal', pct: 95.2 }],
				evSpreads: [
					{ nature: 'Careful', spread: '244/0/8/0/200/56', pct: 42.1 }
				]
			},
			{
				name: 'Corviknight', usage: 22.34, rank: 7, samples: 2701,
				baseStats: { hp: 98, atk: 87, def: 105, spa: 53, spd: 85, spe: 67 },
				moves: [
					{ name: 'Brave Bird', pct: 92.1 },
					{ name: 'Roost', pct: 88.4 },
					{ name: 'Defog', pct: 72.3 },
					{ name: 'Body Press', pct: 52.4 }
				],
				teammates: [
					{ name: 'Landorus-Therian', pct: 32.1 },
					{ name: 'Alomomola', pct: 18.4 }
				],
				items: [{ name: 'Leftovers', pct: 52.3 }, { name: 'Rocky Helmet', pct: 38.2 }],
				abilities: [{ name: 'Pressure', pct: 68.4 }, { name: 'Mirror Armor', pct: 31.6 }],
				evSpreads: [
					{ nature: 'Impish', spread: '252/0/252/0/4/0', pct: 48.2 }
				]
			},
			{
				name: 'Moltres', usage: 21.72, rank: 8, samples: 2626,
				baseStats: { hp: 90, atk: 100, def: 90, spa: 125, spd: 85, spe: 90 },
				moves: [
					{ name: 'Flamethrower', pct: 88.2 },
					{ name: 'Hurricane', pct: 72.4 },
					{ name: 'Roost', pct: 65.1 },
					{ name: 'U-turn', pct: 42.3 }
				],
				teammates: [
					{ name: 'Ogerpon-Wellspring', pct: 28.4 },
					{ name: 'Landorus-Therian', pct: 22.1 }
				],
				items: [{ name: 'Heavy-Duty Boots', pct: 85.4 }],
				abilities: [{ name: 'Flame Body', pct: 72.3 }, { name: 'Pressure', pct: 27.7 }],
				evSpreads: [
					{ nature: 'Timid', spread: '0/0/0/252/4/252', pct: 52.3 }
				]
			},
			{
				name: 'Ferrothorn', usage: 21.30, rank: 9, samples: 2575,
				baseStats: { hp: 74, atk: 94, def: 131, spa: 54, spd: 116, spe: 20 },
				moves: [
					{ name: 'Stealth Rock', pct: 92.4 },
					{ name: 'Leech Seed', pct: 88.2 },
					{ name: 'Power Whip', pct: 72.1 },
					{ name: 'Knock Off', pct: 65.4 }
				],
				teammates: [
					{ name: 'Corviknight', pct: 32.4 },
					{ name: 'Alomomola', pct: 28.1 }
				],
				items: [{ name: 'Leftovers', pct: 78.4 }, { name: 'Rocky Helmet', pct: 21.6 }],
				abilities: [{ name: 'Iron Barbs', pct: 99.8 }],
				evSpreads: [
					{ nature: 'Relaxed', spread: '252/0/252/0/4/0', pct: 58.2 }
				]
			},
			{
				name: 'Kingambit', usage: 21.02, rank: 10, samples: 2541,
				baseStats: { hp: 100, atk: 135, def: 120, spa: 60, spd: 85, spe: 50 },
				moves: [
					{ name: 'Kowtow Cleave', pct: 98.2 },
					{ name: 'Sucker Punch', pct: 92.4 },
					{ name: 'Iron Head', pct: 72.1 },
					{ name: 'Swords Dance', pct: 58.3 }
				],
				teammates: [
					{ name: 'Landorus-Therian', pct: 32.1 },
					{ name: 'Corviknight', pct: 28.4 }
				],
				items: [{ name: 'Leftovers', pct: 45.2 }, { name: 'Air Balloon', pct: 32.1 }],
				abilities: [{ name: 'Supreme Overlord', pct: 98.2 }],
				evSpreads: [
					{ nature: 'Adamant', spread: '252/252/0/0/4/0', pct: 48.2 }
				]
			}
		];

		let selectedPokemon = pokemonData[0];

		// Render Pokemon List
		function renderPokemonList() {
			const container = document.getElementById('pokemon-list');
			container.innerHTML = '';

			pokemonData.forEach((pokemon, index) => {
				const item = document.createElement('div');
				item.className = \\\`pokemon-item \\\${index === 0 ? 'active' : ''}\\\`;
				item.dataset.index = index;

				item.innerHTML = \\\`
					<span class="pokemon-item-name">\\\${pokemon.name}</span>
					<span class="pokemon-item-usage">\\\${pokemon.usage.toFixed(2)}%</span>
				\\\`;

				item.addEventListener('click', () => {
					document.querySelectorAll('.pokemon-item').forEach(el => el.classList.remove('active'));
					item.classList.add('active');
					selectedPokemon = pokemonData[index];
					renderPokemonDetail();
				});

				container.appendChild(item);
			});
		}

		// Render Pokemon Detail
		function renderPokemonDetail() {
			const p = selectedPokemon;

			document.getElementById('pokemon-name').textContent = p.name;
			document.getElementById('usage-rank').textContent = \\\`#\\\${p.rank}\\\`;
			document.getElementById('usage-percent').textContent = \\\`\\\${p.usage.toFixed(2)}%\\\`;
			document.getElementById('usage-samples').textContent = p.samples.toLocaleString();

			// Base Stats
			const statsContainer = document.getElementById('base-stats');
			const statNames = ['HP', 'Attack', 'Defense', 'Sp. Atk', 'Sp. Def', 'Speed'];
			const statKeys = ['hp', 'atk', 'def', 'spa', 'spd', 'spe'];
			const maxStat = 255;

			statsContainer.innerHTML = statKeys.map((key, i) => {
				const value = p.baseStats[key];
				const percent = (value / maxStat) * 100;
				const color = value >= 100 ? '#22c55e' : value >= 70 ? '#eab308' : '#ef4444';
				return \\\`
					<div class="stat-row">
						<span class="stat-name">\\\${statNames[i]}</span>
						<span class="stat-num">\\\${value}</span>
						<div class="stat-bar-container">
							<div class="stat-bar" style="width: \\\${percent}%; background: \\\${color};"></div>
						</div>
					</div>
				\\\`;
			}).join('');

			// Moves
			const movesContainer = document.getElementById('moves-list');
			movesContainer.innerHTML = p.moves.map(m => \\\`
				<div class="list-item">
					<span class="item-name">\\\${m.name}</span>
					<span class="item-pct">\\\${m.pct.toFixed(2)}%</span>
				</div>
			\\\`).join('');

			// Teammates
			const teammatesContainer = document.getElementById('teammates-list');
			teammatesContainer.innerHTML = p.teammates.map(t => \\\`
				<div class="list-item teammate-item">
					<span class="item-name">\\\${t.name}</span>
					<span class="item-pct">\\\${t.pct.toFixed(2)}%</span>
				</div>
			\\\`).join('');

			// Items
			const itemsContainer = document.getElementById('items-list');
			itemsContainer.innerHTML = p.items.map(item => \\\`
				<div class="list-item">
					<span class="item-name">\\\${item.name}</span>
					<span class="item-pct">\\\${item.pct.toFixed(2)}%</span>
				</div>
			\\\`).join('');

			// Abilities
			const abilitiesContainer = document.getElementById('abilities-list');
			abilitiesContainer.innerHTML = p.abilities.map(a => \\\`
				<div class="list-item">
					<span class="item-name">\\\${a.name}</span>
					<span class="item-pct">\\\${a.pct.toFixed(2)}%</span>
				</div>
			\\\`).join('');

			// EV Spreads
			const evContainer = document.getElementById('ev-spreads-list');
			evContainer.innerHTML = p.evSpreads.map(ev => \\\`
				<div class="list-item ev-item">
					<span class="ev-nature">\\\${ev.nature}</span>
					<span class="ev-spread">\\\${ev.spread}</span>
					<span class="item-pct">\\\${ev.pct.toFixed(2)}%</span>
				</div>
			\\\`).join('');
		}

		// Tab handlers
		document.querySelectorAll('.format-tab').forEach(btn => {
			btn.addEventListener('click', () => {
				document.querySelectorAll('.format-tab').forEach(b => b.classList.remove('active'));
				btn.classList.add('active');
			});
		});

		document.querySelectorAll('.season-tab').forEach(btn => {
			btn.addEventListener('click', () => {
				document.querySelectorAll('.season-tab').forEach(b => b.classList.remove('active'));
				btn.classList.add('active');
			});
		});

		document.querySelectorAll('.stage-tab').forEach(btn => {
			btn.addEventListener('click', () => {
				document.querySelectorAll('.stage-tab').forEach(b => b.classList.remove('active'));
				btn.classList.add('active');
			});
		});

		// ELO Range Slider
		const eloMinSlider = document.getElementById('elo-min-slider');
		const eloMaxSlider = document.getElementById('elo-max-slider');
		const eloMinInput = document.getElementById('elo-min-input');
		const eloMaxInput = document.getElementById('elo-max-input');
		const eloSliderRange = document.getElementById('elo-slider-range');

		function updateSliderRange() {
			const min = parseInt(eloMinSlider.value);
			const max = parseInt(eloMaxSlider.value);
			const sliderMax = parseInt(eloMinSlider.max);

			const minPercent = (min / sliderMax) * 100;
			const maxPercent = (max / sliderMax) * 100;

			eloSliderRange.style.left = minPercent + '%';
			eloSliderRange.style.width = (maxPercent - minPercent) + '%';
		}

		function syncSliderToInput() {
			eloMinInput.value = eloMinSlider.value;
			eloMaxInput.value = eloMaxSlider.value;
			updateSliderRange();
		}

		function syncInputToSlider() {
			let minVal = parseInt(eloMinInput.value) || 0;
			let maxVal = parseInt(eloMaxInput.value) || 3000;

			// Ensure min doesn't exceed max
			if (minVal > maxVal) {
				minVal = maxVal;
				eloMinInput.value = minVal;
			}

			eloMinSlider.value = minVal;
			eloMaxSlider.value = maxVal;
			updateSliderRange();
		}

		eloMinSlider.addEventListener('input', () => {
			if (parseInt(eloMinSlider.value) > parseInt(eloMaxSlider.value)) {
				eloMinSlider.value = eloMaxSlider.value;
			}
			syncSliderToInput();
		});

		eloMaxSlider.addEventListener('input', () => {
			if (parseInt(eloMaxSlider.value) < parseInt(eloMinSlider.value)) {
				eloMaxSlider.value = eloMinSlider.value;
			}
			syncSliderToInput();
		});

		eloMinInput.addEventListener('change', syncInputToSlider);
		eloMaxInput.addEventListener('change', syncInputToSlider);

		// Initialize slider range
		updateSliderRange();

		// Initialize
		renderPokemonList();
		renderPokemonDetail();
	})();
	<\/script>  </body> </html>`])), addAttribute(description, "content"), title, addAttribute(title, "content"), addAttribute(description, "content"), renderHead(), renderComponent($$result, "CustomNav", $$CustomNav, {}), renderComponent($$result, "Footer", $$Footer, {}), renderComponent($$result, "LanguageSwitcher", $$LanguageSwitcher, {}));
}, "C:/MinecraftModDev/projects_gashistudios/[GashiStudios]CobbleRanked_Reloaded/docs-site/src/pages/demo/ranked-stats.astro", void 0);

const $$file = "C:/MinecraftModDev/projects_gashistudios/[GashiStudios]CobbleRanked_Reloaded/docs-site/src/pages/demo/ranked-stats.astro";
const $$url = "/demo/ranked-stats";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
	__proto__: null,
	default: $$RankedStats,
	file: $$file,
	url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };

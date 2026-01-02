import { c as createComponent, r as renderTemplate, a as renderComponent, b as renderHead, d as addAttribute } from '../../chunks/astro/server_348rjAom.mjs';
import 'piccolore';
import { $ as $$CustomNav } from '../../chunks/CustomNav_B9qbyrj7.mjs';
import { $ as $$Footer } from '../../chunks/Footer_DueVcqUK.mjs';
import { $ as $$LanguageSwitcher } from '../../chunks/LanguageSwitcher_BukXjv8D.mjs';
/* empty css                                          */
export { renderers } from '../../renderers.mjs';

var __freeze = Object.freeze;
var __defProp = Object.defineProperty;
var __template = (cooked, raw) => __freeze(__defProp(cooked, "raw", { value: __freeze(raw || cooked.slice()) }));
var _a;
const $$Leaderboard = createComponent(async ($$result, $$props, $$slots) => {
  const title = "CobbleRanked Leaderboard Demo";
  const description = "Live demo of ranked leaderboard data from CobbleRanked API.";
  return renderTemplate(_a || (_a = __template(['<html lang="en"> <head><meta charset="UTF-8"><meta name="viewport" content="width=device-width, initial-scale=1.0"><link rel="icon" type="image/png" href="/gashistudios.png"><meta name="description"', "><title>", '</title><meta property="og:title"', '><meta property="og:description"', '><meta name="theme-color" content="#7c3aed"><link rel="preconnect" href="https://fonts.googleapis.com"><link rel="preconnect" href="https://fonts.gstatic.com" crossorigin><link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800;900&family=Noto+Sans+JP:wght@400;500;700;900&display=swap" rel="stylesheet">', "</head> <body> ", ' <!-- Hero Section --> <section class="hero-section"> <div class="hero-bg"></div> <div class="hero-content"> <h1 class="hero-title"> <span class="title-icon"> <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"> <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"></path> </svg> </span>\nRanked Leaderboard\n</h1> <p class="hero-subtitle">Top players competing for glory in CobbleRanked</p> <!-- Format Selector --> <div class="format-selector"> <button class="format-btn active" data-format="SINGLES">Singles</button> <button class="format-btn" data-format="DOUBLES">Doubles</button> <button class="format-btn" data-format="TRIPLES">Triples</button> </div> </div> </section> <!-- Leaderboard Section --> <section class="leaderboard-section"> <div class="container"> <!-- Season Info --> <div class="season-info"> <div class="season-badge"> <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"> <circle cx="12" cy="12" r="10"></circle> <path d="M12 6v6l4 2"></path> </svg> <span>Season 4</span> </div> <div class="last-updated">Last updated: Just now</div> </div> <!-- Leaderboard Table --> <div class="leaderboard-table-wrapper"> <table class="leaderboard-table" id="leaderboard-table"> <thead> <tr> <th class="col-rank">RANK</th> <th class="col-player">PLAYER</th> <th class="col-elo">ELO</th> <th class="col-tier">TIER</th> <th class="col-record">W / L</th> <th class="col-winrate">WIN RATE</th> <th class="col-streak">STREAK</th> <th class="col-best">BEST</th> </tr> </thead> <tbody id="leaderboard-body"> <!-- Populated by JavaScript --> </tbody> </table> </div> </div> </section> <!-- API Info Section --> <section class="api-info-section"> <div class="container"> <div class="api-card"> <div class="api-card-header"> <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"> <path d="M12 2L2 7l10 5 10-5-10-5z"></path> <path d="M2 17l10 5 10-5M2 12l10 5 10-5"></path> </svg> <h3>CobbleRanked Web API</h3> </div> <p class="api-desc">\nThis demo showcases leaderboard data that can be synced from your CobbleRanked server to your website using the Web API integration.\n					Display live rankings, player stats, and tier information on your community website.\n</p> <a href="/docs/cobbleranked/configuration/api/" class="api-link"> <span>Learn more about API configuration</span> <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"> <path d="M5 12h14M12 5l7 7-7 7"></path> </svg> </a> </div> </div> </section> ', " ", ` <script>
	(function() {
		// Tier definitions with colors
		const tiers = {
			CHERISH: { name: 'Cherish', color: '#ec4899', bg: 'rgba(236, 72, 153, 0.2)' },
			ULTRA: { name: 'Ultra', color: '#f59e0b', bg: 'rgba(245, 158, 11, 0.2)' },
			GREAT: { name: 'Great', color: '#3b82f6', bg: 'rgba(59, 130, 246, 0.2)' },
			POKE: { name: 'Poke', color: '#ef4444', bg: 'rgba(239, 68, 68, 0.2)' },
			PREMIER: { name: 'Premier', color: '#a1a1aa', bg: 'rgba(161, 161, 170, 0.2)' }
		};

		// State
		let leaderboardData = [];
		let currentSeason = 'Season4';
		let currentFormat = 'SINGLES';
		let isLoading = false;

		// Fetch leaderboard from API
		async function fetchLeaderboard() {
			isLoading = true;
			updateLoadingState();

			try {
				const response = await fetch(\`/api/cobbleranked/leaderboard?season=\${currentSeason}&format=\${currentFormat}\`);
				const data = await response.json();

				// Extract players from response
				if (data.players) {
					leaderboardData = data.players.map(p => ({
						rank: p.rank,
						uuid: p.uuid,
						name: p.name,
						elo: p.elo,
						tier: p.tier,
						wins: p.wins,
						losses: p.losses,
						streak: p.currentStreak || 0,
						best: p.bestStreak || 0
					}));
				} else if (data.seasons?.[currentSeason]?.formats?.[currentFormat]?.players) {
					leaderboardData = data.seasons[currentSeason].formats[currentFormat].players.map(p => ({
						rank: p.rank,
						uuid: p.uuid,
						name: p.name,
						elo: p.elo,
						tier: p.tier,
						wins: p.wins,
						losses: p.losses,
						streak: p.currentStreak || 0,
						best: p.bestStreak || 0
					}));
				}

				// Update demo indicator
				const lastUpdated = document.querySelector('.last-updated');
				if (data.isDemo) {
					lastUpdated.textContent = 'Demo Data';
					lastUpdated.style.color = '#f59e0b';
				} else {
					const timestamp = data.timestamp ? new Date(data.timestamp).toLocaleString() : 'Just now';
					lastUpdated.textContent = \`Last updated: \${timestamp}\`;
					lastUpdated.style.color = '';
				}
			} catch (error) {
				console.error('Failed to fetch leaderboard:', error);
			}

			isLoading = false;
			updateLoadingState();
			renderLeaderboard();
		}

		function updateLoadingState() {
			const tbody = document.getElementById('leaderboard-body');
			if (isLoading) {
				tbody.innerHTML = '<tr><td colspan="8" style="text-align: center; padding: 3rem; color: rgba(255,255,255,0.5);">Loading...</td></tr>';
			}
		}

		function getRankClass(rank) {
			if (rank === 1) return 'rank-gold';
			if (rank === 2) return 'rank-silver';
			if (rank === 3) return 'rank-bronze';
			return '';
		}

		function renderLeaderboard() {
			const tbody = document.getElementById('leaderboard-body');
			tbody.innerHTML = '';

			leaderboardData.forEach((player, index) => {
				const tier = tiers[player.tier];
				const winRate = ((player.wins / (player.wins + player.losses)) * 100).toFixed(1);
				const row = document.createElement('tr');
				row.className = 'leaderboard-row';
				row.style.animationDelay = \`\${index * 0.05}s\`;

				row.innerHTML = \`
					<td class="col-rank">
						<span class="rank-badge \${getRankClass(player.rank)}">#\${player.rank}</span>
					</td>
					<td class="col-player">
						<div class="player-info">
							<img
								class="player-avatar"
								src="https://crafatar.com/avatars/\${player.uuid}?size=32&overlay"
								alt="\${player.name}"
								loading="lazy"
							/>
							<span class="player-name" style="background: \${tier.bg}; color: \${tier.color};">\${player.name}</span>
						</div>
					</td>
					<td class="col-elo">
						<span class="elo-value">\${player.elo.toLocaleString()}</span>
					</td>
					<td class="col-tier">
						<span class="tier-badge" style="background: \${tier.bg}; color: \${tier.color}; border-color: \${tier.color};">
							\${tier.name}
						</span>
					</td>
					<td class="col-record">
						<span class="wins">\${player.wins}</span>
						<span class="separator">/</span>
						<span class="losses">\${player.losses}</span>
					</td>
					<td class="col-winrate">
						<div class="winrate-container">
							<span class="winrate-value">\${winRate}%</span>
							<div class="winrate-bar">
								<div class="winrate-fill" style="width: \${winRate}%;"></div>
							</div>
						</div>
					</td>
					<td class="col-streak">
						<span class="streak-value \${player.streak > 0 ? 'positive' : ''}">\${player.streak > 0 ? '+' + player.streak : player.streak}</span>
					</td>
					<td class="col-best">
						<span class="best-value">\${player.best}</span>
					</td>
				\`;

				tbody.appendChild(row);
			});
		}

		// Format selector
		document.querySelectorAll('.format-btn').forEach(btn => {
			btn.addEventListener('click', () => {
				document.querySelectorAll('.format-btn').forEach(b => b.classList.remove('active'));
				btn.classList.add('active');
				currentFormat = btn.dataset.format;
				fetchLeaderboard();
			});
		});

		// Initialize - fetch from API
		fetchLeaderboard();
	})();
	<\/script>  </body> </html>`], ['<html lang="en"> <head><meta charset="UTF-8"><meta name="viewport" content="width=device-width, initial-scale=1.0"><link rel="icon" type="image/png" href="/gashistudios.png"><meta name="description"', "><title>", '</title><meta property="og:title"', '><meta property="og:description"', '><meta name="theme-color" content="#7c3aed"><link rel="preconnect" href="https://fonts.googleapis.com"><link rel="preconnect" href="https://fonts.gstatic.com" crossorigin><link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800;900&family=Noto+Sans+JP:wght@400;500;700;900&display=swap" rel="stylesheet">', "</head> <body> ", ' <!-- Hero Section --> <section class="hero-section"> <div class="hero-bg"></div> <div class="hero-content"> <h1 class="hero-title"> <span class="title-icon"> <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"> <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"></path> </svg> </span>\nRanked Leaderboard\n</h1> <p class="hero-subtitle">Top players competing for glory in CobbleRanked</p> <!-- Format Selector --> <div class="format-selector"> <button class="format-btn active" data-format="SINGLES">Singles</button> <button class="format-btn" data-format="DOUBLES">Doubles</button> <button class="format-btn" data-format="TRIPLES">Triples</button> </div> </div> </section> <!-- Leaderboard Section --> <section class="leaderboard-section"> <div class="container"> <!-- Season Info --> <div class="season-info"> <div class="season-badge"> <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"> <circle cx="12" cy="12" r="10"></circle> <path d="M12 6v6l4 2"></path> </svg> <span>Season 4</span> </div> <div class="last-updated">Last updated: Just now</div> </div> <!-- Leaderboard Table --> <div class="leaderboard-table-wrapper"> <table class="leaderboard-table" id="leaderboard-table"> <thead> <tr> <th class="col-rank">RANK</th> <th class="col-player">PLAYER</th> <th class="col-elo">ELO</th> <th class="col-tier">TIER</th> <th class="col-record">W / L</th> <th class="col-winrate">WIN RATE</th> <th class="col-streak">STREAK</th> <th class="col-best">BEST</th> </tr> </thead> <tbody id="leaderboard-body"> <!-- Populated by JavaScript --> </tbody> </table> </div> </div> </section> <!-- API Info Section --> <section class="api-info-section"> <div class="container"> <div class="api-card"> <div class="api-card-header"> <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"> <path d="M12 2L2 7l10 5 10-5-10-5z"></path> <path d="M2 17l10 5 10-5M2 12l10 5 10-5"></path> </svg> <h3>CobbleRanked Web API</h3> </div> <p class="api-desc">\nThis demo showcases leaderboard data that can be synced from your CobbleRanked server to your website using the Web API integration.\n					Display live rankings, player stats, and tier information on your community website.\n</p> <a href="/docs/cobbleranked/configuration/api/" class="api-link"> <span>Learn more about API configuration</span> <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"> <path d="M5 12h14M12 5l7 7-7 7"></path> </svg> </a> </div> </div> </section> ', " ", ` <script>
	(function() {
		// Tier definitions with colors
		const tiers = {
			CHERISH: { name: 'Cherish', color: '#ec4899', bg: 'rgba(236, 72, 153, 0.2)' },
			ULTRA: { name: 'Ultra', color: '#f59e0b', bg: 'rgba(245, 158, 11, 0.2)' },
			GREAT: { name: 'Great', color: '#3b82f6', bg: 'rgba(59, 130, 246, 0.2)' },
			POKE: { name: 'Poke', color: '#ef4444', bg: 'rgba(239, 68, 68, 0.2)' },
			PREMIER: { name: 'Premier', color: '#a1a1aa', bg: 'rgba(161, 161, 170, 0.2)' }
		};

		// State
		let leaderboardData = [];
		let currentSeason = 'Season4';
		let currentFormat = 'SINGLES';
		let isLoading = false;

		// Fetch leaderboard from API
		async function fetchLeaderboard() {
			isLoading = true;
			updateLoadingState();

			try {
				const response = await fetch(\\\`/api/cobbleranked/leaderboard?season=\\\${currentSeason}&format=\\\${currentFormat}\\\`);
				const data = await response.json();

				// Extract players from response
				if (data.players) {
					leaderboardData = data.players.map(p => ({
						rank: p.rank,
						uuid: p.uuid,
						name: p.name,
						elo: p.elo,
						tier: p.tier,
						wins: p.wins,
						losses: p.losses,
						streak: p.currentStreak || 0,
						best: p.bestStreak || 0
					}));
				} else if (data.seasons?.[currentSeason]?.formats?.[currentFormat]?.players) {
					leaderboardData = data.seasons[currentSeason].formats[currentFormat].players.map(p => ({
						rank: p.rank,
						uuid: p.uuid,
						name: p.name,
						elo: p.elo,
						tier: p.tier,
						wins: p.wins,
						losses: p.losses,
						streak: p.currentStreak || 0,
						best: p.bestStreak || 0
					}));
				}

				// Update demo indicator
				const lastUpdated = document.querySelector('.last-updated');
				if (data.isDemo) {
					lastUpdated.textContent = 'Demo Data';
					lastUpdated.style.color = '#f59e0b';
				} else {
					const timestamp = data.timestamp ? new Date(data.timestamp).toLocaleString() : 'Just now';
					lastUpdated.textContent = \\\`Last updated: \\\${timestamp}\\\`;
					lastUpdated.style.color = '';
				}
			} catch (error) {
				console.error('Failed to fetch leaderboard:', error);
			}

			isLoading = false;
			updateLoadingState();
			renderLeaderboard();
		}

		function updateLoadingState() {
			const tbody = document.getElementById('leaderboard-body');
			if (isLoading) {
				tbody.innerHTML = '<tr><td colspan="8" style="text-align: center; padding: 3rem; color: rgba(255,255,255,0.5);">Loading...</td></tr>';
			}
		}

		function getRankClass(rank) {
			if (rank === 1) return 'rank-gold';
			if (rank === 2) return 'rank-silver';
			if (rank === 3) return 'rank-bronze';
			return '';
		}

		function renderLeaderboard() {
			const tbody = document.getElementById('leaderboard-body');
			tbody.innerHTML = '';

			leaderboardData.forEach((player, index) => {
				const tier = tiers[player.tier];
				const winRate = ((player.wins / (player.wins + player.losses)) * 100).toFixed(1);
				const row = document.createElement('tr');
				row.className = 'leaderboard-row';
				row.style.animationDelay = \\\`\\\${index * 0.05}s\\\`;

				row.innerHTML = \\\`
					<td class="col-rank">
						<span class="rank-badge \\\${getRankClass(player.rank)}">#\\\${player.rank}</span>
					</td>
					<td class="col-player">
						<div class="player-info">
							<img
								class="player-avatar"
								src="https://crafatar.com/avatars/\\\${player.uuid}?size=32&overlay"
								alt="\\\${player.name}"
								loading="lazy"
							/>
							<span class="player-name" style="background: \\\${tier.bg}; color: \\\${tier.color};">\\\${player.name}</span>
						</div>
					</td>
					<td class="col-elo">
						<span class="elo-value">\\\${player.elo.toLocaleString()}</span>
					</td>
					<td class="col-tier">
						<span class="tier-badge" style="background: \\\${tier.bg}; color: \\\${tier.color}; border-color: \\\${tier.color};">
							\\\${tier.name}
						</span>
					</td>
					<td class="col-record">
						<span class="wins">\\\${player.wins}</span>
						<span class="separator">/</span>
						<span class="losses">\\\${player.losses}</span>
					</td>
					<td class="col-winrate">
						<div class="winrate-container">
							<span class="winrate-value">\\\${winRate}%</span>
							<div class="winrate-bar">
								<div class="winrate-fill" style="width: \\\${winRate}%;"></div>
							</div>
						</div>
					</td>
					<td class="col-streak">
						<span class="streak-value \\\${player.streak > 0 ? 'positive' : ''}">\\\${player.streak > 0 ? '+' + player.streak : player.streak}</span>
					</td>
					<td class="col-best">
						<span class="best-value">\\\${player.best}</span>
					</td>
				\\\`;

				tbody.appendChild(row);
			});
		}

		// Format selector
		document.querySelectorAll('.format-btn').forEach(btn => {
			btn.addEventListener('click', () => {
				document.querySelectorAll('.format-btn').forEach(b => b.classList.remove('active'));
				btn.classList.add('active');
				currentFormat = btn.dataset.format;
				fetchLeaderboard();
			});
		});

		// Initialize - fetch from API
		fetchLeaderboard();
	})();
	<\/script>  </body> </html>`])), addAttribute(description, "content"), title, addAttribute(title, "content"), addAttribute(description, "content"), renderHead(), renderComponent($$result, "CustomNav", $$CustomNav, {}), renderComponent($$result, "Footer", $$Footer, {}), renderComponent($$result, "LanguageSwitcher", $$LanguageSwitcher, {}));
}, "C:/MinecraftModDev/projects_gashistudios/[GashiStudios]CobbleRanked_Reloaded/docs-site/src/pages/demo/leaderboard.astro", void 0);

const $$file = "C:/MinecraftModDev/projects_gashistudios/[GashiStudios]CobbleRanked_Reloaded/docs-site/src/pages/demo/leaderboard.astro";
const $$url = "/demo/leaderboard";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
	__proto__: null,
	default: $$Leaderboard,
	file: $$file,
	url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };

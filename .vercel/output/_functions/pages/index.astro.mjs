import { c as createComponent, r as renderTemplate, m as maybeRenderHead, g as addAttribute, f as createAstro, k as renderHead, e as renderComponent } from '../chunks/astro/server_CKVJvFjE.mjs';
import 'piccolore';
import 'clsx';
/* empty css                                 */
import { $ as $$CustomNav } from '../chunks/CustomNav_dP_5Sj4s.mjs';
import { $ as $$Footer } from '../chunks/Footer_CxIz2zQ0.mjs';
import { $ as $$LanguageSwitcher } from '../chunks/LanguageSwitcher_CGPpBOMe.mjs';
export { renderers } from '../renderers.mjs';

var __freeze$4 = Object.freeze;
var __defProp$4 = Object.defineProperty;
var __template$4 = (cooked, raw) => __freeze$4(__defProp$4(cooked, "raw", { value: __freeze$4(cooked.slice()) }));
var _a$4;
const $$LoadingScreen = createComponent(($$result, $$props, $$slots) => {
  return renderTemplate(_a$4 || (_a$4 = __template$4(["", `<div id="loading-screen" class="loading-screen" data-astro-cid-g2nbzz2z> <div class="swipe-overlay" data-astro-cid-g2nbzz2z></div> </div> <script>
(function() {
	const hasVisited = sessionStorage.getItem('hasVisited');
	const loadingScreen = document.getElementById('loading-screen');

	if (hasVisited) {
		loadingScreen.style.display = 'none';
		document.body.classList.add('page-revealed');
		return;
	}

	sessionStorage.setItem('hasVisited', 'true');

	// Start reveal animation after brief delay
	setTimeout(() => {
		loadingScreen.classList.add('reveal');

		// After swipe completes, fade in content
		setTimeout(() => {
			document.body.classList.add('page-revealing');
		}, 350);

		// Remove loading screen and finalize
		setTimeout(() => {
			loadingScreen.style.display = 'none';
			document.body.classList.remove('page-revealing');
			document.body.classList.add('page-revealed');
		}, 1100);
	}, 200);
})();
<\/script>  `])), maybeRenderHead());
}, "C:/MinecraftModDev/projects_gashistudios/[GashiStudios]CobbleRanked_Reloaded/docs-site/src/components/LoadingScreen.astro", void 0);

const gashiAvatar = new Proxy({"src":"/_astro/gashi.BYaTC0lK.png","width":372,"height":372,"format":"png"}, {
						get(target, name, receiver) {
							if (name === 'clone') {
								return structuredClone(target);
							}
							if (name === 'fsPath') {
								return "C:/MinecraftModDev/projects_gashistudios/[GashiStudios]CobbleRanked_Reloaded/docs-site/src/assets/gashi.png";
							}
							
							return target[name];
						}
					});

const polymartLogo = new Proxy({"src":"/_astro/polymart.bvorG-Dx.png","width":200,"height":200,"format":"png"}, {
						get(target, name, receiver) {
							if (name === 'clone') {
								return structuredClone(target);
							}
							if (name === 'fsPath') {
								return "C:/MinecraftModDev/projects_gashistudios/[GashiStudios]CobbleRanked_Reloaded/docs-site/src/assets/polymart.png";
							}
							
							return target[name];
						}
					});

var __freeze$3 = Object.freeze;
var __defProp$3 = Object.defineProperty;
var __template$3 = (cooked, raw) => __freeze$3(__defProp$3(cooked, "raw", { value: __freeze$3(raw || cooked.slice()) }));
var _a$3;
const $$HeroSection = createComponent(($$result, $$props, $$slots) => {
  return renderTemplate(_a$3 || (_a$3 = __template$3(["", '<section class="hero-section" id="hero" data-astro-cid-nlow4r3u> <!-- Animated Decorative Elements - Left Side --> <div class="deco-grid deco-left" data-parallax="0.02" data-astro-cid-nlow4r3u> <!-- Text Scramble Effect (Sci-fi decode) --> <div class="deco-box deco-scramble" data-shuffle style="--delay: 0.1s" data-astro-cid-nlow4r3u> <span class="scramble-text" data-final="SYSTEM" data-astro-cid-nlow4r3u>******</span> </div> <!-- Morphing Blob --> <div class="deco-box deco-blob" data-shuffle style="--delay: 0.2s" data-astro-cid-nlow4r3u> <div class="blob-shape" data-astro-cid-nlow4r3u></div> </div> <!-- Neon Flicker Text --> <div class="deco-box deco-neon" data-shuffle style="--delay: 0.3s" data-astro-cid-nlow4r3u> <span class="neon-text" data-astro-cid-nlow4r3u>ONLINE</span> </div> <!-- Floating Particles --> <div class="deco-box deco-particles" data-shuffle style="--delay: 0.4s" data-astro-cid-nlow4r3u> <span class="particle" style="--x: 20%; --y: 30%; --d: 2s" data-astro-cid-nlow4r3u></span> <span class="particle" style="--x: 70%; --y: 60%; --d: 2.5s" data-astro-cid-nlow4r3u></span> <span class="particle" style="--x: 40%; --y: 80%; --d: 3s" data-astro-cid-nlow4r3u></span> <span class="particle" style="--x: 80%; --y: 20%; --d: 2.2s" data-astro-cid-nlow4r3u></span> <span class="particle" style="--x: 10%; --y: 50%; --d: 2.8s" data-astro-cid-nlow4r3u></span> </div> <!-- Wave Text --> <div class="deco-box deco-wave-text" data-shuffle style="--delay: 0.5s" data-astro-cid-nlow4r3u> <span class="wave-char" style="--i: 0" data-astro-cid-nlow4r3u>W</span> <span class="wave-char" style="--i: 1" data-astro-cid-nlow4r3u>A</span> <span class="wave-char" style="--i: 2" data-astro-cid-nlow4r3u>V</span> <span class="wave-char" style="--i: 3" data-astro-cid-nlow4r3u>E</span> </div> <!-- Counter Animation --> <div class="deco-box deco-counter" data-shuffle style="--delay: 0.6s" data-astro-cid-nlow4r3u> <span class="counter-value" data-target="100" data-astro-cid-nlow4r3u>0</span> <span class="counter-label" data-astro-cid-nlow4r3u>%</span> </div> <!-- Japanese Characters with Glitch --> <div class="deco-box deco-japanese" data-shuffle style="--delay: 0.7s" data-astro-cid-nlow4r3u> <span class="char" data-glitch style="--i: 0" data-astro-cid-nlow4r3u>\u3042</span> <span class="char" data-glitch style="--i: 1" data-astro-cid-nlow4r3u>\u308A</span> <span class="char" data-glitch style="--i: 2" data-astro-cid-nlow4r3u>\u304C</span> <span class="char" data-glitch style="--i: 3" data-astro-cid-nlow4r3u>\u3068</span> <span class="char" data-glitch style="--i: 4" data-astro-cid-nlow4r3u>\u3046</span> </div> <!-- Matrix Rain (mini) --> <div class="deco-box deco-matrix" data-shuffle style="--delay: 0.8s" data-astro-cid-nlow4r3u> <div class="matrix-column" style="--col: 0" data-astro-cid-nlow4r3u></div> <div class="matrix-column" style="--col: 1" data-astro-cid-nlow4r3u></div> <div class="matrix-column" style="--col: 2" data-astro-cid-nlow4r3u></div> <div class="matrix-column" style="--col: 3" data-astro-cid-nlow4r3u></div> <div class="matrix-column" style="--col: 4" data-astro-cid-nlow4r3u></div> </div> <!-- Magnetic Element --> <div class="deco-box deco-magnetic" data-shuffle data-magnetic style="--delay: 0.9s" data-astro-cid-nlow4r3u> <div class="magnetic-core" data-astro-cid-nlow4r3u></div> </div> <!-- Orbit Animation --> <div class="deco-box deco-orbit" data-shuffle style="--delay: 1.0s" data-astro-cid-nlow4r3u> <div class="orbit-center" data-astro-cid-nlow4r3u></div> <div class="orbit-ring" data-astro-cid-nlow4r3u> <span class="orbit-dot" data-astro-cid-nlow4r3u></span> </div> </div> </div> <!-- Main Content --> <div class="hero-main" data-astro-cid-nlow4r3u> <div class="hero-container" data-astro-cid-nlow4r3u> <!-- Left: Avatar & Intro --> <div class="hero-left" data-astro-cid-nlow4r3u> <div class="avatar-wrapper" data-astro-cid-nlow4r3u> <img', ` alt="Gashi" class="avatar" data-astro-cid-nlow4r3u> </div> <div class="intro-text" data-astro-cid-nlow4r3u> <p class="greeting" data-i18n="greeting" data-astro-cid-nlow4r3u>Hey there, I'm</p> <h1 class="name" data-astro-cid-nlow4r3u> <span class="name-char" data-glitch style="--i: 0" data-astro-cid-nlow4r3u>G</span> <span class="name-char" data-glitch style="--i: 1" data-astro-cid-nlow4r3u>a</span> <span class="name-char" data-glitch style="--i: 2" data-astro-cid-nlow4r3u>s</span> <span class="name-char" data-glitch style="--i: 3" data-astro-cid-nlow4r3u>h</span> <span class="name-char" data-glitch style="--i: 4" data-astro-cid-nlow4r3u>i</span> </h1> </div> <p class="bio" data-i18n="bio" data-astro-cid-nlow4r3u>
Minecraft Mod\u958B\u767A\u8005\u3002<br data-astro-cid-nlow4r3u>
Cobblemon\u5411\u3051\u306E\u9AD8\u54C1\u8CEA\u306AMod\u3092\u5236\u4F5C\u3057\u3066\u3044\u307E\u3059\u3002<br data-astro-cid-nlow4r3u>
\u304A\u554F\u3044\u5408\u308F\u305B\u306F <code data-astro-cid-nlow4r3u>@gashicha</code> \u307E\u3067\u3002
</p> <!-- Social Links by Category --> <div class="links-by-category" data-astro-cid-nlow4r3u> <!-- Development --> <div class="link-category" data-astro-cid-nlow4r3u> <span class="category-label" data-i18n="linksDev" data-astro-cid-nlow4r3u>Development</span> <div class="link-row" data-astro-cid-nlow4r3u> <a href="https://github.com/gqrshy" target="_blank" rel="noopener noreferrer" title="GitHub" class="link-btn" data-astro-cid-nlow4r3u> <img src="https://cdn.simpleicons.org/github/white" alt="GitHub" data-astro-cid-nlow4r3u> </a> <a href="https://modrinth.com/user/gashicha" target="_blank" rel="noopener noreferrer" title="Modrinth" class="link-btn" data-astro-cid-nlow4r3u> <img src="https://cdn.simpleicons.org/modrinth/1bd96a" alt="Modrinth" data-astro-cid-nlow4r3u> </a> <a href="https://www.curseforge.com/members/gqrshy/projects" target="_blank" rel="noopener noreferrer" title="CurseForge" class="link-btn" data-astro-cid-nlow4r3u> <img src="https://cdn.simpleicons.org/curseforge/f16436" alt="CurseForge" data-astro-cid-nlow4r3u> </a> <a href="https://polymart.org/user/47282/gashi" target="_blank" rel="noopener noreferrer" title="Polymart" class="link-btn" data-astro-cid-nlow4r3u> <img`, ` alt="Polymart" data-astro-cid-nlow4r3u> </a> </div> </div> <!-- Hobbies --> <div class="link-category" data-astro-cid-nlow4r3u> <span class="category-label" data-i18n="linksHobby" data-astro-cid-nlow4r3u>Hobbies</span> <div class="link-row" data-astro-cid-nlow4r3u> <a href="https://www.youtube.com/@Gqrshy" target="_blank" rel="noopener noreferrer" title="YouTube" class="link-btn" data-astro-cid-nlow4r3u> <img src="https://cdn.simpleicons.org/youtube/ff0000" alt="YouTube" data-astro-cid-nlow4r3u> </a> <a href="https://x.com/Gqrshy" target="_blank" rel="noopener noreferrer" title="X" class="link-btn" data-astro-cid-nlow4r3u> <img src="https://cdn.simpleicons.org/x/white" alt="X" data-astro-cid-nlow4r3u> </a> <a href="https://note.com/gashicha" target="_blank" rel="noopener noreferrer" title="note" class="link-btn" data-astro-cid-nlow4r3u> <img src="https://cdn.simpleicons.org/note/41c9b4" alt="note" data-astro-cid-nlow4r3u> </a> </div> </div> <!-- Gaming --> <div class="link-category" data-astro-cid-nlow4r3u> <span class="category-label" data-i18n="linksGaming" data-astro-cid-nlow4r3u>Gaming</span> <div class="link-row" data-astro-cid-nlow4r3u> <a href="https://steamcommunity.com/profiles/76561199134198471/" target="_blank" rel="noopener noreferrer" title="Steam" class="link-btn" data-astro-cid-nlow4r3u> <img src="https://cdn.simpleicons.org/steam/white" alt="Steam" data-astro-cid-nlow4r3u> </a> <a href="https://tracker.gg/valorant/profile/riot/%E5%B9%B3%E5%92%8C%E4%B8%BB%E7%BE%A9%E8%80%85%23peko/overview?platform=pc&playlist=competitive" target="_blank" rel="noopener noreferrer" title="Valorant" class="link-btn" data-astro-cid-nlow4r3u> <img src="https://cdn.simpleicons.org/valorant/ff4655" alt="Valorant" data-astro-cid-nlow4r3u> </a> <a href="https://op.gg/ja/lol/summoners/jp/%E5%B9%B3%E5%92%8C%E4%B8%BB%E7%BE%A9%E8%80%85-peko" target="_blank" rel="noopener noreferrer" title="League of Legends" class="link-btn" data-astro-cid-nlow4r3u> <img src="https://cdn.simpleicons.org/leagueoflegends/c28f2c" alt="LoL" data-astro-cid-nlow4r3u> </a> </div> </div> </div> </div> <!-- Right: Quick Info --> <div class="hero-right" data-astro-cid-nlow4r3u> <div class="info-row" data-astro-cid-nlow4r3u> <span class="info-label" data-i18n="labelSkills" data-astro-cid-nlow4r3u>Skills</span> <span class="info-content" data-astro-cid-nlow4r3u>Java, Kotlin, TypeScript, HTML, CSS, etc...</span> </div> <div class="info-row" data-astro-cid-nlow4r3u> <span class="info-label" data-i18n="labelTools" data-astro-cid-nlow4r3u>Design Tools</span> <span class="info-content" data-astro-cid-nlow4r3u>Figma, Adobe Illustrator, Adobe Photoshop, etc...</span> </div> <div class="info-row" data-astro-cid-nlow4r3u> <span class="info-label" data-i18n="labelFields" data-astro-cid-nlow4r3u>Fields</span> <span class="info-content" data-i18n="fieldsContent" data-astro-cid-nlow4r3u>Game Design, UI Design, UI Animation, Web Frontend</span> </div> <div class="info-row" data-astro-cid-nlow4r3u> <span class="info-label" data-astro-cid-nlow4r3u>MBTI</span> <span class="info-content info-highlight" data-astro-cid-nlow4r3u>ISFP</span> </div> <div class="hero-buttons" data-astro-cid-nlow4r3u> <a href="https://discord.gg/VVVvBTqqyP" target="_blank" class="btn-discord" data-astro-cid-nlow4r3u> <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" data-astro-cid-nlow4r3u> <path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0 12.64 12.64 0 0 0-.617-1.25.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.057 19.9 19.9 0 0 0 5.993 3.03.078.078 0 0 0 .084-.028 14.09 14.09 0 0 0 1.226-1.994.076.076 0 0 0-.041-.106 13.107 13.107 0 0 1-1.872-.892.077.077 0 0 1-.008-.128 10.2 10.2 0 0 0 .372-.292.074.074 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127 12.299 12.299 0 0 1-1.873.892.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028 19.839 19.839 0 0 0 6.002-3.03.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.03zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.956-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.955-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.946 2.418-2.157 2.418z" data-astro-cid-nlow4r3u></path> </svg> <span data-i18n="joinDiscord" data-astro-cid-nlow4r3u>Join Discord</span> </a> <a href="/docs/cobbleranked/" class="btn-docs" data-astro-cid-nlow4r3u> <span data-i18n="viewDocs" data-astro-cid-nlow4r3u>View Documents</span> </a> </div> </div> </div> </div> <!-- Animated Decorative Elements - Right Side --> <div class="deco-grid deco-right" data-parallax="-0.02" data-astro-cid-nlow4r3u> <!-- Text Scramble (different text) --> <div class="deco-box deco-scramble" data-shuffle style="--delay: 0.15s" data-astro-cid-nlow4r3u> <span class="scramble-text" data-final="READY" data-astro-cid-nlow4r3u>*****</span> </div> <!-- DNA Helix --> <div class="deco-box deco-dna" data-shuffle style="--delay: 0.25s" data-astro-cid-nlow4r3u> <div class="dna-strand" data-astro-cid-nlow4r3u> <span style="--i: 0" data-astro-cid-nlow4r3u></span> <span style="--i: 1" data-astro-cid-nlow4r3u></span> <span style="--i: 2" data-astro-cid-nlow4r3u></span> <span style="--i: 3" data-astro-cid-nlow4r3u></span> <span style="--i: 4" data-astro-cid-nlow4r3u></span> </div> </div> <!-- Glitch Box --> <div class="deco-box deco-glitch-box" data-shuffle style="--delay: 0.35s" data-astro-cid-nlow4r3u> <div class="glitch-layer" data-astro-cid-nlow4r3u></div> <div class="glitch-layer" data-astro-cid-nlow4r3u></div> <div class="glitch-layer" data-astro-cid-nlow4r3u></div> </div> <!-- Typing Cursor --> <div class="deco-box deco-typing" data-shuffle style="--delay: 0.45s" data-astro-cid-nlow4r3u> <span class="typing-text" data-astro-cid-nlow4r3u></span> <span class="typing-cursor" data-astro-cid-nlow4r3u>|</span> </div> <!-- Radar Scan --> <div class="deco-box deco-radar" data-shuffle style="--delay: 0.55s" data-astro-cid-nlow4r3u> <div class="radar-circle" data-astro-cid-nlow4r3u></div> <div class="radar-sweep" data-astro-cid-nlow4r3u></div> <div class="radar-dot" style="--angle: 45deg; --dist: 60%" data-astro-cid-nlow4r3u></div> <div class="radar-dot" style="--angle: 180deg; --dist: 40%" data-astro-cid-nlow4r3u></div> </div> <!-- Heartbeat Line --> <div class="deco-box deco-heartbeat" data-shuffle style="--delay: 0.65s" data-astro-cid-nlow4r3u> <svg viewBox="0 0 100 40" fill="none" stroke="currentColor" stroke-width="2" data-astro-cid-nlow4r3u> <path class="heartbeat-line" d="M0,20 L20,20 L25,5 L30,35 L35,15 L40,25 L45,20 L100,20" data-astro-cid-nlow4r3u></path> </svg> </div> <!-- Binary Text --> <div class="deco-box deco-binary" data-shuffle style="--delay: 0.75s" data-astro-cid-nlow4r3u> <span class="binary-text" data-astro-cid-nlow4r3u>01001</span> </div> <!-- Ripple Effect --> <div class="deco-box deco-ripple" data-shuffle style="--delay: 0.85s" data-astro-cid-nlow4r3u> <span class="ripple-ring" style="--d: 0s" data-astro-cid-nlow4r3u></span> <span class="ripple-ring" style="--d: 0.5s" data-astro-cid-nlow4r3u></span> <span class="ripple-ring" style="--d: 1s" data-astro-cid-nlow4r3u></span> </div> <!-- Loading Bars (spectrum) --> <div class="deco-box deco-spectrum" data-shuffle style="--delay: 0.95s" data-astro-cid-nlow4r3u> <span style="--i: 0" data-astro-cid-nlow4r3u></span> <span style="--i: 1" data-astro-cid-nlow4r3u></span> <span style="--i: 2" data-astro-cid-nlow4r3u></span> <span style="--i: 3" data-astro-cid-nlow4r3u></span> <span style="--i: 4" data-astro-cid-nlow4r3u></span> <span style="--i: 5" data-astro-cid-nlow4r3u></span> <span style="--i: 6" data-astro-cid-nlow4r3u></span> </div> <!-- Bouncing Ball --> <div class="deco-box deco-bounce" data-shuffle style="--delay: 1.05s" data-astro-cid-nlow4r3u> <span class="bounce-ball" data-astro-cid-nlow4r3u></span> <span class="bounce-shadow" data-astro-cid-nlow4r3u></span> </div> </div> </section> <script>
(function() {
	console.log('[HeroSection] Script loaded');

	// ===== Translation System =====
	const translations = {
		en: {
			greeting: "Hey there, I'm",
			bio: "Minecraft Mod Developer.<br />Creating high-quality mods for Cobblemon.<br />Contact via <code>@gashicha</code>.",
			labelSkills: "Skills",
			labelTools: "Design Tools",
			labelFields: "Fields",
			fieldsContent: "Game Design, UI Design, UI Animation, Web Frontend",
			linksDev: "Development",
			linksHobby: "Hobbies",
			linksGaming: "Gaming",
			joinDiscord: "Join Discord",
			viewDocs: "View Documents"
		},
		ja: {
			greeting: "\u3053\u3093\u306B\u3061\u306F\uFF01",
			bio: "Minecraft Mod\u958B\u767A\u8005\u3002<br />Cobblemon\u5411\u3051\u306E\u9AD8\u54C1\u8CEA\u306AMod\u3092\u5236\u4F5C\u3057\u3066\u3044\u307E\u3059\u3002<br />\u304A\u554F\u3044\u5408\u308F\u305B\u306F <code>@gashicha</code> \u307E\u3067\u3002",
			labelSkills: "\u4F7F\u7528\u3059\u308B\u6280\u8853",
			labelTools: "\u30C7\u30B6\u30A4\u30F3\u30C4\u30FC\u30EB",
			labelFields: "\u6271\u3046\u5206\u91CE",
			fieldsContent: "\u30B2\u30FC\u30E0\u30C7\u30B6\u30A4\u30F3\u3001UI\u30C7\u30B6\u30A4\u30F3\u3001UI\u30A2\u30CB\u30E1\u30FC\u30B7\u30E7\u30F3\u3001Web\u30D5\u30ED\u30F3\u30C8\u30A8\u30F3\u30C9",
			linksDev: "\u958B\u767A\u7CFB",
			linksHobby: "\u8DA3\u5473",
			linksGaming: "\u30B2\u30FC\u30E0",
			joinDiscord: "Discord\u306B\u53C2\u52A0",
			viewDocs: "\u30C9\u30AD\u30E5\u30E1\u30F3\u30C8\u3092\u898B\u308B"
		}
	};

	function applyHeroTranslations(lang) {
		const t = translations[lang] || translations.en;
		document.querySelectorAll('.hero-section [data-i18n]').forEach(el => {
			const key = el.getAttribute('data-i18n');
			if (t[key]) {
				el.innerHTML = t[key];
			}
		});
	}

	// ===== Mouse Parallax Effect =====
	let mouseX = 0, mouseY = 0;
	let currentX = 0, currentY = 0;

	function initParallax() {
		const hero = document.getElementById('hero');
		if (!hero) return;

		document.addEventListener('mousemove', (e) => {
			const rect = hero.getBoundingClientRect();
			mouseX = (e.clientX - rect.left - rect.width / 2) / rect.width;
			mouseY = (e.clientY - rect.top - rect.height / 2) / rect.height;
		});

		function updateParallax() {
			currentX += (mouseX - currentX) * 0.05;
			currentY += (mouseY - currentY) * 0.05;

			document.querySelectorAll('[data-parallax]').forEach(el => {
				const strength = parseFloat(el.dataset.parallax) || 0.02;
				const x = currentX * 100 * strength;
				const y = currentY * 100 * strength;
				el.style.transform = \`translate(\${x}px, \${y}px)\`;
			});

			requestAnimationFrame(updateParallax);
		}
		updateParallax();
	}

	// ===== Typewriter Effect with Glitch =====
	function initTypewriters() {
		const typewriters = document.querySelectorAll('.typewriter-text');
		const glitchChars = '!@#$%^&*()_+-=[]{}|;:,.<>?/~\`0123456789';

		typewriters.forEach((el, index) => {
			const originalText = el.dataset.text || el.textContent;
			let isTyping = false;

			function typeText() {
				if (isTyping) return;
				isTyping = true;
				el.textContent = '';
				el.style.width = 'auto';

				let i = 0;
				const interval = setInterval(() => {
					if (i < originalText.length) {
						// Random glitch before showing correct character
						if (Math.random() > 0.7) {
							el.textContent = originalText.substring(0, i) +
								glitchChars[Math.floor(Math.random() * glitchChars.length)];
							setTimeout(() => {
								el.textContent = originalText.substring(0, i + 1);
							}, 50);
						} else {
							el.textContent = originalText.substring(0, i + 1);
						}
						i++;
					} else {
						clearInterval(interval);
						isTyping = false;
					}
				}, 100 + Math.random() * 50);
			}

			// Initial type after delay
			setTimeout(typeText, 1000 + index * 300);

			// Retype periodically
			setInterval(() => {
				if (Math.random() > 0.7) {
					typeText();
				}
			}, 8000 + Math.random() * 4000);
		});
	}

	// ===== Random Glitch Effect on Characters =====
	function initGlitchEffects() {
		const glitchElements = document.querySelectorAll('[data-glitch]');
		const japaneseChars = '\u3042\u3044\u3046\u3048\u304A\u304B\u304D\u304F\u3051\u3053\u3055\u3057\u3059\u305B\u305D\u305F\u3061\u3064\u3066\u3068\u306A\u306B\u306C\u306D\u306E\u306F\u3072\u3075\u3078\u307B\u307E\u307F\u3080\u3081\u3082\u3084\u3086\u3088\u3089\u308A\u308B\u308C\u308D\u308F\u3092\u3093';
		const englishChars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';

		glitchElements.forEach(el => {
			const originalChar = el.textContent;
			const isJapanese = /[\\u3040-\\u309F\\u30A0-\\u30FF]/.test(originalChar);
			const charSet = isJapanese ? japaneseChars : englishChars;

			setInterval(() => {
				if (Math.random() > 0.95) {
					const randomChar = charSet[Math.floor(Math.random() * charSet.length)];
					el.textContent = randomChar;
					el.classList.add('glitching');

					setTimeout(() => {
						el.textContent = originalChar;
						el.classList.remove('glitching');
					}, 100 + Math.random() * 150);
				}
			}, 500);
		});
	}

	// ===== Box Shuffle Animation =====
	function initBoxShuffle() {
		const leftGrid = document.querySelector('.deco-left');
		const rightGrid = document.querySelector('.deco-right');

		function shuffleBoxes(grid) {
			if (!grid) return;
			const boxes = Array.from(grid.querySelectorAll('[data-shuffle]'));
			if (boxes.length < 2) return;

			// Pick two random boxes
			const idx1 = Math.floor(Math.random() * boxes.length);
			let idx2 = Math.floor(Math.random() * boxes.length);
			while (idx2 === idx1) {
				idx2 = Math.floor(Math.random() * boxes.length);
			}

			const box1 = boxes[idx1];
			const box2 = boxes[idx2];

			// Get positions
			const rect1 = box1.getBoundingClientRect();
			const rect2 = box2.getBoundingClientRect();
			const gridRect = grid.getBoundingClientRect();

			// Calculate relative positions
			const y1 = rect1.top - gridRect.top;
			const y2 = rect2.top - gridRect.top;
			const diff = y2 - y1;

			// Animate swap
			box1.style.transition = 'transform 0.6s cubic-bezier(0.34, 1.56, 0.64, 1)';
			box2.style.transition = 'transform 0.6s cubic-bezier(0.34, 1.56, 0.64, 1)';

			box1.style.transform = \`translateY(\${diff}px)\`;
			box2.style.transform = \`translateY(\${-diff}px)\`;

			setTimeout(() => {
				box1.style.transition = 'none';
				box2.style.transition = 'none';
				box1.style.transform = '';
				box2.style.transform = '';

				// Actually swap in DOM
				const parent = box1.parentNode;
				const next1 = box1.nextSibling;
				const next2 = box2.nextSibling;

				if (next2 === box1) {
					parent.insertBefore(box1, box2);
				} else if (next1 === box2) {
					parent.insertBefore(box2, box1);
				} else {
					parent.insertBefore(box2, next1);
					parent.insertBefore(box1, next2);
				}
			}, 600);
		}

		// Shuffle periodically
		setInterval(() => {
			if (Math.random() > 0.5) {
				shuffleBoxes(leftGrid);
			}
		}, 3000);

		setInterval(() => {
			if (Math.random() > 0.5) {
				shuffleBoxes(rightGrid);
			}
		}, 3500);
	}

	// ===== Random Box Highlight =====
	function initRandomHighlight() {
		const boxes = document.querySelectorAll('.deco-box');

		setInterval(() => {
			// Remove all highlights
			boxes.forEach(box => box.classList.remove('highlight'));

			// Add highlight to random box
			if (Math.random() > 0.3) {
				const randomBox = boxes[Math.floor(Math.random() * boxes.length)];
				randomBox.classList.add('highlight');
			}
		}, 2000);
	}

	// ===== Grid Dots Wave Animation =====
	function initGridDotsWave() {
		const gridDots = document.querySelectorAll('.deco-grid-dots');

		gridDots.forEach(container => {
			const dots = container.querySelectorAll('span');

			setInterval(() => {
				const startIdx = Math.floor(Math.random() * dots.length);
				dots.forEach((dot, i) => {
					const delay = Math.abs(i - startIdx) * 100;
					setTimeout(() => {
						dot.classList.add('wave-active');
						setTimeout(() => dot.classList.remove('wave-active'), 300);
					}, delay);
				});
			}, 3000);
		});
	}

	// ===== Text Scramble Effect (Sci-fi decode) =====
	function initTextScramble() {
		const scrambleElements = document.querySelectorAll('.scramble-text');
		const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ\u30A2\u30A4\u30A6\u30A8\u30AA\u30AB\u30AD\u30AF\u30B1\u30B30123456789@#$%&*';

		scrambleElements.forEach((el, index) => {
			const finalText = el.dataset.final || el.textContent;
			let iteration = 0;
			let isAnimating = false;

			function scramble() {
				if (isAnimating) return;
				isAnimating = true;
				iteration = 0;

				const interval = setInterval(() => {
					el.textContent = finalText.split('')
						.map((char, i) => {
							if (i < iteration) return finalText[i];
							return chars[Math.floor(Math.random() * chars.length)];
						})
						.join('');

					if (iteration >= finalText.length) {
						clearInterval(interval);
						isAnimating = false;
					}
					iteration += 1/3;
				}, 30);
			}

			// Initial scramble
			setTimeout(() => scramble(), 1000 + index * 500);
			// Repeat periodically
			setInterval(() => {
				if (Math.random() > 0.6) scramble();
			}, 5000 + Math.random() * 3000);
		});
	}

	// ===== Counter Animation =====
	function initCounters() {
		const counters = document.querySelectorAll('.counter-value');

		counters.forEach(counter => {
			const target = parseInt(counter.dataset.target) || 100;
			let current = 0;
			let isAnimating = false;

			function animate() {
				if (isAnimating) return;
				isAnimating = true;
				current = 0;

				const increment = target / 50;
				const interval = setInterval(() => {
					current += increment;
					if (current >= target) {
						current = target;
						clearInterval(interval);
						isAnimating = false;
					}
					counter.textContent = Math.floor(current);
				}, 30);
			}

			// Initial animation
			setTimeout(animate, 1500);
			// Repeat
			setInterval(() => {
				if (Math.random() > 0.7) {
					current = 0;
					counter.textContent = '0';
					setTimeout(animate, 500);
				}
			}, 8000);
		});
	}

	// ===== Matrix Rain Effect =====
	function initMatrixRain() {
		const columns = document.querySelectorAll('.matrix-column');
		const matrixChars = '\u30A2\u30A4\u30A6\u30A8\u30AA\u30AB\u30AD\u30AF\u30B1\u30B3\u30B5\u30B7\u30B9\u30BB\u30BD\u30BF\u30C1\u30C4\u30C6\u30C8\u30CA\u30CB\u30CC\u30CD\u30CE\u30CF\u30D2\u30D5\u30D8\u30DB\u30DE\u30DF\u30E0\u30E1\u30E2\u30E4\u30E6\u30E8\u30E9\u30EA\u30EB\u30EC\u30ED\u30EF\u30F2\u30F30123456789';

		columns.forEach(col => {
			function rain() {
				const char = matrixChars[Math.floor(Math.random() * matrixChars.length)];
				const span = document.createElement('span');
				span.textContent = char;
				span.style.animation = \`matrixFall \${1 + Math.random()}s linear forwards\`;
				col.appendChild(span);

				setTimeout(() => span.remove(), 1500);
			}

			setInterval(rain, 200 + Math.random() * 300);
		});
	}

	// ===== Magnetic Hover Effect =====
	function initMagneticEffect() {
		const magneticElements = document.querySelectorAll('[data-magnetic]');

		magneticElements.forEach(el => {
			const core = el.querySelector('.magnetic-core');
			if (!core) return;

			el.addEventListener('mousemove', (e) => {
				const rect = el.getBoundingClientRect();
				const x = (e.clientX - rect.left - rect.width / 2) * 0.3;
				const y = (e.clientY - rect.top - rect.height / 2) * 0.3;
				core.style.transform = \`translate(\${x}px, \${y}px)\`;
			});

			el.addEventListener('mouseleave', () => {
				core.style.transform = 'translate(0, 0)';
			});
		});
	}

	// ===== Binary Text Animation =====
	function initBinaryAnimation() {
		const binaryTexts = document.querySelectorAll('.binary-text');

		binaryTexts.forEach(el => {
			setInterval(() => {
				const length = el.textContent.length;
				let newText = '';
				for (let i = 0; i < length; i++) {
					newText += Math.random() > 0.5 ? '1' : '0';
				}
				el.textContent = newText;
			}, 100);
		});
	}

	// ===== Typing Animation =====
	function initTypingAnimation() {
		const typingElements = document.querySelectorAll('.typing-text');
		const phrases = ['HELLO', 'WORLD', 'GASHI', 'CODE', 'PLAY'];

		typingElements.forEach(el => {
			let phraseIndex = 0;
			let charIndex = 0;
			let isDeleting = false;

			function type() {
				const currentPhrase = phrases[phraseIndex];

				if (isDeleting) {
					el.textContent = currentPhrase.substring(0, charIndex - 1);
					charIndex--;
				} else {
					el.textContent = currentPhrase.substring(0, charIndex + 1);
					charIndex++;
				}

				let delay = isDeleting ? 50 : 150;

				if (!isDeleting && charIndex === currentPhrase.length) {
					delay = 2000;
					isDeleting = true;
				} else if (isDeleting && charIndex === 0) {
					isDeleting = false;
					phraseIndex = (phraseIndex + 1) % phrases.length;
					delay = 500;
				}

				setTimeout(type, delay);
			}

			setTimeout(type, 1000);
		});
	}

	// ===== Wave Text Animation =====
	function initWaveText() {
		const waveChars = document.querySelectorAll('.wave-char');

		waveChars.forEach((char, i) => {
			setInterval(() => {
				char.style.transform = \`translateY(\${Math.sin(Date.now() / 200 + i) * 5}px)\`;
			}, 50);
		});
	}

	// ===== Neon Flicker Effect =====
	function initNeonFlicker() {
		const neonElements = document.querySelectorAll('.neon-text');

		neonElements.forEach(el => {
			function flicker() {
				const flickerSequence = [
					{ opacity: 1, duration: 50 },
					{ opacity: 0.4, duration: 50 },
					{ opacity: 1, duration: 100 },
					{ opacity: 0.7, duration: 50 },
					{ opacity: 1, duration: 2000 }
				];

				let delay = 0;
				flickerSequence.forEach(step => {
					setTimeout(() => {
						el.style.opacity = step.opacity;
					}, delay);
					delay += step.duration;
				});
			}

			// Random flicker
			setInterval(() => {
				if (Math.random() > 0.7) flicker();
			}, 3000);
		});
	}

	// ===== Initialize Everything =====
	function init() {
		const lang = window.GashiLang?.get() || 'en';
		applyHeroTranslations(lang);

		// Initialize all animations
		initParallax();
		initTextScramble();
		initCounters();
		initMatrixRain();
		initMagneticEffect();
		initBinaryAnimation();
		initTypingAnimation();
		initWaveText();
		initNeonFlicker();
		initGlitchEffects();
		initBoxShuffle();
		initRandomHighlight();
	}

	window.addEventListener('langChange', (e) => {
		applyHeroTranslations(e.detail.lang);
	});

	if (document.readyState === 'loading') {
		document.addEventListener('DOMContentLoaded', init);
	} else {
		init();
	}
})();
<\/script> `], ["", '<section class="hero-section" id="hero" data-astro-cid-nlow4r3u> <!-- Animated Decorative Elements - Left Side --> <div class="deco-grid deco-left" data-parallax="0.02" data-astro-cid-nlow4r3u> <!-- Text Scramble Effect (Sci-fi decode) --> <div class="deco-box deco-scramble" data-shuffle style="--delay: 0.1s" data-astro-cid-nlow4r3u> <span class="scramble-text" data-final="SYSTEM" data-astro-cid-nlow4r3u>******</span> </div> <!-- Morphing Blob --> <div class="deco-box deco-blob" data-shuffle style="--delay: 0.2s" data-astro-cid-nlow4r3u> <div class="blob-shape" data-astro-cid-nlow4r3u></div> </div> <!-- Neon Flicker Text --> <div class="deco-box deco-neon" data-shuffle style="--delay: 0.3s" data-astro-cid-nlow4r3u> <span class="neon-text" data-astro-cid-nlow4r3u>ONLINE</span> </div> <!-- Floating Particles --> <div class="deco-box deco-particles" data-shuffle style="--delay: 0.4s" data-astro-cid-nlow4r3u> <span class="particle" style="--x: 20%; --y: 30%; --d: 2s" data-astro-cid-nlow4r3u></span> <span class="particle" style="--x: 70%; --y: 60%; --d: 2.5s" data-astro-cid-nlow4r3u></span> <span class="particle" style="--x: 40%; --y: 80%; --d: 3s" data-astro-cid-nlow4r3u></span> <span class="particle" style="--x: 80%; --y: 20%; --d: 2.2s" data-astro-cid-nlow4r3u></span> <span class="particle" style="--x: 10%; --y: 50%; --d: 2.8s" data-astro-cid-nlow4r3u></span> </div> <!-- Wave Text --> <div class="deco-box deco-wave-text" data-shuffle style="--delay: 0.5s" data-astro-cid-nlow4r3u> <span class="wave-char" style="--i: 0" data-astro-cid-nlow4r3u>W</span> <span class="wave-char" style="--i: 1" data-astro-cid-nlow4r3u>A</span> <span class="wave-char" style="--i: 2" data-astro-cid-nlow4r3u>V</span> <span class="wave-char" style="--i: 3" data-astro-cid-nlow4r3u>E</span> </div> <!-- Counter Animation --> <div class="deco-box deco-counter" data-shuffle style="--delay: 0.6s" data-astro-cid-nlow4r3u> <span class="counter-value" data-target="100" data-astro-cid-nlow4r3u>0</span> <span class="counter-label" data-astro-cid-nlow4r3u>%</span> </div> <!-- Japanese Characters with Glitch --> <div class="deco-box deco-japanese" data-shuffle style="--delay: 0.7s" data-astro-cid-nlow4r3u> <span class="char" data-glitch style="--i: 0" data-astro-cid-nlow4r3u>\u3042</span> <span class="char" data-glitch style="--i: 1" data-astro-cid-nlow4r3u>\u308A</span> <span class="char" data-glitch style="--i: 2" data-astro-cid-nlow4r3u>\u304C</span> <span class="char" data-glitch style="--i: 3" data-astro-cid-nlow4r3u>\u3068</span> <span class="char" data-glitch style="--i: 4" data-astro-cid-nlow4r3u>\u3046</span> </div> <!-- Matrix Rain (mini) --> <div class="deco-box deco-matrix" data-shuffle style="--delay: 0.8s" data-astro-cid-nlow4r3u> <div class="matrix-column" style="--col: 0" data-astro-cid-nlow4r3u></div> <div class="matrix-column" style="--col: 1" data-astro-cid-nlow4r3u></div> <div class="matrix-column" style="--col: 2" data-astro-cid-nlow4r3u></div> <div class="matrix-column" style="--col: 3" data-astro-cid-nlow4r3u></div> <div class="matrix-column" style="--col: 4" data-astro-cid-nlow4r3u></div> </div> <!-- Magnetic Element --> <div class="deco-box deco-magnetic" data-shuffle data-magnetic style="--delay: 0.9s" data-astro-cid-nlow4r3u> <div class="magnetic-core" data-astro-cid-nlow4r3u></div> </div> <!-- Orbit Animation --> <div class="deco-box deco-orbit" data-shuffle style="--delay: 1.0s" data-astro-cid-nlow4r3u> <div class="orbit-center" data-astro-cid-nlow4r3u></div> <div class="orbit-ring" data-astro-cid-nlow4r3u> <span class="orbit-dot" data-astro-cid-nlow4r3u></span> </div> </div> </div> <!-- Main Content --> <div class="hero-main" data-astro-cid-nlow4r3u> <div class="hero-container" data-astro-cid-nlow4r3u> <!-- Left: Avatar & Intro --> <div class="hero-left" data-astro-cid-nlow4r3u> <div class="avatar-wrapper" data-astro-cid-nlow4r3u> <img', ` alt="Gashi" class="avatar" data-astro-cid-nlow4r3u> </div> <div class="intro-text" data-astro-cid-nlow4r3u> <p class="greeting" data-i18n="greeting" data-astro-cid-nlow4r3u>Hey there, I'm</p> <h1 class="name" data-astro-cid-nlow4r3u> <span class="name-char" data-glitch style="--i: 0" data-astro-cid-nlow4r3u>G</span> <span class="name-char" data-glitch style="--i: 1" data-astro-cid-nlow4r3u>a</span> <span class="name-char" data-glitch style="--i: 2" data-astro-cid-nlow4r3u>s</span> <span class="name-char" data-glitch style="--i: 3" data-astro-cid-nlow4r3u>h</span> <span class="name-char" data-glitch style="--i: 4" data-astro-cid-nlow4r3u>i</span> </h1> </div> <p class="bio" data-i18n="bio" data-astro-cid-nlow4r3u>
Minecraft Mod\u958B\u767A\u8005\u3002<br data-astro-cid-nlow4r3u>
Cobblemon\u5411\u3051\u306E\u9AD8\u54C1\u8CEA\u306AMod\u3092\u5236\u4F5C\u3057\u3066\u3044\u307E\u3059\u3002<br data-astro-cid-nlow4r3u>
\u304A\u554F\u3044\u5408\u308F\u305B\u306F <code data-astro-cid-nlow4r3u>@gashicha</code> \u307E\u3067\u3002
</p> <!-- Social Links by Category --> <div class="links-by-category" data-astro-cid-nlow4r3u> <!-- Development --> <div class="link-category" data-astro-cid-nlow4r3u> <span class="category-label" data-i18n="linksDev" data-astro-cid-nlow4r3u>Development</span> <div class="link-row" data-astro-cid-nlow4r3u> <a href="https://github.com/gqrshy" target="_blank" rel="noopener noreferrer" title="GitHub" class="link-btn" data-astro-cid-nlow4r3u> <img src="https://cdn.simpleicons.org/github/white" alt="GitHub" data-astro-cid-nlow4r3u> </a> <a href="https://modrinth.com/user/gashicha" target="_blank" rel="noopener noreferrer" title="Modrinth" class="link-btn" data-astro-cid-nlow4r3u> <img src="https://cdn.simpleicons.org/modrinth/1bd96a" alt="Modrinth" data-astro-cid-nlow4r3u> </a> <a href="https://www.curseforge.com/members/gqrshy/projects" target="_blank" rel="noopener noreferrer" title="CurseForge" class="link-btn" data-astro-cid-nlow4r3u> <img src="https://cdn.simpleicons.org/curseforge/f16436" alt="CurseForge" data-astro-cid-nlow4r3u> </a> <a href="https://polymart.org/user/47282/gashi" target="_blank" rel="noopener noreferrer" title="Polymart" class="link-btn" data-astro-cid-nlow4r3u> <img`, ` alt="Polymart" data-astro-cid-nlow4r3u> </a> </div> </div> <!-- Hobbies --> <div class="link-category" data-astro-cid-nlow4r3u> <span class="category-label" data-i18n="linksHobby" data-astro-cid-nlow4r3u>Hobbies</span> <div class="link-row" data-astro-cid-nlow4r3u> <a href="https://www.youtube.com/@Gqrshy" target="_blank" rel="noopener noreferrer" title="YouTube" class="link-btn" data-astro-cid-nlow4r3u> <img src="https://cdn.simpleicons.org/youtube/ff0000" alt="YouTube" data-astro-cid-nlow4r3u> </a> <a href="https://x.com/Gqrshy" target="_blank" rel="noopener noreferrer" title="X" class="link-btn" data-astro-cid-nlow4r3u> <img src="https://cdn.simpleicons.org/x/white" alt="X" data-astro-cid-nlow4r3u> </a> <a href="https://note.com/gashicha" target="_blank" rel="noopener noreferrer" title="note" class="link-btn" data-astro-cid-nlow4r3u> <img src="https://cdn.simpleicons.org/note/41c9b4" alt="note" data-astro-cid-nlow4r3u> </a> </div> </div> <!-- Gaming --> <div class="link-category" data-astro-cid-nlow4r3u> <span class="category-label" data-i18n="linksGaming" data-astro-cid-nlow4r3u>Gaming</span> <div class="link-row" data-astro-cid-nlow4r3u> <a href="https://steamcommunity.com/profiles/76561199134198471/" target="_blank" rel="noopener noreferrer" title="Steam" class="link-btn" data-astro-cid-nlow4r3u> <img src="https://cdn.simpleicons.org/steam/white" alt="Steam" data-astro-cid-nlow4r3u> </a> <a href="https://tracker.gg/valorant/profile/riot/%E5%B9%B3%E5%92%8C%E4%B8%BB%E7%BE%A9%E8%80%85%23peko/overview?platform=pc&playlist=competitive" target="_blank" rel="noopener noreferrer" title="Valorant" class="link-btn" data-astro-cid-nlow4r3u> <img src="https://cdn.simpleicons.org/valorant/ff4655" alt="Valorant" data-astro-cid-nlow4r3u> </a> <a href="https://op.gg/ja/lol/summoners/jp/%E5%B9%B3%E5%92%8C%E4%B8%BB%E7%BE%A9%E8%80%85-peko" target="_blank" rel="noopener noreferrer" title="League of Legends" class="link-btn" data-astro-cid-nlow4r3u> <img src="https://cdn.simpleicons.org/leagueoflegends/c28f2c" alt="LoL" data-astro-cid-nlow4r3u> </a> </div> </div> </div> </div> <!-- Right: Quick Info --> <div class="hero-right" data-astro-cid-nlow4r3u> <div class="info-row" data-astro-cid-nlow4r3u> <span class="info-label" data-i18n="labelSkills" data-astro-cid-nlow4r3u>Skills</span> <span class="info-content" data-astro-cid-nlow4r3u>Java, Kotlin, TypeScript, HTML, CSS, etc...</span> </div> <div class="info-row" data-astro-cid-nlow4r3u> <span class="info-label" data-i18n="labelTools" data-astro-cid-nlow4r3u>Design Tools</span> <span class="info-content" data-astro-cid-nlow4r3u>Figma, Adobe Illustrator, Adobe Photoshop, etc...</span> </div> <div class="info-row" data-astro-cid-nlow4r3u> <span class="info-label" data-i18n="labelFields" data-astro-cid-nlow4r3u>Fields</span> <span class="info-content" data-i18n="fieldsContent" data-astro-cid-nlow4r3u>Game Design, UI Design, UI Animation, Web Frontend</span> </div> <div class="info-row" data-astro-cid-nlow4r3u> <span class="info-label" data-astro-cid-nlow4r3u>MBTI</span> <span class="info-content info-highlight" data-astro-cid-nlow4r3u>ISFP</span> </div> <div class="hero-buttons" data-astro-cid-nlow4r3u> <a href="https://discord.gg/VVVvBTqqyP" target="_blank" class="btn-discord" data-astro-cid-nlow4r3u> <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" data-astro-cid-nlow4r3u> <path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0 12.64 12.64 0 0 0-.617-1.25.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.057 19.9 19.9 0 0 0 5.993 3.03.078.078 0 0 0 .084-.028 14.09 14.09 0 0 0 1.226-1.994.076.076 0 0 0-.041-.106 13.107 13.107 0 0 1-1.872-.892.077.077 0 0 1-.008-.128 10.2 10.2 0 0 0 .372-.292.074.074 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127 12.299 12.299 0 0 1-1.873.892.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028 19.839 19.839 0 0 0 6.002-3.03.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.03zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.956-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.955-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.946 2.418-2.157 2.418z" data-astro-cid-nlow4r3u></path> </svg> <span data-i18n="joinDiscord" data-astro-cid-nlow4r3u>Join Discord</span> </a> <a href="/docs/cobbleranked/" class="btn-docs" data-astro-cid-nlow4r3u> <span data-i18n="viewDocs" data-astro-cid-nlow4r3u>View Documents</span> </a> </div> </div> </div> </div> <!-- Animated Decorative Elements - Right Side --> <div class="deco-grid deco-right" data-parallax="-0.02" data-astro-cid-nlow4r3u> <!-- Text Scramble (different text) --> <div class="deco-box deco-scramble" data-shuffle style="--delay: 0.15s" data-astro-cid-nlow4r3u> <span class="scramble-text" data-final="READY" data-astro-cid-nlow4r3u>*****</span> </div> <!-- DNA Helix --> <div class="deco-box deco-dna" data-shuffle style="--delay: 0.25s" data-astro-cid-nlow4r3u> <div class="dna-strand" data-astro-cid-nlow4r3u> <span style="--i: 0" data-astro-cid-nlow4r3u></span> <span style="--i: 1" data-astro-cid-nlow4r3u></span> <span style="--i: 2" data-astro-cid-nlow4r3u></span> <span style="--i: 3" data-astro-cid-nlow4r3u></span> <span style="--i: 4" data-astro-cid-nlow4r3u></span> </div> </div> <!-- Glitch Box --> <div class="deco-box deco-glitch-box" data-shuffle style="--delay: 0.35s" data-astro-cid-nlow4r3u> <div class="glitch-layer" data-astro-cid-nlow4r3u></div> <div class="glitch-layer" data-astro-cid-nlow4r3u></div> <div class="glitch-layer" data-astro-cid-nlow4r3u></div> </div> <!-- Typing Cursor --> <div class="deco-box deco-typing" data-shuffle style="--delay: 0.45s" data-astro-cid-nlow4r3u> <span class="typing-text" data-astro-cid-nlow4r3u></span> <span class="typing-cursor" data-astro-cid-nlow4r3u>|</span> </div> <!-- Radar Scan --> <div class="deco-box deco-radar" data-shuffle style="--delay: 0.55s" data-astro-cid-nlow4r3u> <div class="radar-circle" data-astro-cid-nlow4r3u></div> <div class="radar-sweep" data-astro-cid-nlow4r3u></div> <div class="radar-dot" style="--angle: 45deg; --dist: 60%" data-astro-cid-nlow4r3u></div> <div class="radar-dot" style="--angle: 180deg; --dist: 40%" data-astro-cid-nlow4r3u></div> </div> <!-- Heartbeat Line --> <div class="deco-box deco-heartbeat" data-shuffle style="--delay: 0.65s" data-astro-cid-nlow4r3u> <svg viewBox="0 0 100 40" fill="none" stroke="currentColor" stroke-width="2" data-astro-cid-nlow4r3u> <path class="heartbeat-line" d="M0,20 L20,20 L25,5 L30,35 L35,15 L40,25 L45,20 L100,20" data-astro-cid-nlow4r3u></path> </svg> </div> <!-- Binary Text --> <div class="deco-box deco-binary" data-shuffle style="--delay: 0.75s" data-astro-cid-nlow4r3u> <span class="binary-text" data-astro-cid-nlow4r3u>01001</span> </div> <!-- Ripple Effect --> <div class="deco-box deco-ripple" data-shuffle style="--delay: 0.85s" data-astro-cid-nlow4r3u> <span class="ripple-ring" style="--d: 0s" data-astro-cid-nlow4r3u></span> <span class="ripple-ring" style="--d: 0.5s" data-astro-cid-nlow4r3u></span> <span class="ripple-ring" style="--d: 1s" data-astro-cid-nlow4r3u></span> </div> <!-- Loading Bars (spectrum) --> <div class="deco-box deco-spectrum" data-shuffle style="--delay: 0.95s" data-astro-cid-nlow4r3u> <span style="--i: 0" data-astro-cid-nlow4r3u></span> <span style="--i: 1" data-astro-cid-nlow4r3u></span> <span style="--i: 2" data-astro-cid-nlow4r3u></span> <span style="--i: 3" data-astro-cid-nlow4r3u></span> <span style="--i: 4" data-astro-cid-nlow4r3u></span> <span style="--i: 5" data-astro-cid-nlow4r3u></span> <span style="--i: 6" data-astro-cid-nlow4r3u></span> </div> <!-- Bouncing Ball --> <div class="deco-box deco-bounce" data-shuffle style="--delay: 1.05s" data-astro-cid-nlow4r3u> <span class="bounce-ball" data-astro-cid-nlow4r3u></span> <span class="bounce-shadow" data-astro-cid-nlow4r3u></span> </div> </div> </section> <script>
(function() {
	console.log('[HeroSection] Script loaded');

	// ===== Translation System =====
	const translations = {
		en: {
			greeting: "Hey there, I'm",
			bio: "Minecraft Mod Developer.<br />Creating high-quality mods for Cobblemon.<br />Contact via <code>@gashicha</code>.",
			labelSkills: "Skills",
			labelTools: "Design Tools",
			labelFields: "Fields",
			fieldsContent: "Game Design, UI Design, UI Animation, Web Frontend",
			linksDev: "Development",
			linksHobby: "Hobbies",
			linksGaming: "Gaming",
			joinDiscord: "Join Discord",
			viewDocs: "View Documents"
		},
		ja: {
			greeting: "\u3053\u3093\u306B\u3061\u306F\uFF01",
			bio: "Minecraft Mod\u958B\u767A\u8005\u3002<br />Cobblemon\u5411\u3051\u306E\u9AD8\u54C1\u8CEA\u306AMod\u3092\u5236\u4F5C\u3057\u3066\u3044\u307E\u3059\u3002<br />\u304A\u554F\u3044\u5408\u308F\u305B\u306F <code>@gashicha</code> \u307E\u3067\u3002",
			labelSkills: "\u4F7F\u7528\u3059\u308B\u6280\u8853",
			labelTools: "\u30C7\u30B6\u30A4\u30F3\u30C4\u30FC\u30EB",
			labelFields: "\u6271\u3046\u5206\u91CE",
			fieldsContent: "\u30B2\u30FC\u30E0\u30C7\u30B6\u30A4\u30F3\u3001UI\u30C7\u30B6\u30A4\u30F3\u3001UI\u30A2\u30CB\u30E1\u30FC\u30B7\u30E7\u30F3\u3001Web\u30D5\u30ED\u30F3\u30C8\u30A8\u30F3\u30C9",
			linksDev: "\u958B\u767A\u7CFB",
			linksHobby: "\u8DA3\u5473",
			linksGaming: "\u30B2\u30FC\u30E0",
			joinDiscord: "Discord\u306B\u53C2\u52A0",
			viewDocs: "\u30C9\u30AD\u30E5\u30E1\u30F3\u30C8\u3092\u898B\u308B"
		}
	};

	function applyHeroTranslations(lang) {
		const t = translations[lang] || translations.en;
		document.querySelectorAll('.hero-section [data-i18n]').forEach(el => {
			const key = el.getAttribute('data-i18n');
			if (t[key]) {
				el.innerHTML = t[key];
			}
		});
	}

	// ===== Mouse Parallax Effect =====
	let mouseX = 0, mouseY = 0;
	let currentX = 0, currentY = 0;

	function initParallax() {
		const hero = document.getElementById('hero');
		if (!hero) return;

		document.addEventListener('mousemove', (e) => {
			const rect = hero.getBoundingClientRect();
			mouseX = (e.clientX - rect.left - rect.width / 2) / rect.width;
			mouseY = (e.clientY - rect.top - rect.height / 2) / rect.height;
		});

		function updateParallax() {
			currentX += (mouseX - currentX) * 0.05;
			currentY += (mouseY - currentY) * 0.05;

			document.querySelectorAll('[data-parallax]').forEach(el => {
				const strength = parseFloat(el.dataset.parallax) || 0.02;
				const x = currentX * 100 * strength;
				const y = currentY * 100 * strength;
				el.style.transform = \\\`translate(\\\${x}px, \\\${y}px)\\\`;
			});

			requestAnimationFrame(updateParallax);
		}
		updateParallax();
	}

	// ===== Typewriter Effect with Glitch =====
	function initTypewriters() {
		const typewriters = document.querySelectorAll('.typewriter-text');
		const glitchChars = '!@#$%^&*()_+-=[]{}|;:,.<>?/~\\\`0123456789';

		typewriters.forEach((el, index) => {
			const originalText = el.dataset.text || el.textContent;
			let isTyping = false;

			function typeText() {
				if (isTyping) return;
				isTyping = true;
				el.textContent = '';
				el.style.width = 'auto';

				let i = 0;
				const interval = setInterval(() => {
					if (i < originalText.length) {
						// Random glitch before showing correct character
						if (Math.random() > 0.7) {
							el.textContent = originalText.substring(0, i) +
								glitchChars[Math.floor(Math.random() * glitchChars.length)];
							setTimeout(() => {
								el.textContent = originalText.substring(0, i + 1);
							}, 50);
						} else {
							el.textContent = originalText.substring(0, i + 1);
						}
						i++;
					} else {
						clearInterval(interval);
						isTyping = false;
					}
				}, 100 + Math.random() * 50);
			}

			// Initial type after delay
			setTimeout(typeText, 1000 + index * 300);

			// Retype periodically
			setInterval(() => {
				if (Math.random() > 0.7) {
					typeText();
				}
			}, 8000 + Math.random() * 4000);
		});
	}

	// ===== Random Glitch Effect on Characters =====
	function initGlitchEffects() {
		const glitchElements = document.querySelectorAll('[data-glitch]');
		const japaneseChars = '\u3042\u3044\u3046\u3048\u304A\u304B\u304D\u304F\u3051\u3053\u3055\u3057\u3059\u305B\u305D\u305F\u3061\u3064\u3066\u3068\u306A\u306B\u306C\u306D\u306E\u306F\u3072\u3075\u3078\u307B\u307E\u307F\u3080\u3081\u3082\u3084\u3086\u3088\u3089\u308A\u308B\u308C\u308D\u308F\u3092\u3093';
		const englishChars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';

		glitchElements.forEach(el => {
			const originalChar = el.textContent;
			const isJapanese = /[\\\\u3040-\\\\u309F\\\\u30A0-\\\\u30FF]/.test(originalChar);
			const charSet = isJapanese ? japaneseChars : englishChars;

			setInterval(() => {
				if (Math.random() > 0.95) {
					const randomChar = charSet[Math.floor(Math.random() * charSet.length)];
					el.textContent = randomChar;
					el.classList.add('glitching');

					setTimeout(() => {
						el.textContent = originalChar;
						el.classList.remove('glitching');
					}, 100 + Math.random() * 150);
				}
			}, 500);
		});
	}

	// ===== Box Shuffle Animation =====
	function initBoxShuffle() {
		const leftGrid = document.querySelector('.deco-left');
		const rightGrid = document.querySelector('.deco-right');

		function shuffleBoxes(grid) {
			if (!grid) return;
			const boxes = Array.from(grid.querySelectorAll('[data-shuffle]'));
			if (boxes.length < 2) return;

			// Pick two random boxes
			const idx1 = Math.floor(Math.random() * boxes.length);
			let idx2 = Math.floor(Math.random() * boxes.length);
			while (idx2 === idx1) {
				idx2 = Math.floor(Math.random() * boxes.length);
			}

			const box1 = boxes[idx1];
			const box2 = boxes[idx2];

			// Get positions
			const rect1 = box1.getBoundingClientRect();
			const rect2 = box2.getBoundingClientRect();
			const gridRect = grid.getBoundingClientRect();

			// Calculate relative positions
			const y1 = rect1.top - gridRect.top;
			const y2 = rect2.top - gridRect.top;
			const diff = y2 - y1;

			// Animate swap
			box1.style.transition = 'transform 0.6s cubic-bezier(0.34, 1.56, 0.64, 1)';
			box2.style.transition = 'transform 0.6s cubic-bezier(0.34, 1.56, 0.64, 1)';

			box1.style.transform = \\\`translateY(\\\${diff}px)\\\`;
			box2.style.transform = \\\`translateY(\\\${-diff}px)\\\`;

			setTimeout(() => {
				box1.style.transition = 'none';
				box2.style.transition = 'none';
				box1.style.transform = '';
				box2.style.transform = '';

				// Actually swap in DOM
				const parent = box1.parentNode;
				const next1 = box1.nextSibling;
				const next2 = box2.nextSibling;

				if (next2 === box1) {
					parent.insertBefore(box1, box2);
				} else if (next1 === box2) {
					parent.insertBefore(box2, box1);
				} else {
					parent.insertBefore(box2, next1);
					parent.insertBefore(box1, next2);
				}
			}, 600);
		}

		// Shuffle periodically
		setInterval(() => {
			if (Math.random() > 0.5) {
				shuffleBoxes(leftGrid);
			}
		}, 3000);

		setInterval(() => {
			if (Math.random() > 0.5) {
				shuffleBoxes(rightGrid);
			}
		}, 3500);
	}

	// ===== Random Box Highlight =====
	function initRandomHighlight() {
		const boxes = document.querySelectorAll('.deco-box');

		setInterval(() => {
			// Remove all highlights
			boxes.forEach(box => box.classList.remove('highlight'));

			// Add highlight to random box
			if (Math.random() > 0.3) {
				const randomBox = boxes[Math.floor(Math.random() * boxes.length)];
				randomBox.classList.add('highlight');
			}
		}, 2000);
	}

	// ===== Grid Dots Wave Animation =====
	function initGridDotsWave() {
		const gridDots = document.querySelectorAll('.deco-grid-dots');

		gridDots.forEach(container => {
			const dots = container.querySelectorAll('span');

			setInterval(() => {
				const startIdx = Math.floor(Math.random() * dots.length);
				dots.forEach((dot, i) => {
					const delay = Math.abs(i - startIdx) * 100;
					setTimeout(() => {
						dot.classList.add('wave-active');
						setTimeout(() => dot.classList.remove('wave-active'), 300);
					}, delay);
				});
			}, 3000);
		});
	}

	// ===== Text Scramble Effect (Sci-fi decode) =====
	function initTextScramble() {
		const scrambleElements = document.querySelectorAll('.scramble-text');
		const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ\u30A2\u30A4\u30A6\u30A8\u30AA\u30AB\u30AD\u30AF\u30B1\u30B30123456789@#$%&*';

		scrambleElements.forEach((el, index) => {
			const finalText = el.dataset.final || el.textContent;
			let iteration = 0;
			let isAnimating = false;

			function scramble() {
				if (isAnimating) return;
				isAnimating = true;
				iteration = 0;

				const interval = setInterval(() => {
					el.textContent = finalText.split('')
						.map((char, i) => {
							if (i < iteration) return finalText[i];
							return chars[Math.floor(Math.random() * chars.length)];
						})
						.join('');

					if (iteration >= finalText.length) {
						clearInterval(interval);
						isAnimating = false;
					}
					iteration += 1/3;
				}, 30);
			}

			// Initial scramble
			setTimeout(() => scramble(), 1000 + index * 500);
			// Repeat periodically
			setInterval(() => {
				if (Math.random() > 0.6) scramble();
			}, 5000 + Math.random() * 3000);
		});
	}

	// ===== Counter Animation =====
	function initCounters() {
		const counters = document.querySelectorAll('.counter-value');

		counters.forEach(counter => {
			const target = parseInt(counter.dataset.target) || 100;
			let current = 0;
			let isAnimating = false;

			function animate() {
				if (isAnimating) return;
				isAnimating = true;
				current = 0;

				const increment = target / 50;
				const interval = setInterval(() => {
					current += increment;
					if (current >= target) {
						current = target;
						clearInterval(interval);
						isAnimating = false;
					}
					counter.textContent = Math.floor(current);
				}, 30);
			}

			// Initial animation
			setTimeout(animate, 1500);
			// Repeat
			setInterval(() => {
				if (Math.random() > 0.7) {
					current = 0;
					counter.textContent = '0';
					setTimeout(animate, 500);
				}
			}, 8000);
		});
	}

	// ===== Matrix Rain Effect =====
	function initMatrixRain() {
		const columns = document.querySelectorAll('.matrix-column');
		const matrixChars = '\u30A2\u30A4\u30A6\u30A8\u30AA\u30AB\u30AD\u30AF\u30B1\u30B3\u30B5\u30B7\u30B9\u30BB\u30BD\u30BF\u30C1\u30C4\u30C6\u30C8\u30CA\u30CB\u30CC\u30CD\u30CE\u30CF\u30D2\u30D5\u30D8\u30DB\u30DE\u30DF\u30E0\u30E1\u30E2\u30E4\u30E6\u30E8\u30E9\u30EA\u30EB\u30EC\u30ED\u30EF\u30F2\u30F30123456789';

		columns.forEach(col => {
			function rain() {
				const char = matrixChars[Math.floor(Math.random() * matrixChars.length)];
				const span = document.createElement('span');
				span.textContent = char;
				span.style.animation = \\\`matrixFall \\\${1 + Math.random()}s linear forwards\\\`;
				col.appendChild(span);

				setTimeout(() => span.remove(), 1500);
			}

			setInterval(rain, 200 + Math.random() * 300);
		});
	}

	// ===== Magnetic Hover Effect =====
	function initMagneticEffect() {
		const magneticElements = document.querySelectorAll('[data-magnetic]');

		magneticElements.forEach(el => {
			const core = el.querySelector('.magnetic-core');
			if (!core) return;

			el.addEventListener('mousemove', (e) => {
				const rect = el.getBoundingClientRect();
				const x = (e.clientX - rect.left - rect.width / 2) * 0.3;
				const y = (e.clientY - rect.top - rect.height / 2) * 0.3;
				core.style.transform = \\\`translate(\\\${x}px, \\\${y}px)\\\`;
			});

			el.addEventListener('mouseleave', () => {
				core.style.transform = 'translate(0, 0)';
			});
		});
	}

	// ===== Binary Text Animation =====
	function initBinaryAnimation() {
		const binaryTexts = document.querySelectorAll('.binary-text');

		binaryTexts.forEach(el => {
			setInterval(() => {
				const length = el.textContent.length;
				let newText = '';
				for (let i = 0; i < length; i++) {
					newText += Math.random() > 0.5 ? '1' : '0';
				}
				el.textContent = newText;
			}, 100);
		});
	}

	// ===== Typing Animation =====
	function initTypingAnimation() {
		const typingElements = document.querySelectorAll('.typing-text');
		const phrases = ['HELLO', 'WORLD', 'GASHI', 'CODE', 'PLAY'];

		typingElements.forEach(el => {
			let phraseIndex = 0;
			let charIndex = 0;
			let isDeleting = false;

			function type() {
				const currentPhrase = phrases[phraseIndex];

				if (isDeleting) {
					el.textContent = currentPhrase.substring(0, charIndex - 1);
					charIndex--;
				} else {
					el.textContent = currentPhrase.substring(0, charIndex + 1);
					charIndex++;
				}

				let delay = isDeleting ? 50 : 150;

				if (!isDeleting && charIndex === currentPhrase.length) {
					delay = 2000;
					isDeleting = true;
				} else if (isDeleting && charIndex === 0) {
					isDeleting = false;
					phraseIndex = (phraseIndex + 1) % phrases.length;
					delay = 500;
				}

				setTimeout(type, delay);
			}

			setTimeout(type, 1000);
		});
	}

	// ===== Wave Text Animation =====
	function initWaveText() {
		const waveChars = document.querySelectorAll('.wave-char');

		waveChars.forEach((char, i) => {
			setInterval(() => {
				char.style.transform = \\\`translateY(\\\${Math.sin(Date.now() / 200 + i) * 5}px)\\\`;
			}, 50);
		});
	}

	// ===== Neon Flicker Effect =====
	function initNeonFlicker() {
		const neonElements = document.querySelectorAll('.neon-text');

		neonElements.forEach(el => {
			function flicker() {
				const flickerSequence = [
					{ opacity: 1, duration: 50 },
					{ opacity: 0.4, duration: 50 },
					{ opacity: 1, duration: 100 },
					{ opacity: 0.7, duration: 50 },
					{ opacity: 1, duration: 2000 }
				];

				let delay = 0;
				flickerSequence.forEach(step => {
					setTimeout(() => {
						el.style.opacity = step.opacity;
					}, delay);
					delay += step.duration;
				});
			}

			// Random flicker
			setInterval(() => {
				if (Math.random() > 0.7) flicker();
			}, 3000);
		});
	}

	// ===== Initialize Everything =====
	function init() {
		const lang = window.GashiLang?.get() || 'en';
		applyHeroTranslations(lang);

		// Initialize all animations
		initParallax();
		initTextScramble();
		initCounters();
		initMatrixRain();
		initMagneticEffect();
		initBinaryAnimation();
		initTypingAnimation();
		initWaveText();
		initNeonFlicker();
		initGlitchEffects();
		initBoxShuffle();
		initRandomHighlight();
	}

	window.addEventListener('langChange', (e) => {
		applyHeroTranslations(e.detail.lang);
	});

	if (document.readyState === 'loading') {
		document.addEventListener('DOMContentLoaded', init);
	} else {
		init();
	}
})();
<\/script> `])), maybeRenderHead(), addAttribute(gashiAvatar.src, "src"), addAttribute(polymartLogo.src, "src"));
}, "C:/MinecraftModDev/projects_gashistudios/[GashiStudios]CobbleRanked_Reloaded/docs-site/src/components/HeroSection.astro", void 0);

var __freeze$2 = Object.freeze;
var __defProp$2 = Object.defineProperty;
var __template$2 = (cooked, raw) => __freeze$2(__defProp$2(cooked, "raw", { value: __freeze$2(cooked.slice()) }));
var _a$2;
const $$ProductsSection = createComponent(($$result, $$props, $$slots) => {
  return renderTemplate(_a$2 || (_a$2 = __template$2(["", `<section id="products" class="products-section" data-astro-cid-zdxu43nv> <div class="products-container" data-astro-cid-zdxu43nv> <!-- Animated Title --> <div class="title-wrapper" id="products-title-wrapper" data-astro-cid-zdxu43nv> <!-- Decorative dots --> <div class="title-dots" data-astro-cid-zdxu43nv> <span class="dot dot-1" data-astro-cid-zdxu43nv></span> <span class="dot dot-2" data-astro-cid-zdxu43nv></span> <span class="dot dot-3" data-astro-cid-zdxu43nv></span> </div> <!-- Main title with individual characters --> <h2 class="section-title animated-title" id="products-title" data-astro-cid-zdxu43nv> <span class="char" data-index="0" data-astro-cid-zdxu43nv>O</span> <span class="char" data-index="1" data-astro-cid-zdxu43nv>u</span> <span class="char" data-index="2" data-astro-cid-zdxu43nv>r</span> <span class="char space" data-index="3" data-astro-cid-zdxu43nv>&nbsp;</span> <span class="char" data-index="4" data-astro-cid-zdxu43nv>P</span> <span class="char" data-index="5" data-astro-cid-zdxu43nv>r</span> <span class="char" data-index="6" data-astro-cid-zdxu43nv>o</span> <span class="char" data-index="7" data-astro-cid-zdxu43nv>d</span> <span class="char" data-index="8" data-astro-cid-zdxu43nv>u</span> <span class="char" data-index="9" data-astro-cid-zdxu43nv>c</span> <span class="char" data-index="10" data-astro-cid-zdxu43nv>t</span> <span class="char" data-index="11" data-astro-cid-zdxu43nv>s</span> </h2> <!-- Japanese version (hidden by default, shown when ja) --> <h2 class="section-title animated-title ja-title" id="products-title-ja" style="display: none;" data-astro-cid-zdxu43nv> <span class="char" data-index="0" data-astro-cid-zdxu43nv>\u30D7</span> <span class="char" data-index="1" data-astro-cid-zdxu43nv>\u30ED</span> <span class="char" data-index="2" data-astro-cid-zdxu43nv>\u30C0</span> <span class="char" data-index="3" data-astro-cid-zdxu43nv>\u30AF</span> <span class="char" data-index="4" data-astro-cid-zdxu43nv>\u30C8</span> </h2> <!-- Subtitle --> <p class="section-subtitle animated-subtitle" id="products-subtitle" data-astro-cid-zdxu43nv> <span class="subtitle-text" data-i18n="productsSubtitle" data-astro-cid-zdxu43nv>Mods and libraries for Cobblemon</span> </p> </div> <div class="products-grid" data-astro-cid-zdxu43nv> <a href="/docs/cobbleranked/" class="product-card featured" data-astro-cid-zdxu43nv> <div class="product-icon" data-astro-cid-zdxu43nv> <img src="/cobbleranked.png" alt="CobbleRanked" data-astro-cid-zdxu43nv> </div> <div class="product-info" data-astro-cid-zdxu43nv> <h3 data-astro-cid-zdxu43nv>CobbleRanked</h3> <p data-i18n="cobblerankedDesc" data-astro-cid-zdxu43nv>ELO-based ranked battle system with seasons, leaderboards, and rewards.</p> <span class="product-tag" data-astro-cid-zdxu43nv>Featured</span> </div> </a> <a href="/docs/gashilibs/" class="product-card" data-astro-cid-zdxu43nv> <div class="product-icon library" data-astro-cid-zdxu43nv> <svg width="48" height="48" viewBox="0 0 24 24" fill="currentColor" data-astro-cid-zdxu43nv> <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" data-astro-cid-zdxu43nv></path> </svg> </div> <div class="product-info" data-astro-cid-zdxu43nv> <h3 data-astro-cid-zdxu43nv>GashiLibs</h3> <p data-i18n="gashilibsDesc" data-astro-cid-zdxu43nv>Shared library providing database connections, Redis, and config utilities.</p> <span class="product-tag library" data-astro-cid-zdxu43nv>Library</span> </div> </a> <a href="/docs/maillib/" class="product-card" data-astro-cid-zdxu43nv> <div class="product-icon library" data-astro-cid-zdxu43nv> <svg width="48" height="48" viewBox="0 0 24 24" fill="currentColor" data-astro-cid-zdxu43nv> <path d="M20 4H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z" data-astro-cid-zdxu43nv></path> </svg> </div> <div class="product-info" data-astro-cid-zdxu43nv> <h3 data-astro-cid-zdxu43nv>MailLib</h3> <p data-i18n="maillibDesc" data-astro-cid-zdxu43nv>In-game mailbox system for delivering rewards and items to players.</p> <span class="product-tag library" data-astro-cid-zdxu43nv>Library</span> </div> </a> </div> </div> </section> <script>
(function() {
	const translations = {
		en: {
			productsSubtitle: "Mods and libraries for Cobblemon",
			cobblerankedDesc: "ELO-based ranked battle system with seasons, leaderboards, and rewards.",
			gashilibsDesc: "Shared library providing database connections, Redis, and config utilities.",
			maillibDesc: "In-game mailbox system for delivering rewards and items to players."
		},
		ja: {
			productsSubtitle: "Cobblemon\u5411\u3051Mod\u30FB\u30E9\u30A4\u30D6\u30E9\u30EA",
			cobblerankedDesc: "ELO\u30EC\u30FC\u30C6\u30A3\u30F3\u30B0\u3092\u63A1\u7528\u3057\u305F\u30E9\u30F3\u30AF\u30D0\u30C8\u30EB\u30B7\u30B9\u30C6\u30E0\u3002\u30B7\u30FC\u30BA\u30F3\u3001\u30EA\u30FC\u30C0\u30FC\u30DC\u30FC\u30C9\u3001\u5831\u916C\u6A5F\u80FD\u3092\u642D\u8F09\u3002",
			gashilibsDesc: "\u30C7\u30FC\u30BF\u30D9\u30FC\u30B9\u63A5\u7D9A\u3001Redis\u3001\u8A2D\u5B9A\u7BA1\u7406\u306A\u3069\u306E\u5171\u6709\u30E9\u30A4\u30D6\u30E9\u30EA\u3002",
			maillibDesc: "\u30D7\u30EC\u30A4\u30E4\u30FC\u306B\u5831\u916C\u3084\u30A2\u30A4\u30C6\u30E0\u3092\u5C4A\u3051\u308B\u30B2\u30FC\u30E0\u5185\u30E1\u30FC\u30EB\u30B7\u30B9\u30C6\u30E0\u3002"
		}
	};

	let currentLang = 'en';
	let hasAnimated = false;

	function applyProductsTranslations(lang) {
		currentLang = lang;
		const t = translations[lang] || translations.en;

		// Handle title switching
		const enTitle = document.getElementById('products-title');
		const jaTitle = document.getElementById('products-title-ja');

		if (lang === 'ja') {
			enTitle.style.display = 'none';
			jaTitle.style.display = 'flex';
		} else {
			enTitle.style.display = 'flex';
			jaTitle.style.display = 'none';
		}

		// Apply other translations
		document.querySelectorAll('.products-section [data-i18n]').forEach(el => {
			const key = el.getAttribute('data-i18n');
			if (t[key]) {
				el.innerHTML = t[key];
			}
		});

		// Re-trigger animation if already visible and language changed
		if (hasAnimated) {
			resetAnimation();
			playAnimation();
		}
	}

	function resetAnimation() {
		const wrapper = document.getElementById('products-title-wrapper');
		const activeTitle = currentLang === 'ja'
			? document.getElementById('products-title-ja')
			: document.getElementById('products-title');
		const chars = activeTitle.querySelectorAll('.char');
		const dots = wrapper.querySelectorAll('.dot');
		const subtitle = wrapper.querySelector('.animated-subtitle');

		chars.forEach(char => {
			char.classList.remove('visible');
		});
		dots.forEach(dot => {
			dot.classList.remove('visible');
		});
		subtitle.classList.remove('visible');
	}

	function playAnimation() {
		const wrapper = document.getElementById('products-title-wrapper');
		const activeTitle = currentLang === 'ja'
			? document.getElementById('products-title-ja')
			: document.getElementById('products-title');
		const chars = activeTitle.querySelectorAll('.char');
		const dots = wrapper.querySelectorAll('.dot');
		const subtitle = wrapper.querySelector('.animated-subtitle');

		// Animate dots first (staggered)
		dots.forEach((dot, i) => {
			setTimeout(() => {
				dot.classList.add('visible');
			}, i * 100);
		});

		// Animate characters with stagger
		const charDelay = 60;
		chars.forEach((char, i) => {
			setTimeout(() => {
				char.classList.add('visible');
			}, 200 + i * charDelay);
		});

		// Animate subtitle after all chars
		const totalCharTime = 200 + chars.length * charDelay + 200;
		setTimeout(() => {
			subtitle.classList.add('visible');
		}, totalCharTime);

		hasAnimated = true;
	}

	// Intersection Observer for scroll-triggered animation
	function setupIntersectionObserver() {
		const wrapper = document.getElementById('products-title-wrapper');
		if (!wrapper) return;

		const observer = new IntersectionObserver((entries) => {
			entries.forEach(entry => {
				if (entry.isIntersecting && !hasAnimated) {
					playAnimation();
				}
			});
		}, {
			threshold: 0.3,
			rootMargin: '0px 0px -100px 0px'
		});

		observer.observe(wrapper);
	}

	// Initialize
	function init() {
		const lang = window.GashiLang?.get() || 'en';
		applyProductsTranslations(lang);
		setupIntersectionObserver();
	}

	// Listen for language changes
	window.addEventListener('langChange', (e) => {
		applyProductsTranslations(e.detail.lang);
	});

	if (document.readyState === 'loading') {
		document.addEventListener('DOMContentLoaded', init);
	} else {
		init();
	}
})();
<\/script> `])), maybeRenderHead());
}, "C:/MinecraftModDev/projects_gashistudios/[GashiStudios]CobbleRanked_Reloaded/docs-site/src/components/ProductsSection.astro", void 0);

var __freeze$1 = Object.freeze;
var __defProp$1 = Object.defineProperty;
var __template$1 = (cooked, raw) => __freeze$1(__defProp$1(cooked, "raw", { value: __freeze$1(cooked.slice()) }));
var _a$1;
const $$ShowcaseSection = createComponent(($$result, $$props, $$slots) => {
  return renderTemplate(_a$1 || (_a$1 = __template$1(["", `<section class="showcase-section" data-astro-cid-qgsuu4fa> <div class="showcase-container" data-astro-cid-qgsuu4fa> <div class="showcase-content" data-astro-cid-qgsuu4fa> <p class="showcase-label" data-i18n="showcaseLabel" data-astro-cid-qgsuu4fa>Powered by</p> <h2 class="showcase-title" data-astro-cid-qgsuu4fa>Cobblemon</h2> <p class="showcase-description" data-i18n="showcaseDesc" data-astro-cid-qgsuu4fa>
The ultimate Pokemon mod for Minecraft
</p> </div> <div class="showcase-image" data-astro-cid-qgsuu4fa> <img src="/cobblemon.png" alt="Cobblemon" data-astro-cid-qgsuu4fa> </div> </div> <div class="showcase-glow" data-astro-cid-qgsuu4fa></div> </section> <script>
(function() {
	const translations = {
		en: {
			showcaseLabel: "Powered by",
			showcaseDesc: "The ultimate Pokemon mod for Minecraft"
		},
		ja: {
			showcaseLabel: "Powered by",
			showcaseDesc: "Minecraft\u5411\u3051\u30DD\u30B1\u30E2\u30F3Mod"
		}
	};

	function applyShowcaseTranslations(lang) {
		const t = translations[lang] || translations.en;
		document.querySelectorAll('.showcase-section [data-i18n]').forEach(el => {
			const key = el.getAttribute('data-i18n');
			if (t[key]) {
				el.innerHTML = t[key];
			}
		});
	}

	function init() {
		const lang = window.GashiLang?.get() || 'en';
		applyShowcaseTranslations(lang);
	}

	window.addEventListener('langChange', (e) => {
		applyShowcaseTranslations(e.detail.lang);
	});

	if (document.readyState === 'loading') {
		document.addEventListener('DOMContentLoaded', init);
	} else {
		init();
	}
})();
<\/script> `])), maybeRenderHead());
}, "C:/MinecraftModDev/projects_gashistudios/[GashiStudios]CobbleRanked_Reloaded/docs-site/src/components/ShowcaseSection.astro", void 0);

var __freeze = Object.freeze;
var __defProp = Object.defineProperty;
var __template = (cooked, raw) => __freeze(__defProp(cooked, "raw", { value: __freeze(cooked.slice()) }));
var _a;
const $$TestimonialsSection = createComponent(($$result, $$props, $$slots) => {
  return renderTemplate(_a || (_a = __template(["", `<section id="testimonials" class="testimonials-section" data-astro-cid-zzqkys7x> <div class="testimonials-container" data-astro-cid-zzqkys7x> <!-- Animated Title with glowing line reveal --> <div class="title-wrapper" id="testimonials-title-wrapper" data-astro-cid-zzqkys7x> <div class="glow-title-container" data-astro-cid-zzqkys7x> <!-- Glowing sweep line --> <div class="glow-line" id="testimonials-glow-line" data-astro-cid-zzqkys7x></div> <!-- English title --> <h2 class="section-title glow-title" id="testimonials-title-en" data-astro-cid-zzqkys7x> <span class="char" data-astro-cid-zzqkys7x>W</span> <span class="char" data-astro-cid-zzqkys7x>h</span> <span class="char" data-astro-cid-zzqkys7x>a</span> <span class="char" data-astro-cid-zzqkys7x>t</span> <span class="char space" data-astro-cid-zzqkys7x>&nbsp;</span> <span class="char" data-astro-cid-zzqkys7x>U</span> <span class="char" data-astro-cid-zzqkys7x>s</span> <span class="char" data-astro-cid-zzqkys7x>e</span> <span class="char" data-astro-cid-zzqkys7x>r</span> <span class="char" data-astro-cid-zzqkys7x>s</span> <span class="char space" data-astro-cid-zzqkys7x>&nbsp;</span> <span class="char" data-astro-cid-zzqkys7x>S</span> <span class="char" data-astro-cid-zzqkys7x>a</span> <span class="char" data-astro-cid-zzqkys7x>y</span> </h2> <!-- Japanese title --> <h2 class="section-title glow-title ja-title" id="testimonials-title-ja" style="display: none;" data-astro-cid-zzqkys7x> <span class="char" data-astro-cid-zzqkys7x>\u30E6</span> <span class="char" data-astro-cid-zzqkys7x>\u30FC</span> <span class="char" data-astro-cid-zzqkys7x>\u30B6</span> <span class="char" data-astro-cid-zzqkys7x>\u30FC</span> <span class="char" data-astro-cid-zzqkys7x>\u30EC</span> <span class="char" data-astro-cid-zzqkys7x>\u30D3</span> <span class="char" data-astro-cid-zzqkys7x>\u30E5</span> <span class="char" data-astro-cid-zzqkys7x>\u30FC</span> </h2> </div> <!-- Subtitle --> <p class="section-subtitle animated-subtitle" id="testimonials-subtitle" data-astro-cid-zzqkys7x> <span class="subtitle-text" data-i18n="testimonialsSubtitle" data-astro-cid-zzqkys7x>Feedback from our community</span> </p> </div> <div class="testimonials-grid" data-astro-cid-zzqkys7x> <div class="testimonial-card" data-astro-cid-zzqkys7x> <div class="testimonial-header" data-astro-cid-zzqkys7x> <div class="testimonial-avatar" data-astro-cid-zzqkys7x>L</div> <div class="testimonial-info" data-astro-cid-zzqkys7x> <span class="testimonial-name" data-astro-cid-zzqkys7x>Luan</span> <div class="testimonial-rating" data-astro-cid-zzqkys7x> <span class="stars" data-astro-cid-zzqkys7x>\u2605\u2605\u2605\u2605\u2605</span> <span class="rating-text" data-astro-cid-zzqkys7x>10/10</span> </div> </div> </div> <p class="testimonial-text" data-i18n="testimonialLuan" data-astro-cid-zzqkys7x>
10/10 service, quick and efficient. 10/10 problem solving, all problems encountered were solved very quickly.
</p> </div> <div class="testimonial-card" data-astro-cid-zzqkys7x> <div class="testimonial-header" data-astro-cid-zzqkys7x> <div class="testimonial-avatar" data-astro-cid-zzqkys7x>D</div> <div class="testimonial-info" data-astro-cid-zzqkys7x> <span class="testimonial-name" data-astro-cid-zzqkys7x>diego_crd</span> <div class="testimonial-rating" data-astro-cid-zzqkys7x> <span class="stars" data-astro-cid-zzqkys7x>\u2605\u2605\u2605\u2605\u2605</span> <span class="rating-text" data-astro-cid-zzqkys7x>10/10</span> </div> </div> </div> <p class="testimonial-text" data-i18n="testimonialDiego" data-astro-cid-zzqkys7x>
I am delighted, excellent customer service, I recommend 10/10.
</p> </div> <div class="testimonial-card" data-astro-cid-zzqkys7x> <div class="testimonial-header" data-astro-cid-zzqkys7x> <div class="testimonial-avatar" data-astro-cid-zzqkys7x>S</div> <div class="testimonial-info" data-astro-cid-zzqkys7x> <span class="testimonial-name" data-astro-cid-zzqkys7x>Silverflames123</span> <div class="testimonial-rating" data-astro-cid-zzqkys7x> <span class="stars" data-astro-cid-zzqkys7x>\u2605\u2605\u2605\u2605\u2605</span> <span class="rating-text" data-astro-cid-zzqkys7x>10/10</span> </div> </div> </div> <p class="testimonial-text" data-i18n="testimonialSilver" data-astro-cid-zzqkys7x>
10/10 Quality, 10/10 Service. Extremely well made and very responsive to issues.
</p> </div> </div> </div> </section> <script>
(function() {
	const translations = {
		en: {
			testimonialsSubtitle: "Feedback from our community",
			testimonialLuan: "10/10 service, quick and efficient. 10/10 problem solving, all problems encountered were solved very quickly.",
			testimonialDiego: "I am delighted, excellent customer service, I recommend 10/10.",
			testimonialSilver: "10/10 Quality, 10/10 Service. Extremely well made and very responsive to issues."
		},
		ja: {
			testimonialsSubtitle: "\u30B3\u30DF\u30E5\u30CB\u30C6\u30A3\u304B\u3089\u306E\u58F0",
			testimonialLuan: "\u30B5\u30FC\u30D3\u30B910\u70B9\u6E80\u70B9\uFF01\u8FC5\u901F\u304B\u3064\u52B9\u7387\u7684\u3002\u554F\u984C\u89E3\u6C7A\u308210\u70B9\u6E80\u70B9\uFF01\u767A\u751F\u3057\u305F\u554F\u984C\u306F\u3059\u3079\u3066\u7D20\u65E9\u304F\u89E3\u6C7A\u3057\u3066\u3082\u3089\u3048\u307E\u3057\u305F\u3002",
			testimonialDiego: "\u5927\u6E80\u8DB3\u3067\u3059\u3002\u30AB\u30B9\u30BF\u30DE\u30FC\u30B5\u30DD\u30FC\u30C8\u304C\u7D20\u6674\u3089\u3057\u304F\u300110\u70B9\u6E80\u70B9\u3067\u304A\u3059\u3059\u3081\u3057\u307E\u3059\u3002",
			testimonialSilver: "\u30AF\u30AA\u30EA\u30C6\u30A310\u70B9\u6E80\u70B9\u3001\u30B5\u30FC\u30D3\u30B910\u70B9\u6E80\u70B9\u3002\u975E\u5E38\u306B\u4E01\u5BE7\u306B\u4F5C\u3089\u308C\u3066\u304A\u308A\u3001\u554F\u984C\u5BFE\u5FDC\u3082\u8FC5\u901F\u3067\u3059\u3002"
		}
	};

	let currentLang = 'en';
	let hasAnimated = false;

	function applyTestimonialsTranslations(lang) {
		currentLang = lang;
		const t = translations[lang] || translations.en;

		// Handle title switching
		const enTitle = document.getElementById('testimonials-title-en');
		const jaTitle = document.getElementById('testimonials-title-ja');

		if (lang === 'ja') {
			enTitle.style.display = 'none';
			jaTitle.style.display = 'flex';
		} else {
			enTitle.style.display = 'flex';
			jaTitle.style.display = 'none';
		}

		// Apply other translations
		document.querySelectorAll('.testimonials-section [data-i18n]').forEach(el => {
			const key = el.getAttribute('data-i18n');
			if (t[key]) {
				el.innerHTML = t[key];
			}
		});

		// Re-trigger animation if language changed after animation
		if (hasAnimated) {
			resetAnimation();
			playAnimation();
		}
	}

	function resetAnimation() {
		const wrapper = document.getElementById('testimonials-title-wrapper');
		const glowLine = document.getElementById('testimonials-glow-line');
		const activeTitle = currentLang === 'ja'
			? document.getElementById('testimonials-title-ja')
			: document.getElementById('testimonials-title-en');
		const chars = activeTitle.querySelectorAll('.char');
		const subtitle = wrapper.querySelector('.animated-subtitle');

		// Reset glow line
		glowLine.classList.remove('animate');

		// Reset chars
		chars.forEach(char => {
			char.classList.remove('visible', 'glow');
		});

		// Reset subtitle
		subtitle.classList.remove('visible');
	}

	function playAnimation() {
		const wrapper = document.getElementById('testimonials-title-wrapper');
		const glowLine = document.getElementById('testimonials-glow-line');
		const activeTitle = currentLang === 'ja'
			? document.getElementById('testimonials-title-ja')
			: document.getElementById('testimonials-title-en');
		const chars = activeTitle.querySelectorAll('.char');
		const subtitle = wrapper.querySelector('.animated-subtitle');

		// Start glow line animation
		glowLine.classList.add('animate');

		// Reveal characters as glow line passes
		const lineAnimDuration = 800; // ms
		const charCount = chars.length;

		chars.forEach((char, i) => {
			const delay = (i / charCount) * lineAnimDuration;
			setTimeout(() => {
				char.classList.add('glow');
				setTimeout(() => {
					char.classList.add('visible');
					char.classList.remove('glow');
				}, 150);
			}, delay + 100);
		});

		// Show subtitle after characters
		setTimeout(() => {
			subtitle.classList.add('visible');
		}, lineAnimDuration + 400);

		hasAnimated = true;
	}

	// Intersection Observer for scroll-triggered animation
	function setupIntersectionObserver() {
		const wrapper = document.getElementById('testimonials-title-wrapper');
		if (!wrapper) return;

		const observer = new IntersectionObserver((entries) => {
			entries.forEach(entry => {
				if (entry.isIntersecting && !hasAnimated) {
					playAnimation();
				}
			});
		}, {
			threshold: 0.3,
			rootMargin: '0px 0px -100px 0px'
		});

		observer.observe(wrapper);
	}

	// Initialize
	function init() {
		const lang = window.GashiLang?.get() || 'en';
		applyTestimonialsTranslations(lang);
		setupIntersectionObserver();
	}

	// Listen for language changes
	window.addEventListener('langChange', (e) => {
		applyTestimonialsTranslations(e.detail.lang);
	});

	if (document.readyState === 'loading') {
		document.addEventListener('DOMContentLoaded', init);
	} else {
		init();
	}
})();
<\/script> `])), maybeRenderHead());
}, "C:/MinecraftModDev/projects_gashistudios/[GashiStudios]CobbleRanked_Reloaded/docs-site/src/components/TestimonialsSection.astro", void 0);

const $$Astro = createAstro("https://gashistudios.site");
const $$LandingLayout = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$LandingLayout;
  const { title, description } = Astro2.props;
  const siteUrl = "https://gashistudios.site";
  const pageUrl = new URL(Astro2.url.pathname, siteUrl).href;
  const metaDescription = description || "GashiStudios - Cobblemon\u5411\u3051\u306E\u9AD8\u54C1\u8CEA\u306AMod\u3092\u5236\u4F5C\u3059\u308B\u30B3\u30DF\u30E5\u30CB\u30C6\u30A3";
  const ogParams = new URLSearchParams({
    title,
    subtitle: metaDescription
  });
  const ogImage = `${siteUrl}/api/og.png?${ogParams.toString()}`;
  return renderTemplate`<html lang="en"> <head><meta charset="UTF-8"><meta name="viewport" content="width=device-width, initial-scale=1.0"><link rel="icon" type="image/png" href="/gashistudios.png"><meta name="description"${addAttribute(metaDescription, "content")}><title>${title}</title><!-- Open Graph / Discord Embed --><meta property="og:type" content="website"><meta property="og:url"${addAttribute(pageUrl, "content")}><meta property="og:title"${addAttribute(title, "content")}><meta property="og:description"${addAttribute(metaDescription, "content")}><meta property="og:image"${addAttribute(ogImage, "content")}><meta property="og:site_name" content="GashiStudios"><!-- Twitter Card --><meta name="twitter:card" content="summary_large_image"><meta name="twitter:title"${addAttribute(title, "content")}><meta name="twitter:description"${addAttribute(metaDescription, "content")}><meta name="twitter:image"${addAttribute(ogImage, "content")}><!-- Theme Color (Discord embed sidebar) --><meta name="theme-color" content="#7c3aed"><link rel="preconnect" href="https://fonts.googleapis.com"><link rel="preconnect" href="https://fonts.gstatic.com" crossorigin><link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap" rel="stylesheet">${renderHead()}</head> <body> ${renderComponent($$result, "LoadingScreen", $$LoadingScreen, {})} ${renderComponent($$result, "CustomNav", $$CustomNav, {})} <main> ${renderComponent($$result, "HeroSection", $$HeroSection, {})} ${renderComponent($$result, "ProductsSection", $$ProductsSection, {})} ${renderComponent($$result, "ShowcaseSection", $$ShowcaseSection, {})} ${renderComponent($$result, "TestimonialsSection", $$TestimonialsSection, {})} </main> ${renderComponent($$result, "Footer", $$Footer, {})} ${renderComponent($$result, "LanguageSwitcher", $$LanguageSwitcher, {})} </body></html>`;
}, "C:/MinecraftModDev/projects_gashistudios/[GashiStudios]CobbleRanked_Reloaded/docs-site/src/layouts/LandingLayout.astro", void 0);

const $$Index = createComponent(($$result, $$props, $$slots) => {
  return renderTemplate`${renderComponent($$result, "LandingLayout", $$LandingLayout, { "title": "GashiStudios" })}`;
}, "C:/MinecraftModDev/projects_gashistudios/[GashiStudios]CobbleRanked_Reloaded/docs-site/src/pages/index.astro", void 0);

const $$file = "C:/MinecraftModDev/projects_gashistudios/[GashiStudios]CobbleRanked_Reloaded/docs-site/src/pages/index.astro";
const $$url = "";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
	__proto__: null,
	default: $$Index,
	file: $$file,
	url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };

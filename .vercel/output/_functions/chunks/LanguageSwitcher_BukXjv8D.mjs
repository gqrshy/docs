import { c as createComponent, r as renderTemplate, m as maybeRenderHead } from './astro/server_348rjAom.mjs';
import 'piccolore';
import 'clsx';
/* empty css                         */

var __freeze = Object.freeze;
var __defProp = Object.defineProperty;
var __template = (cooked, raw) => __freeze(__defProp(cooked, "raw", { value: __freeze(cooked.slice()) }));
var _a;
const $$LanguageSwitcher = createComponent(($$result, $$props, $$slots) => {
  return renderTemplate(_a || (_a = __template(["", `<div id="langSwitcher" class="lang-switcher" data-astro-cid-a2mxz4y6> <button id="langToggle" class="lang-toggle" aria-label="Change language" data-astro-cid-a2mxz4y6> <span class="lang-icon" data-astro-cid-a2mxz4y6>\u{1F310}</span> <span id="currentLang" data-astro-cid-a2mxz4y6>EN</span> <svg class="lang-arrow" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" data-astro-cid-a2mxz4y6> <polyline points="6 9 12 15 18 9" data-astro-cid-a2mxz4y6></polyline> </svg> </button> <div id="langMenu" class="lang-menu" data-astro-cid-a2mxz4y6> <button class="lang-option" data-lang="en" data-astro-cid-a2mxz4y6> <span class="lang-flag" data-astro-cid-a2mxz4y6>\u{1F1FA}\u{1F1F8}</span> <span data-astro-cid-a2mxz4y6>English</span> </button> <button class="lang-option" data-lang="ja" data-astro-cid-a2mxz4y6> <span class="lang-flag" data-astro-cid-a2mxz4y6>\u{1F1EF}\u{1F1F5}</span> <span data-astro-cid-a2mxz4y6>\u65E5\u672C\u8A9E</span> </button> </div> </div> <script>
(function() {
	const STORAGE_KEY = 'gashi_lang';
	const DEFAULT_LANG = 'en';

	// Get saved language or default to English
	function getSavedLang() {
		return localStorage.getItem(STORAGE_KEY) || DEFAULT_LANG;
	}

	// Save language preference
	function saveLang(lang) {
		localStorage.setItem(STORAGE_KEY, lang);
	}

	// Get current language
	function getCurrentLang() {
		return getSavedLang();
	}

	// Update UI
	function updateLangDisplay(lang) {
		const currentLangEl = document.getElementById('currentLang');
		if (currentLangEl) {
			currentLangEl.textContent = lang.toUpperCase();
		}

		// Update active state in menu
		document.querySelectorAll('.lang-option').forEach(opt => {
			opt.classList.toggle('active', opt.dataset.lang === lang);
		});
	}

	// Apply translations
	function applyTranslations(lang) {
		window.currentLang = lang;
		// Dispatch custom event for other components to listen
		window.dispatchEvent(new CustomEvent('langChange', { detail: { lang } }));
	}

	// Initialize
	function init() {
		const lang = getCurrentLang();
		updateLangDisplay(lang);
		applyTranslations(lang);

		// Toggle menu
		const toggle = document.getElementById('langToggle');
		const menu = document.getElementById('langMenu');
		const switcher = document.getElementById('langSwitcher');

		toggle?.addEventListener('click', (e) => {
			e.stopPropagation();
			switcher?.classList.toggle('open');
		});

		// Language selection
		document.querySelectorAll('.lang-option').forEach(option => {
			option.addEventListener('click', () => {
				const newLang = option.dataset.lang;
				saveLang(newLang);
				updateLangDisplay(newLang);
				applyTranslations(newLang);
				switcher?.classList.remove('open');
			});
		});

		// Close menu when clicking outside
		document.addEventListener('click', () => {
			switcher?.classList.remove('open');
		});
	}

	// Export for other scripts
	window.GashiLang = {
		get: getCurrentLang,
		set: (lang) => {
			saveLang(lang);
			updateLangDisplay(lang);
			applyTranslations(lang);
		}
	};

	// Run on DOM ready
	if (document.readyState === 'loading') {
		document.addEventListener('DOMContentLoaded', init);
	} else {
		init();
	}
})();
<\/script> `])), maybeRenderHead());
}, "C:/MinecraftModDev/projects_gashistudios/[GashiStudios]CobbleRanked_Reloaded/docs-site/src/components/LanguageSwitcher.astro", void 0);

export { $$LanguageSwitcher as $ };

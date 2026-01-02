import { c as createComponent, r as renderTemplate, a as renderComponent, b as renderHead } from '../chunks/astro/server_348rjAom.mjs';
import 'piccolore';
import { $ as $$CustomNav } from '../chunks/CustomNav_B9qbyrj7.mjs';
import { $ as $$Footer } from '../chunks/Footer_DueVcqUK.mjs';
import { $ as $$LanguageSwitcher } from '../chunks/LanguageSwitcher_BukXjv8D.mjs';
/* empty css                                   */
export { renderers } from '../renderers.mjs';

var __freeze = Object.freeze;
var __defProp = Object.defineProperty;
var __template = (cooked, raw) => __freeze(__defProp(cooked, "raw", { value: __freeze(cooked.slice()) }));
var _a;
const $$Servers = createComponent(($$result, $$props, $$slots) => {
  return renderTemplate(_a || (_a = __template(['<html lang="en"> <head><meta charset="UTF-8"><meta name="viewport" content="width=device-width, initial-scale=1.0"><link rel="icon" type="image/png" href="/gashistudios.png"><meta name="description" content="GashiStudios Server - \u30B2\u30FC\u30DE\u30FC\u304C\u597D\u304D\u305D\u3046\u306A\u8981\u7D20\u3092\u5168\u90E8\u7A81\u3063\u8FBC\u3093\u3060Minecraft\u30B5\u30FC\u30D0\u30FC"><title>GashiStudios Server</title><link rel="preconnect" href="https://fonts.googleapis.com"><link rel="preconnect" href="https://fonts.gstatic.com" crossorigin><link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800;900&family=Noto+Sans+JP:wght@400;500;700;900&display=swap" rel="stylesheet">', "</head> <body> ", ` <!-- Hero Section --> <section class="hero"> <div class="hero-bg"></div> <div class="hero-particles"></div> <div class="hero-content"> <p class="hero-subtitle" data-i18n="heroSubtitle">COMING MARCH 2026</p> <h1 class="hero-title"> <span class="hero-title-line" data-i18n="heroTitle1">\u30B2\u30FC\u30DE\u30FC\u304C\u597D\u304D\u306A\u8981\u7D20</span> <span class="hero-title-line hero-title-accent" data-i18n="heroTitle2">\u5168\u90E8\u5165\u308A\u3002</span> </h1> <p class="hero-desc" data-i18n="heroDesc">\u7AF6\u6280\u6027\u3001MMO\u3001PvP/PvE\u3001\u80B2\u6210\u3001\u7D4C\u6E08\u3001\u30B9\u30D4\u30FC\u30C9\u611F\u3068\u4E2D\u6BD2\u6027\u3002<br>1\u5E74\u4EE5\u4E0A\u304B\u3051\u3066\u672C\u6C17\u3067\u4F5C\u308A\u8FBC\u3093\u3060Minecraft\u30B5\u30FC\u30D0\u30FC\u3002</p> <div class="hero-cta"> <a href="https://discord.gg/VVVvBTqqyP" class="btn-primary" target="_blank"> <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"> <path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0 12.64 12.64 0 0 0-.617-1.25.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.057 19.9 19.9 0 0 0 5.993 3.03.078.078 0 0 0 .084-.028 14.09 14.09 0 0 0 1.226-1.994.076.076 0 0 0-.041-.106 13.107 13.107 0 0 1-1.872-.892.077.077 0 0 1-.008-.128 10.2 10.2 0 0 0 .372-.292.074.074 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127 12.299 12.299 0 0 1-1.873.892.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028 19.839 19.839 0 0 0 6.002-3.03.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.03zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.956-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.955-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.946 2.418-2.157 2.418z"></path> </svg> <span data-i18n="ctaDiscord">Discord\u3067\u6700\u65B0\u60C5\u5831\u3092\u30C1\u30A7\u30C3\u30AF</span> </a> </div> </div> <div class="scroll-indicator"> <div class="scroll-arrow"></div> </div> </section> <!-- Features Overview --> <section class="features-overview"> <div class="container"> <div class="feature-tags"> <span class="tag tag-pvp">PvP</span> <span class="tag tag-pve">PvE</span> <span class="tag tag-mmo">MMO</span> <span class="tag tag-competitive">Competitive</span> <span class="tag tag-economy">Economy</span> </div> </div> </section> <!-- Gun Combat Section --> <section class="content-section section-guns"> <div class="section-bg section-bg-guns"></div> <div class="container"> <div class="section-header"> <span class="section-number">01</span> <h2 class="section-title" data-i18n="gunsTitle">\u6483\u3063\u3066\u3001\u5012\u3057\u3066\u3001\u751F\u304D\u6B8B\u308C\u3002</h2> <p class="section-subtitle" data-i18n="gunsSubtitle">TaCZ - Tactical Combat Zone</p> </div> <div class="section-content"> <div class="content-card"> <div class="card-icon">\u{1F52B}</div> <h3 data-i18n="taczTitle">TaCZ Gun Mod</h3> <p data-i18n="taczDesc">1.21.1\u5BFE\u5FDC\u306E\u72EC\u81EA\u30D5\u30A9\u30FC\u30AF\u7248\u3002\u30EA\u30A2\u30EB\u306A\u9283\u6483\u6226\u3092\u5B9F\u73FE\u3002\u30A2\u30C9\u30AA\u30F3\u3067\u62E1\u5F35\u53EF\u80FD\u3002</p> </div> <div class="content-card featured"> <div class="card-icon">\u2694</div> <h3 data-i18n="arenaTitle">TaCZArena</h3> <p data-i18n="arenaDesc">LoL\u300C\u30A2\u30EA\u30FC\u30CA\u300D\xD7 Tarkov Arena\u3002\u77ED\u6642\u9593\u30FB\u9AD8\u5BC6\u5EA6\u306E\u7AF6\u6280\u5BFE\u6226\u3002\u7C21\u6613\u30D3\u30EB\u30C9\u30B7\u30B9\u30C6\u30E0\u642D\u8F09\u3002</p> <span class="card-badge" data-i18n="badgeDev">\u958B\u767A\u4E2D</span> </div> </div> </div> </section> <!-- Pokemon Section --> <section class="content-section section-pokemon"> <div class="section-bg section-bg-pokemon"></div> <div class="container"> <div class="section-header"> <span class="section-number">02</span> <h2 class="section-title" data-i18n="pokemonTitle">\u6355\u307E\u3048\u3066\u3001\u80B2\u3066\u3066\u3001\u6226\u3048\u3002</h2> <p class="section-subtitle">Cobblemon Ecosystem</p> </div> <div class="section-content section-content-3col"> <div class="content-card"> <div class="card-icon">\u{1F409}</div> <h3>Cobblemon</h3> <p data-i18n="cobblemonDesc">\u9AD8\u54C1\u8CEA\u30DD\u30B1\u30E2\u30F3Mod\u3002\u30E9\u30A4\u30C9\u30FB\u6599\u7406\u306A\u3069\u6700\u65B0\u6A5F\u80FD\u3002</p> </div> <div class="content-card"> <div class="card-icon">\u{1F3C6}</div> <h3>CobbleRanked</h3> <p data-i18n="rankedDesc">Elo\u30D9\u30FC\u30B9\u306E\u30E9\u30F3\u30AF\u30DE\u30C3\u30C1\u3002\u30AB\u30B8\u30E5\u30A2\u30EB\u5BFE\u6226\u3082\u3002</p> <span class="card-badge card-badge-done" data-i18n="badgeDone">\u5B9F\u88C5\u6E08</span> </div> <div class="content-card"> <div class="card-icon">\u{1F5FA}</div> <h3>CobbleDungeon</h3> <p data-i18n="dungeonDesc">\u300C\u4E0D\u601D\u8B70\u306E\u30C0\u30F3\u30B8\u30E7\u30F3\u300D\u7740\u60F3\u3002\u30E9\u30F3\u30C0\u30E0\u751F\u6210\u30A4\u30F3\u30B9\u30BF\u30F3\u30B9\u3002</p> <span class="card-badge" data-i18n="badgeDev">\u958B\u767A\u4E2D</span> </div> <div class="content-card"> <div class="card-icon">\u{1F3F0}</div> <h3>CobbleGymWar</h3> <p data-i18n="gymwarDesc">\u30B8\u30E0\u30EA\u30FC\u30C0\u30FC\u306E\u5EA7\u3092\u5DE1\u308B\u52E2\u529B\u4E89\u3044\u3002MMO\u30AE\u30EB\u30C9\u6226\u98A8\u3002</p> <span class="card-badge card-badge-test" data-i18n="badgeTest">\u30C6\u30B9\u30C8\u4E2D</span> </div> <div class="content-card"> <div class="card-icon">\u{1F3AF}</div> <h3>CobbleCatchCombo</h3> <p data-i18n="comboDesc">Pokemon Let's GO\u306E\u300C\u30B3\u30F3\u30DC\u6355\u7372\u300D\u3092\u518D\u73FE\u3002</p> <span class="card-badge card-badge-test" data-i18n="badgeTest">\u30C6\u30B9\u30C8\u4E2D</span> </div> <div class="content-card"> <div class="card-icon">\u{1F4B0}</div> <h3>GashiMarket</h3> <p data-i18n="marketDesc">MMO\u30E9\u30A4\u30AF\u306A\u30D5\u30EA\u30FC\u30DE\u30FC\u30B1\u30C3\u30C8\u30FB\u7D4C\u6E08\u30B7\u30B9\u30C6\u30E0\u3002</p> <span class="card-badge card-badge-test" data-i18n="badgeTest">\u30C6\u30B9\u30C8\u4E2D</span> </div> </div> </div> </section> <!-- Target Audience Section --> <section class="content-section section-target"> <div class="container"> <div class="section-header section-header-center"> <h2 class="section-title" data-i18n="targetTitle">\u3053\u3093\u306A\u4EBA\u306B\u523A\u3055\u308B\u3002</h2> </div> <div class="target-grid"> <div class="target-item"> <span class="target-icon">\u{1F3AE}</span> <span data-i18n="target1">\u7AF6\u6280\u6027\u304C\u597D\u304D</span> </div> <div class="target-item"> <span class="target-icon">\u2694</span> <span data-i18n="target2">PvP / PvE\u4E21\u65B9\u697D\u3057\u307F\u305F\u3044</span> </div> <div class="target-item"> <span class="target-icon">\u{1F4C8}</span> <span data-i18n="target3">\u80B2\u6210\u30FB\u30D3\u30EB\u30C9\u304C\u597D\u304D</span> </div> <div class="target-item"> <span class="target-icon">\u{1F48E}</span> <span data-i18n="target4">\u7D4C\u6E08\u8981\u7D20\u304C\u597D\u304D</span> </div> <div class="target-item"> <span class="target-icon">\u26A1</span> <span data-i18n="target5">\u30B9\u30D4\u30FC\u30C9\u611F\u30FB\u4E2D\u6BD2\u6027\u91CD\u8996</span> </div> <div class="target-item"> <span class="target-icon">\u{1F310}</span> <span data-i18n="target6">MMO\u8981\u7D20\u304C\u597D\u304D</span> </div> </div> </div> </section> <!-- CTA Section --> <section class="cta-section"> <div class="container"> <div class="cta-content"> <p class="cta-date">2026.03</p> <h2 class="cta-title" data-i18n="ctaTitle">\u958B\u767A\u9032\u884C\u4E2D</h2> <p class="cta-desc" data-i18n="ctaDesc">\u6700\u65B0\u60C5\u5831\u306FDiscord\u3067\u914D\u4FE1\u4E2D\u3002\u958B\u767A\u306E\u88CF\u5074\u3082\u516C\u958B\u3057\u3066\u3044\u307E\u3059\u3002</p> <a href="https://discord.gg/VVVvBTqqyP" class="btn-primary btn-large" target="_blank"> <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor"> <path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0 12.64 12.64 0 0 0-.617-1.25.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.057 19.9 19.9 0 0 0 5.993 3.03.078.078 0 0 0 .084-.028 14.09 14.09 0 0 0 1.226-1.994.076.076 0 0 0-.041-.106 13.107 13.107 0 0 1-1.872-.892.077.077 0 0 1-.008-.128 10.2 10.2 0 0 0 .372-.292.074.074 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127 12.299 12.299 0 0 1-1.873.892.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028 19.839 19.839 0 0 0 6.002-3.03.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.03zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.956-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.955-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.946 2.418-2.157 2.418z"></path> </svg> <span data-i18n="ctaButton">Discord\u306B\u53C2\u52A0\u3059\u308B</span> </a> </div> </div> </section> `, " ", ` <script>
	(function() {
		const translations = {
			en: {
				heroSubtitle: "COMING MARCH 2026",
				heroTitle1: "Everything Gamers Love,",
				heroTitle2: "All in One.",
				heroDesc: "Competitive play, MMO elements, PvP/PvE, builds, economy, speed and addiction.<br>A Minecraft server built with passion over a year.",
				ctaDiscord: "Get Updates on Discord",
				gunsTitle: "Shoot. Eliminate. Survive.",
				gunsSubtitle: "TaCZ - Tactical Combat Zone",
				taczTitle: "TaCZ Gun Mod",
				taczDesc: "Custom fork for 1.21.1. Realistic gunplay. Expandable with addons.",
				arenaTitle: "TaCZArena",
				arenaDesc: "LoL Arena \xD7 Tarkov Arena. Short, intense competitive matches. Simple build system.",
				pokemonTitle: "Catch. Train. Battle.",
				cobblemonDesc: "High-quality Pokemon mod. Latest features: riding, cooking.",
				rankedDesc: "ELO-based ranked matches. Casual mode available.",
				dungeonDesc: "Mystery Dungeon inspired. Random instance generation.",
				gymwarDesc: "Fight for Gym Leader status. MMO guild war style.",
				comboDesc: "Pokemon Let's GO catch combo system recreated.",
				marketDesc: "MMO-style freemarket economy system.",
				badgeDev: "In Development",
				badgeDone: "Ready",
				badgeTest: "Testing",
				targetTitle: "Perfect for you if...",
				target1: "You love competitive play",
				target2: "You enjoy both PvP & PvE",
				target3: "You love builds & progression",
				target4: "You enjoy economy systems",
				target5: "You crave speed & addiction",
				target6: "You love MMO elements",
				ctaTitle: "In Development",
				ctaDesc: "Follow development updates on Discord. Behind-the-scenes content available.",
				ctaButton: "Join Discord"
			},
			ja: {
				heroSubtitle: "2026\u5E743\u6708 \u516C\u958B\u4E88\u5B9A",
				heroTitle1: "\u30B2\u30FC\u30DE\u30FC\u304C\u597D\u304D\u306A\u8981\u7D20",
				heroTitle2: "\u5168\u90E8\u5165\u308A\u3002",
				heroDesc: "\u7AF6\u6280\u6027\u3001MMO\u3001PvP/PvE\u3001\u80B2\u6210\u3001\u7D4C\u6E08\u3001\u30B9\u30D4\u30FC\u30C9\u611F\u3068\u4E2D\u6BD2\u6027\u3002<br>1\u5E74\u4EE5\u4E0A\u304B\u3051\u3066\u672C\u6C17\u3067\u4F5C\u308A\u8FBC\u3093\u3060Minecraft\u30B5\u30FC\u30D0\u30FC\u3002",
				ctaDiscord: "Discord\u3067\u6700\u65B0\u60C5\u5831\u3092\u30C1\u30A7\u30C3\u30AF",
				gunsTitle: "\u6483\u3063\u3066\u3001\u5012\u3057\u3066\u3001\u751F\u304D\u6B8B\u308C\u3002",
				gunsSubtitle: "TaCZ - Tactical Combat Zone",
				taczTitle: "TaCZ Gun Mod",
				taczDesc: "1.21.1\u5BFE\u5FDC\u306E\u72EC\u81EA\u30D5\u30A9\u30FC\u30AF\u7248\u3002\u30EA\u30A2\u30EB\u306A\u9283\u6483\u6226\u3092\u5B9F\u73FE\u3002\u30A2\u30C9\u30AA\u30F3\u3067\u62E1\u5F35\u53EF\u80FD\u3002",
				arenaTitle: "TaCZArena",
				arenaDesc: "LoL\u300C\u30A2\u30EA\u30FC\u30CA\u300D\xD7 Tarkov Arena\u3002\u77ED\u6642\u9593\u30FB\u9AD8\u5BC6\u5EA6\u306E\u7AF6\u6280\u5BFE\u6226\u3002\u7C21\u6613\u30D3\u30EB\u30C9\u30B7\u30B9\u30C6\u30E0\u642D\u8F09\u3002",
				pokemonTitle: "\u6355\u307E\u3048\u3066\u3001\u80B2\u3066\u3066\u3001\u6226\u3048\u3002",
				cobblemonDesc: "\u9AD8\u54C1\u8CEA\u30DD\u30B1\u30E2\u30F3Mod\u3002\u30E9\u30A4\u30C9\u30FB\u6599\u7406\u306A\u3069\u6700\u65B0\u6A5F\u80FD\u3002",
				rankedDesc: "Elo\u30D9\u30FC\u30B9\u306E\u30E9\u30F3\u30AF\u30DE\u30C3\u30C1\u3002\u30AB\u30B8\u30E5\u30A2\u30EB\u5BFE\u6226\u3082\u3002",
				dungeonDesc: "\u300C\u4E0D\u601D\u8B70\u306E\u30C0\u30F3\u30B8\u30E7\u30F3\u300D\u7740\u60F3\u3002\u30E9\u30F3\u30C0\u30E0\u751F\u6210\u30A4\u30F3\u30B9\u30BF\u30F3\u30B9\u3002",
				gymwarDesc: "\u30B8\u30E0\u30EA\u30FC\u30C0\u30FC\u306E\u5EA7\u3092\u5DE1\u308B\u52E2\u529B\u4E89\u3044\u3002MMO\u30AE\u30EB\u30C9\u6226\u98A8\u3002",
				comboDesc: "Pokemon Let's GO\u306E\u300C\u30B3\u30F3\u30DC\u6355\u7372\u300D\u3092\u518D\u73FE\u3002",
				marketDesc: "MMO\u30E9\u30A4\u30AF\u306A\u30D5\u30EA\u30FC\u30DE\u30FC\u30B1\u30C3\u30C8\u30FB\u7D4C\u6E08\u30B7\u30B9\u30C6\u30E0\u3002",
				badgeDev: "\u958B\u767A\u4E2D",
				badgeDone: "\u5B9F\u88C5\u6E08",
				badgeTest: "\u30C6\u30B9\u30C8\u4E2D",
				targetTitle: "\u3053\u3093\u306A\u4EBA\u306B\u523A\u3055\u308B\u3002",
				target1: "\u7AF6\u6280\u6027\u304C\u597D\u304D",
				target2: "PvP / PvE\u4E21\u65B9\u697D\u3057\u307F\u305F\u3044",
				target3: "\u80B2\u6210\u30FB\u30D3\u30EB\u30C9\u304C\u597D\u304D",
				target4: "\u7D4C\u6E08\u8981\u7D20\u304C\u597D\u304D",
				target5: "\u30B9\u30D4\u30FC\u30C9\u611F\u30FB\u4E2D\u6BD2\u6027\u91CD\u8996",
				target6: "MMO\u8981\u7D20\u304C\u597D\u304D",
				ctaTitle: "\u958B\u767A\u9032\u884C\u4E2D",
				ctaDesc: "\u6700\u65B0\u60C5\u5831\u306FDiscord\u3067\u914D\u4FE1\u4E2D\u3002\u958B\u767A\u306E\u88CF\u5074\u3082\u516C\u958B\u3057\u3066\u3044\u307E\u3059\u3002",
				ctaButton: "Discord\u306B\u53C2\u52A0\u3059\u308B"
			}
		};

		function applyTranslations(lang) {
			const t = translations[lang] || translations.ja;
			document.querySelectorAll('[data-i18n]').forEach(el => {
				const key = el.getAttribute('data-i18n');
				if (t[key]) {
					if (el.tagName === 'INPUT' || el.tagName === 'TEXTAREA') {
						el.placeholder = t[key];
					} else {
						el.innerHTML = t[key];
					}
				}
			});
		}

		function init() {
			const lang = window.GashiLang?.get() || 'ja';
			applyTranslations(lang);
		}

		window.addEventListener('langChange', (e) => {
			applyTranslations(e.detail.lang);
		});

		if (document.readyState === 'loading') {
			document.addEventListener('DOMContentLoaded', init);
		} else {
			init();
		}

		// Intersection Observer for animations
		const observer = new IntersectionObserver((entries) => {
			entries.forEach(entry => {
				if (entry.isIntersecting) {
					entry.target.classList.add('visible');
				}
			});
		}, { threshold: 0.1 });

		document.querySelectorAll('.content-card, .section-header, .target-item').forEach(el => {
			observer.observe(el);
		});
	})();
	<\/script>  </body> </html>`])), renderHead(), renderComponent($$result, "CustomNav", $$CustomNav, {}), renderComponent($$result, "Footer", $$Footer, {}), renderComponent($$result, "LanguageSwitcher", $$LanguageSwitcher, {}));
}, "C:/MinecraftModDev/projects_gashistudios/[GashiStudios]CobbleRanked_Reloaded/docs-site/src/pages/servers.astro", void 0);

const $$file = "C:/MinecraftModDev/projects_gashistudios/[GashiStudios]CobbleRanked_Reloaded/docs-site/src/pages/servers.astro";
const $$url = "/servers";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
	__proto__: null,
	default: $$Servers,
	file: $$file,
	url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };

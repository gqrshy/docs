import { A as AstroError, R as RenderUndefinedEntryError, c as createComponent, u as unescapeHTML, r as renderTemplate, U as UnknownContentCollectionError, a as renderUniqueStylesheet, b as renderScriptElement, d as createHeadAndContent, e as renderComponent, f as createAstro, g as addAttribute, h as renderScript, m as maybeRenderHead, i as renderSlot, j as renderTransition, k as renderHead } from '../../chunks/astro/server_CKVJvFjE.mjs';
import 'piccolore';
import { escape } from 'html-escaper';
import { Traverse } from 'neotraverse/modern';
import pLimit from 'p-limit';
import { z } from 'zod';
import { r as removeBase, i as isRemotePath, p as prependForwardSlash } from '../../chunks/path_tbLlI_c1.mjs';
import { V as VALID_INPUT_FORMATS } from '../../chunks/consts_BmVDRGlB.mjs';
import * as devalue from 'devalue';
import 'clsx';
/* empty css                                     */
import { $ as $$CustomNav } from '../../chunks/CustomNav_dP_5Sj4s.mjs';
export { renderers } from '../../renderers.mjs';

const CONTENT_IMAGE_FLAG = "astroContentImageFlag";
const IMAGE_IMPORT_PREFIX = "__ASTRO_IMAGE_";

function imageSrcToImportId(imageSrc, filePath) {
  imageSrc = removeBase(imageSrc, IMAGE_IMPORT_PREFIX);
  if (isRemotePath(imageSrc)) {
    return;
  }
  const ext = imageSrc.split(".").at(-1)?.toLowerCase();
  if (!ext || !VALID_INPUT_FORMATS.includes(ext)) {
    return;
  }
  const params = new URLSearchParams(CONTENT_IMAGE_FLAG);
  if (filePath) {
    params.set("importer", filePath);
  }
  return `${imageSrc}?${params.toString()}`;
}

class ImmutableDataStore {
  _collections = /* @__PURE__ */ new Map();
  constructor() {
    this._collections = /* @__PURE__ */ new Map();
  }
  get(collectionName, key) {
    return this._collections.get(collectionName)?.get(String(key));
  }
  entries(collectionName) {
    const collection = this._collections.get(collectionName) ?? /* @__PURE__ */ new Map();
    return [...collection.entries()];
  }
  values(collectionName) {
    const collection = this._collections.get(collectionName) ?? /* @__PURE__ */ new Map();
    return [...collection.values()];
  }
  keys(collectionName) {
    const collection = this._collections.get(collectionName) ?? /* @__PURE__ */ new Map();
    return [...collection.keys()];
  }
  has(collectionName, key) {
    const collection = this._collections.get(collectionName);
    if (collection) {
      return collection.has(String(key));
    }
    return false;
  }
  hasCollection(collectionName) {
    return this._collections.has(collectionName);
  }
  collections() {
    return this._collections;
  }
  /**
   * Attempts to load a DataStore from the virtual module.
   * This only works in Vite.
   */
  static async fromModule() {
    try {
      const data = await import('../../chunks/_astro_data-layer-content_Bwo8oq4r.mjs');
      if (data.default instanceof Map) {
        return ImmutableDataStore.fromMap(data.default);
      }
      const map = devalue.unflatten(data.default);
      return ImmutableDataStore.fromMap(map);
    } catch {
    }
    return new ImmutableDataStore();
  }
  static async fromMap(data) {
    const store = new ImmutableDataStore();
    store._collections = data;
    return store;
  }
}
function dataStoreSingleton() {
  let instance = void 0;
  return {
    get: async () => {
      if (!instance) {
        instance = ImmutableDataStore.fromModule();
      }
      return instance;
    },
    set: (store) => {
      instance = store;
    }
  };
}
const globalDataStore = dataStoreSingleton();

const __vite_import_meta_env__ = {"ASSETS_PREFIX": undefined, "BASE_URL": "/", "DEV": false, "MODE": "production", "PROD": true, "SITE": "https://gashistudios.site", "SSR": true};
function createCollectionToGlobResultMap({
  globResult,
  contentDir
}) {
  const collectionToGlobResultMap = {};
  for (const key in globResult) {
    const keyRelativeToContentDir = key.replace(new RegExp(`^${contentDir}`), "");
    const segments = keyRelativeToContentDir.split("/");
    if (segments.length <= 1) continue;
    const collection = segments[0];
    collectionToGlobResultMap[collection] ??= {};
    collectionToGlobResultMap[collection][key] = globResult[key];
  }
  return collectionToGlobResultMap;
}
z.object({
  tags: z.array(z.string()).optional(),
  lastModified: z.date().optional()
});
function createGetCollection({
  contentCollectionToEntryMap,
  dataCollectionToEntryMap,
  getRenderEntryImport,
  cacheEntriesByCollection,
  liveCollections
}) {
  return async function getCollection(collection, filter) {
    if (collection in liveCollections) {
      throw new AstroError({
        ...UnknownContentCollectionError,
        message: `Collection "${collection}" is a live collection. Use getLiveCollection() instead of getCollection().`
      });
    }
    const hasFilter = typeof filter === "function";
    const store = await globalDataStore.get();
    let type;
    if (collection in contentCollectionToEntryMap) {
      type = "content";
    } else if (collection in dataCollectionToEntryMap) {
      type = "data";
    } else if (store.hasCollection(collection)) {
      const { default: imageAssetMap } = await import('../../chunks/content-assets_w6k5IAKd.mjs');
      const result = [];
      for (const rawEntry of store.values(collection)) {
        const data = updateImageReferencesInData(rawEntry.data, rawEntry.filePath, imageAssetMap);
        let entry = {
          ...rawEntry,
          data,
          collection
        };
        if (entry.legacyId) {
          entry = emulateLegacyEntry(entry);
        }
        if (hasFilter && !filter(entry)) {
          continue;
        }
        result.push(entry);
      }
      return result;
    } else {
      console.warn(
        `The collection ${JSON.stringify(
          collection
        )} does not exist or is empty. Please check your content config file for errors.`
      );
      return [];
    }
    const lazyImports = Object.values(
      type === "content" ? contentCollectionToEntryMap[collection] : dataCollectionToEntryMap[collection]
    );
    let entries = [];
    if (!Object.assign(__vite_import_meta_env__, { _: process.env._ })?.DEV && cacheEntriesByCollection.has(collection)) {
      entries = cacheEntriesByCollection.get(collection);
    } else {
      const limit = pLimit(10);
      entries = await Promise.all(
        lazyImports.map(
          (lazyImport) => limit(async () => {
            const entry = await lazyImport();
            return type === "content" ? {
              id: entry.id,
              slug: entry.slug,
              body: entry.body,
              collection: entry.collection,
              data: entry.data,
              async render() {
                return render({
                  collection: entry.collection,
                  id: entry.id,
                  renderEntryImport: await getRenderEntryImport(collection, entry.slug)
                });
              }
            } : {
              id: entry.id,
              collection: entry.collection,
              data: entry.data
            };
          })
        )
      );
      cacheEntriesByCollection.set(collection, entries);
    }
    if (hasFilter) {
      return entries.filter(filter);
    } else {
      return entries.slice();
    }
  };
}
function emulateLegacyEntry({ legacyId, ...entry }) {
  const legacyEntry = {
    ...entry,
    id: legacyId,
    slug: entry.id
  };
  return {
    ...legacyEntry,
    // Define separately so the render function isn't included in the object passed to `renderEntry()`
    render: () => renderEntry(legacyEntry)
  };
}
const CONTENT_LAYER_IMAGE_REGEX = /__ASTRO_IMAGE_="([^"]+)"/g;
async function updateImageReferencesInBody(html, fileName) {
  const { default: imageAssetMap } = await import('../../chunks/content-assets_w6k5IAKd.mjs');
  const imageObjects = /* @__PURE__ */ new Map();
  const { getImage } = await import('../../chunks/_astro_assets_Ca0fiBDE.mjs').then(n => n._);
  for (const [_full, imagePath] of html.matchAll(CONTENT_LAYER_IMAGE_REGEX)) {
    try {
      const decodedImagePath = JSON.parse(imagePath.replaceAll("&#x22;", '"'));
      let image;
      if (URL.canParse(decodedImagePath.src)) {
        image = await getImage(decodedImagePath);
      } else {
        const id = imageSrcToImportId(decodedImagePath.src, fileName);
        const imported = imageAssetMap.get(id);
        if (!id || imageObjects.has(id) || !imported) {
          continue;
        }
        image = await getImage({ ...decodedImagePath, src: imported });
      }
      imageObjects.set(imagePath, image);
    } catch {
      throw new Error(`Failed to parse image reference: ${imagePath}`);
    }
  }
  return html.replaceAll(CONTENT_LAYER_IMAGE_REGEX, (full, imagePath) => {
    const image = imageObjects.get(imagePath);
    if (!image) {
      return full;
    }
    const { index, ...attributes } = image.attributes;
    return Object.entries({
      ...attributes,
      src: image.src,
      srcset: image.srcSet.attribute,
      // This attribute is used by the toolbar audit
      ...Object.assign(__vite_import_meta_env__, { _: process.env._ }).DEV ? { "data-image-component": "true" } : {}
    }).map(([key, value]) => value ? `${key}="${escape(value)}"` : "").join(" ");
  });
}
function updateImageReferencesInData(data, fileName, imageAssetMap) {
  return new Traverse(data).map(function(ctx, val) {
    if (typeof val === "string" && val.startsWith(IMAGE_IMPORT_PREFIX)) {
      const src = val.replace(IMAGE_IMPORT_PREFIX, "");
      const id = imageSrcToImportId(src, fileName);
      if (!id) {
        ctx.update(src);
        return;
      }
      const imported = imageAssetMap?.get(id);
      if (imported) {
        ctx.update(imported);
      } else {
        ctx.update(src);
      }
    }
  });
}
async function renderEntry(entry) {
  if (!entry) {
    throw new AstroError(RenderUndefinedEntryError);
  }
  if ("render" in entry && !("legacyId" in entry)) {
    return entry.render();
  }
  if (entry.deferredRender) {
    try {
      const { default: contentModules } = await import('../../chunks/content-modules_Dz-S_Wwv.mjs');
      const renderEntryImport = contentModules.get(entry.filePath);
      return render({
        collection: "",
        id: entry.id,
        renderEntryImport
      });
    } catch (e) {
      console.error(e);
    }
  }
  const html = entry?.rendered?.metadata?.imagePaths?.length && entry.filePath ? await updateImageReferencesInBody(entry.rendered.html, entry.filePath) : entry?.rendered?.html;
  const Content = createComponent(() => renderTemplate`${unescapeHTML(html)}`);
  return {
    Content,
    headings: entry?.rendered?.metadata?.headings ?? [],
    remarkPluginFrontmatter: entry?.rendered?.metadata?.frontmatter ?? {}
  };
}
async function render({
  collection,
  id,
  renderEntryImport
}) {
  const UnexpectedRenderError = new AstroError({
    ...UnknownContentCollectionError,
    message: `Unexpected error while rendering ${String(collection)} → ${String(id)}.`
  });
  if (typeof renderEntryImport !== "function") throw UnexpectedRenderError;
  const baseMod = await renderEntryImport();
  if (baseMod == null || typeof baseMod !== "object") throw UnexpectedRenderError;
  const { default: defaultMod } = baseMod;
  if (isPropagatedAssetsModule(defaultMod)) {
    const { collectedStyles, collectedLinks, collectedScripts, getMod } = defaultMod;
    if (typeof getMod !== "function") throw UnexpectedRenderError;
    const propagationMod = await getMod();
    if (propagationMod == null || typeof propagationMod !== "object") throw UnexpectedRenderError;
    const Content = createComponent({
      factory(result, baseProps, slots) {
        let styles = "", links = "", scripts = "";
        if (Array.isArray(collectedStyles)) {
          styles = collectedStyles.map((style) => {
            return renderUniqueStylesheet(result, {
              type: "inline",
              content: style
            });
          }).join("");
        }
        if (Array.isArray(collectedLinks)) {
          links = collectedLinks.map((link) => {
            return renderUniqueStylesheet(result, {
              type: "external",
              src: prependForwardSlash(link)
            });
          }).join("");
        }
        if (Array.isArray(collectedScripts)) {
          scripts = collectedScripts.map((script) => renderScriptElement(script)).join("");
        }
        let props = baseProps;
        if (id.endsWith("mdx")) {
          props = {
            components: propagationMod.components ?? {},
            ...baseProps
          };
        }
        return createHeadAndContent(
          unescapeHTML(styles + links + scripts),
          renderTemplate`${renderComponent(
            result,
            "Content",
            propagationMod.Content,
            props,
            slots
          )}`
        );
      },
      propagation: "self"
    });
    return {
      Content,
      headings: propagationMod.getHeadings?.() ?? [],
      remarkPluginFrontmatter: propagationMod.frontmatter ?? {}
    };
  } else if (baseMod.Content && typeof baseMod.Content === "function") {
    return {
      Content: baseMod.Content,
      headings: baseMod.getHeadings?.() ?? [],
      remarkPluginFrontmatter: baseMod.frontmatter ?? {}
    };
  } else {
    throw UnexpectedRenderError;
  }
}
function isPropagatedAssetsModule(module) {
  return typeof module === "object" && module != null && "__astroPropagation" in module;
}

// astro-head-inject

const liveCollections = {};

const contentDir = '/src/content/';

const contentEntryGlob = "";
const contentCollectionToEntryMap = createCollectionToGlobResultMap({
	globResult: contentEntryGlob,
	contentDir,
});

const dataEntryGlob = "";
const dataCollectionToEntryMap = createCollectionToGlobResultMap({
	globResult: dataEntryGlob,
	contentDir,
});
createCollectionToGlobResultMap({
	globResult: { ...contentEntryGlob, ...dataEntryGlob },
	contentDir,
});

let lookupMap = {};
lookupMap = {};

new Set(Object.keys(lookupMap));

function createGlobLookup(glob) {
	return async (collection, lookupId) => {
		const filePath = lookupMap[collection]?.entries[lookupId];

		if (!filePath) return undefined;
		return glob[collection][filePath];
	};
}

const renderEntryGlob = "";
const collectionToRenderEntryMap = createCollectionToGlobResultMap({
	globResult: renderEntryGlob,
	contentDir,
});

const cacheEntriesByCollection = new Map();
const getCollection = createGetCollection({
	contentCollectionToEntryMap,
	dataCollectionToEntryMap,
	getRenderEntryImport: createGlobLookup(collectionToRenderEntryMap),
	cacheEntriesByCollection,
	liveCollections,
});

const $$Astro$4 = createAstro("https://gashistudios.site");
const $$ClientRouter = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$4, $$props, $$slots);
  Astro2.self = $$ClientRouter;
  const { fallback = "animate" } = Astro2.props;
  return renderTemplate`<meta name="astro-view-transitions-enabled" content="true"><meta name="astro-view-transitions-fallback"${addAttribute(fallback, "content")}>${renderScript($$result, "C:/MinecraftModDev/projects_gashistudios/[GashiStudios]CobbleRanked_Reloaded/docs-site/node_modules/astro/components/ClientRouter.astro?astro&type=script&index=0&lang.ts")}`;
}, "C:/MinecraftModDev/projects_gashistudios/[GashiStudios]CobbleRanked_Reloaded/docs-site/node_modules/astro/components/ClientRouter.astro", void 0);

var __freeze$2 = Object.freeze;
var __defProp$2 = Object.defineProperty;
var __template$2 = (cooked, raw) => __freeze$2(__defProp$2(cooked, "raw", { value: __freeze$2(cooked.slice()) }));
var _a$2;
const $$Astro$3 = createAstro("https://gashistudios.site");
const $$DocSidebar = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$3, $$props, $$slots);
  Astro2.self = $$DocSidebar;
  const currentPath = Astro2.url.pathname;
  const navigation = [
    {
      title: "CobbleRanked",
      icon: "\u{1F3C6}",
      items: [
        { label: "Overview", href: "/docs/cobbleranked/" },
        {
          label: "Getting Started",
          items: [
            { label: "Introduction", href: "/docs/cobbleranked/getting-started/introduction/" },
            { label: "Installation", href: "/docs/cobbleranked/getting-started/installation/" },
            { label: "Quick Start", href: "/docs/cobbleranked/getting-started/quick-start/" },
            { label: "Commands", href: "/docs/cobbleranked/getting-started/commands/" }
          ]
        },
        {
          label: "Features",
          items: [
            { label: "Ranked Battles", href: "/docs/cobbleranked/features/ranked-battles/" },
            { label: "Casual Battles", href: "/docs/cobbleranked/features/casual-battles/" },
            { label: "Battle Formats", href: "/docs/cobbleranked/features/battle-formats/" },
            { label: "ELO System", href: "/docs/cobbleranked/features/elo-system/" },
            { label: "Seasons", href: "/docs/cobbleranked/features/seasons/" },
            { label: "Leaderboards", href: "/docs/cobbleranked/features/leaderboards/" },
            { label: "Turn Timer", href: "/docs/cobbleranked/features/turn-timer/" },
            { label: "Battle Camera", href: "/docs/cobbleranked/features/battle-camera/" }
          ]
        },
        {
          label: "Configuration",
          items: [
            { label: "Main Config", href: "/docs/cobbleranked/configuration/config/" },
            { label: "Arenas", href: "/docs/cobbleranked/configuration/arenas/" },
            { label: "Blacklist", href: "/docs/cobbleranked/configuration/blacklist/" },
            { label: "Rewards", href: "/docs/cobbleranked/configuration/rewards/" },
            { label: "GUI", href: "/docs/cobbleranked/configuration/gui/" },
            { label: "Languages", href: "/docs/cobbleranked/configuration/languages/" }
          ]
        },
        {
          label: "Integration",
          items: [
            { label: "LuckPerms", href: "/docs/cobbleranked/integration/luckperms/" },
            { label: "Placeholders", href: "/docs/cobbleranked/integration/placeholders/" }
          ]
        },
        {
          label: "Advanced",
          items: [
            { label: "Database", href: "/docs/cobbleranked/advanced/database/" },
            { label: "Cross-Server", href: "/docs/cobbleranked/advanced/cross-server/" }
          ]
        },
        { label: "FAQ & Troubleshooting", href: "/docs/cobbleranked/support/faq/" }
      ]
    },
    {
      title: "GashiLibs",
      icon: "\u{1F4DA}",
      items: [
        { label: "Overview", href: "/docs/gashilibs/" }
      ]
    },
    {
      title: "MailLib",
      icon: "\u{1F4EC}",
      items: [
        { label: "Overview", href: "/docs/maillib/" }
      ]
    }
  ];
  function isActive(href) {
    return currentPath === href || currentPath === href.slice(0, -1);
  }
  function hasActiveChild(items) {
    return items.some((item) => {
      if (item.href && isActive(item.href)) return true;
      if (item.items) return hasActiveChild(item.items);
      return false;
    });
  }
  return renderTemplate(_a$2 || (_a$2 = __template$2(["", '<aside class="doc-sidebar" data-astro-cid-7zgr7jsp> <nav class="sidebar-nav" data-astro-cid-7zgr7jsp> ', ` </nav> <div class="sidebar-footer" data-astro-cid-7zgr7jsp> <a href="https://discord.gg/VVVvBTqqyP" target="_blank" class="sidebar-discord" data-astro-cid-7zgr7jsp> <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" data-astro-cid-7zgr7jsp> <path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0 12.64 12.64 0 0 0-.617-1.25.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.057 19.9 19.9 0 0 0 5.993 3.03.078.078 0 0 0 .084-.028 14.09 14.09 0 0 0 1.226-1.994.076.076 0 0 0-.041-.106 13.107 13.107 0 0 1-1.872-.892.077.077 0 0 1-.008-.128 10.2 10.2 0 0 0 .372-.292.074.074 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127 12.299 12.299 0 0 1-1.873.892.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028 19.839 19.839 0 0 0 6.002-3.03.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.03zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.956-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.955-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.946 2.418-2.157 2.418z" data-astro-cid-7zgr7jsp></path> </svg> <span data-astro-cid-7zgr7jsp>Get Support</span> </a> </div> </aside> <!-- Mobile sidebar toggle --> <button id="sidebarToggle" class="sidebar-toggle" aria-label="Toggle sidebar" data-astro-cid-7zgr7jsp> <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" data-astro-cid-7zgr7jsp> <line x1="3" y1="12" x2="21" y2="12" data-astro-cid-7zgr7jsp></line> <line x1="3" y1="6" x2="21" y2="6" data-astro-cid-7zgr7jsp></line> <line x1="3" y1="18" x2="21" y2="18" data-astro-cid-7zgr7jsp></line> </svg> </button> <div id="sidebarOverlay" class="sidebar-overlay" data-astro-cid-7zgr7jsp></div> <script>
	const toggle = document.getElementById('sidebarToggle');
	const sidebar = document.querySelector('.doc-sidebar');
	const overlay = document.getElementById('sidebarOverlay');

	toggle?.addEventListener('click', () => {
		sidebar?.classList.toggle('open');
		overlay?.classList.toggle('open');
	});

	overlay?.addEventListener('click', () => {
		sidebar?.classList.remove('open');
		overlay?.classList.remove('open');
	});
<\/script> `])), maybeRenderHead(), navigation.map((section, sectionIndex) => renderTemplate`<details class="nav-section"${addAttribute(hasActiveChild(section.items), "open")}${addAttribute(`--section-index: ${sectionIndex}`, "style")} data-astro-cid-7zgr7jsp> <summary class="section-title" data-astro-cid-7zgr7jsp> <span class="section-icon" data-astro-cid-7zgr7jsp>${section.icon}</span> <span class="section-name" data-astro-cid-7zgr7jsp>${section.title}</span> </summary> <ul class="nav-list" data-astro-cid-7zgr7jsp> ${section.items.map((item, itemIndex) => renderTemplate`<li${addAttribute(`--item-index: ${itemIndex}`, "style")} data-astro-cid-7zgr7jsp> ${item.items ? renderTemplate`<details${addAttribute(hasActiveChild(item.items), "open")} data-astro-cid-7zgr7jsp> <summary class="nav-group-title" data-astro-cid-7zgr7jsp>${item.label}</summary> <ul class="nav-sublist" data-astro-cid-7zgr7jsp> ${item.items.map((subItem, subIndex) => renderTemplate`<li${addAttribute(`--sub-index: ${subIndex}`, "style")} data-astro-cid-7zgr7jsp> <a${addAttribute(subItem.href, "href")}${addAttribute(["nav-link", { active: isActive(subItem.href) }], "class:list")} data-astro-cid-7zgr7jsp> <span class="link-text" data-astro-cid-7zgr7jsp>${subItem.label}</span> </a> </li>`)} </ul> </details>` : renderTemplate`<a${addAttribute(item.href, "href")}${addAttribute(["nav-link", "top-level", { active: isActive(item.href) }], "class:list")} data-astro-cid-7zgr7jsp> <span class="link-text" data-astro-cid-7zgr7jsp>${item.label}</span> </a>`} </li>`)} </ul> </details>`));
}, "C:/MinecraftModDev/projects_gashistudios/[GashiStudios]CobbleRanked_Reloaded/docs-site/src/components/DocSidebar.astro", void 0);

var __freeze$1 = Object.freeze;
var __defProp$1 = Object.defineProperty;
var __template$1 = (cooked, raw) => __freeze$1(__defProp$1(cooked, "raw", { value: __freeze$1(cooked.slice()) }));
var _a$1;
const $$Astro$2 = createAstro("https://gashistudios.site");
const $$TableOfContents = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$2, $$props, $$slots);
  Astro2.self = $$TableOfContents;
  const { headings } = Astro2.props;
  const tocHeadings = headings.filter((h) => h.depth >= 2 && h.depth <= 3);
  return renderTemplate(_a$1 || (_a$1 = __template$1(["", "<script>\n	// Highlight active TOC item based on scroll position\n	const tocLinks = document.querySelectorAll('.toc-link');\n	const headings = Array.from(tocLinks).map(link => {\n		const href = link.getAttribute('href');\n		if (!href || !href.startsWith('#')) return null;\n		const id = href.slice(1);\n		// Use getElementById to handle IDs that start with numbers\n		return document.getElementById(id);\n	}).filter(Boolean);\n\n	function updateActiveLink() {\n		const scrollPos = window.scrollY + 100;\n\n		let activeIndex = 0;\n		headings.forEach((heading, index) => {\n			if (heading.offsetTop <= scrollPos) {\n				activeIndex = index;\n			}\n		});\n\n		tocLinks.forEach((link, index) => {\n			link.classList.toggle('active', index === activeIndex);\n		});\n	}\n\n	window.addEventListener('scroll', updateActiveLink);\n	updateActiveLink();\n<\/script>"])), tocHeadings.length > 0 && renderTemplate`${maybeRenderHead()}<nav class="toc" data-astro-cid-xvrfupwn><h4 class="toc-title" data-astro-cid-xvrfupwn>On This Page</h4><ul class="toc-list" data-astro-cid-xvrfupwn>${tocHeadings.map((heading) => renderTemplate`<li${addAttribute([`toc-item`, `depth-${heading.depth}`], "class:list")} data-astro-cid-xvrfupwn><a${addAttribute(`#${heading.slug}`, "href")} class="toc-link" data-astro-cid-xvrfupwn>${heading.text}</a></li>`)}</ul></nav>`);
}, "C:/MinecraftModDev/projects_gashistudios/[GashiStudios]CobbleRanked_Reloaded/docs-site/src/components/TableOfContents.astro", void 0);

var __freeze = Object.freeze;
var __defProp = Object.defineProperty;
var __template = (cooked, raw) => __freeze(__defProp(cooked, "raw", { value: __freeze(raw || cooked.slice()) }));
var _a;
const $$Astro$1 = createAstro("https://gashistudios.site");
const $$DocLayout = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$1, $$props, $$slots);
  Astro2.self = $$DocLayout;
  const { title, description, headings = [], ogImage } = Astro2.props;
  const siteUrl = "https://gashistudios.site";
  const pageUrl = new URL(Astro2.url.pathname, siteUrl).href;
  const ogParams = new URLSearchParams({
    title,
    subtitle: description || "Documentation"
  });
  const dynamicOgImage = `${siteUrl}/api/og.png?${ogParams.toString()}`;
  const finalOgImage = ogImage ? `${siteUrl}${ogImage}` : dynamicOgImage;
  return renderTemplate(_a || (_a = __template(['<html lang="ja"> <head><meta charset="UTF-8"><meta name="viewport" content="width=device-width, initial-scale=1.0"><link rel="icon" type="image/png" href="/gashistudios.png"><meta name="description"', "><title>", ' - GashiStudios</title><!-- Open Graph / Discord Embed --><meta property="og:type" content="website"><meta property="og:url"', '><meta property="og:title"', '><meta property="og:description"', '><meta property="og:image"', '><meta property="og:site_name" content="GashiStudios"><!-- Twitter Card --><meta name="twitter:card" content="summary_large_image"><meta name="twitter:title"', '><meta name="twitter:description"', '><meta name="twitter:image"', '><!-- Theme Color (Discord embed sidebar) --><meta name="theme-color" content="#7c3aed"><link rel="preconnect" href="https://fonts.googleapis.com"><link rel="preconnect" href="https://fonts.gstatic.com" crossorigin><link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=JetBrains+Mono:wght@400;500&display=swap" rel="stylesheet">', "", "</head> <body> ", " ", ' <div class="doc-wrapper"> <main class="doc-main"> <article class="doc-content"', '> <header class="doc-header"> <h1 class="animated-doc-title" id="doc-title"', ">", "</h1> ", ' </header> <div class="prose"> ', " </div> </article> ", ` </main> <footer class="doc-footer"> <div class="footer-container"> <div class="footer-links"> <div class="footer-column"> <h4>Products</h4> <a href="/docs/cobbleranked/">CobbleRanked</a> <a href="/docs/gashilibs/">GashiLibs</a> <a href="/docs/maillib/">MailLib</a> </div> <div class="footer-column"> <h4>Legal</h4> <a href="/terms">Terms & Conditions</a> </div> <div class="footer-column"> <h4>Community</h4> <a href="https://discord.gg/VVVvBTqqyP" target="_blank">Discord</a> <a href="https://github.com/gqrshy" target="_blank">GitHub</a> </div> </div> </div> <div class="footer-bottom"> <p>&copy; 2026 GashiStudios. All rights reserved.</p> <p class="footer-disclaimer">Not affiliated with Microsoft, Mojang AB, or Minecraft.</p> </div> </footer> </div> <script>
		// Animated title - split into characters (runs on every page load including View Transitions)
		(function initDocPage() {
			function animateTitle() {
				const titleEl = document.getElementById('doc-title');
				if (!titleEl || titleEl.dataset.animated === 'true') return;

				const text = titleEl.textContent || '';
				titleEl.innerHTML = '';
				titleEl.dataset.animated = 'true';

				// Create character spans
				[...text].forEach((char, i) => {
					const span = document.createElement('span');
					span.className = char === ' ' ? 'title-char space' : 'title-char';
					span.textContent = char === ' ' ? '\\u00A0' : char;
					span.style.setProperty('--char-index', i);
					titleEl.appendChild(span);
				});

				// Trigger animation after a brief delay
				setTimeout(() => {
					const chars = titleEl.querySelectorAll('.title-char');
					chars.forEach((char, i) => {
						setTimeout(() => {
							char.classList.add('visible');
						}, i * 40);
					});
				}, 150);
			}

			// Run now
			animateTitle();

			// Also run after View Transitions (only register once)
			if (!window._docTitleAnimRegistered) {
				window._docTitleAnimRegistered = true;
				document.addEventListener('astro:page-load', animateTitle);
			}
		})();

		// Copy code button functionality
		document.querySelectorAll('pre').forEach(pre => {
			const button = document.createElement('button');
			button.className = 'copy-btn';
			button.innerHTML = '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="9" y="9" width="13" height="13" rx="2" ry="2"/><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"/></svg>';
			button.addEventListener('click', async () => {
				const code = pre.querySelector('code')?.textContent || '';
				await navigator.clipboard.writeText(code);
				button.innerHTML = '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="20 6 9 17 4 12"/></svg>';
				button.classList.add('copied');
				setTimeout(() => {
					button.innerHTML = '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="9" y="9" width="13" height="13" rx="2" ry="2"/><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"/></svg>';
					button.classList.remove('copied');
				}, 2000);
			});
			pre.style.position = 'relative';
			pre.appendChild(button);
		});

		// Intersection Observer for scroll animations
		const observerOptions = {
			threshold: 0.1,
			rootMargin: '0px 0px -50px 0px'
		};

		const observer = new IntersectionObserver((entries) => {
			entries.forEach(entry => {
				if (entry.isIntersecting) {
					entry.target.classList.add('animate-in');
				}
			});
		}, observerOptions);

		// Observe elements for scroll animations
		document.querySelectorAll('.prose h2, .prose h3, .prose details, .prose pre, .prose table, .prose blockquote').forEach(el => {
			el.classList.add('scroll-animate');
			observer.observe(el);
		});
	<\/script>  </body> </html>`], ['<html lang="ja"> <head><meta charset="UTF-8"><meta name="viewport" content="width=device-width, initial-scale=1.0"><link rel="icon" type="image/png" href="/gashistudios.png"><meta name="description"', "><title>", ' - GashiStudios</title><!-- Open Graph / Discord Embed --><meta property="og:type" content="website"><meta property="og:url"', '><meta property="og:title"', '><meta property="og:description"', '><meta property="og:image"', '><meta property="og:site_name" content="GashiStudios"><!-- Twitter Card --><meta name="twitter:card" content="summary_large_image"><meta name="twitter:title"', '><meta name="twitter:description"', '><meta name="twitter:image"', '><!-- Theme Color (Discord embed sidebar) --><meta name="theme-color" content="#7c3aed"><link rel="preconnect" href="https://fonts.googleapis.com"><link rel="preconnect" href="https://fonts.gstatic.com" crossorigin><link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=JetBrains+Mono:wght@400;500&display=swap" rel="stylesheet">', "", "</head> <body> ", " ", ' <div class="doc-wrapper"> <main class="doc-main"> <article class="doc-content"', '> <header class="doc-header"> <h1 class="animated-doc-title" id="doc-title"', ">", "</h1> ", ' </header> <div class="prose"> ', " </div> </article> ", ` </main> <footer class="doc-footer"> <div class="footer-container"> <div class="footer-links"> <div class="footer-column"> <h4>Products</h4> <a href="/docs/cobbleranked/">CobbleRanked</a> <a href="/docs/gashilibs/">GashiLibs</a> <a href="/docs/maillib/">MailLib</a> </div> <div class="footer-column"> <h4>Legal</h4> <a href="/terms">Terms & Conditions</a> </div> <div class="footer-column"> <h4>Community</h4> <a href="https://discord.gg/VVVvBTqqyP" target="_blank">Discord</a> <a href="https://github.com/gqrshy" target="_blank">GitHub</a> </div> </div> </div> <div class="footer-bottom"> <p>&copy; 2026 GashiStudios. All rights reserved.</p> <p class="footer-disclaimer">Not affiliated with Microsoft, Mojang AB, or Minecraft.</p> </div> </footer> </div> <script>
		// Animated title - split into characters (runs on every page load including View Transitions)
		(function initDocPage() {
			function animateTitle() {
				const titleEl = document.getElementById('doc-title');
				if (!titleEl || titleEl.dataset.animated === 'true') return;

				const text = titleEl.textContent || '';
				titleEl.innerHTML = '';
				titleEl.dataset.animated = 'true';

				// Create character spans
				[...text].forEach((char, i) => {
					const span = document.createElement('span');
					span.className = char === ' ' ? 'title-char space' : 'title-char';
					span.textContent = char === ' ' ? '\\\\u00A0' : char;
					span.style.setProperty('--char-index', i);
					titleEl.appendChild(span);
				});

				// Trigger animation after a brief delay
				setTimeout(() => {
					const chars = titleEl.querySelectorAll('.title-char');
					chars.forEach((char, i) => {
						setTimeout(() => {
							char.classList.add('visible');
						}, i * 40);
					});
				}, 150);
			}

			// Run now
			animateTitle();

			// Also run after View Transitions (only register once)
			if (!window._docTitleAnimRegistered) {
				window._docTitleAnimRegistered = true;
				document.addEventListener('astro:page-load', animateTitle);
			}
		})();

		// Copy code button functionality
		document.querySelectorAll('pre').forEach(pre => {
			const button = document.createElement('button');
			button.className = 'copy-btn';
			button.innerHTML = '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="9" y="9" width="13" height="13" rx="2" ry="2"/><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"/></svg>';
			button.addEventListener('click', async () => {
				const code = pre.querySelector('code')?.textContent || '';
				await navigator.clipboard.writeText(code);
				button.innerHTML = '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="20 6 9 17 4 12"/></svg>';
				button.classList.add('copied');
				setTimeout(() => {
					button.innerHTML = '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="9" y="9" width="13" height="13" rx="2" ry="2"/><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"/></svg>';
					button.classList.remove('copied');
				}, 2000);
			});
			pre.style.position = 'relative';
			pre.appendChild(button);
		});

		// Intersection Observer for scroll animations
		const observerOptions = {
			threshold: 0.1,
			rootMargin: '0px 0px -50px 0px'
		};

		const observer = new IntersectionObserver((entries) => {
			entries.forEach(entry => {
				if (entry.isIntersecting) {
					entry.target.classList.add('animate-in');
				}
			});
		}, observerOptions);

		// Observe elements for scroll animations
		document.querySelectorAll('.prose h2, .prose h3, .prose details, .prose pre, .prose table, .prose blockquote').forEach(el => {
			el.classList.add('scroll-animate');
			observer.observe(el);
		});
	<\/script>  </body> </html>`])), addAttribute(description || `${title} - GashiStudios Documentation`, "content"), title, addAttribute(pageUrl, "content"), addAttribute(`${title} - GashiStudios`, "content"), addAttribute(description || `${title} - GashiStudios Documentation`, "content"), addAttribute(finalOgImage, "content"), addAttribute(`${title} - GashiStudios`, "content"), addAttribute(description || `${title} - GashiStudios Documentation`, "content"), addAttribute(finalOgImage, "content"), renderComponent($$result, "ViewTransitions", $$ClientRouter, {}), renderHead(), renderComponent($$result, "CustomNav", $$CustomNav, {}), renderComponent($$result, "DocSidebar", $$DocSidebar, {}), addAttribute(renderTransition($$result, "bgzqfowj", "fade", ""), "data-astro-transition-scope"), addAttribute(renderTransition($$result, "gywfo64p", "", "page-title"), "data-astro-transition-scope"), title, description && renderTemplate`<p class="doc-description">${description}</p>`, renderSlot($$result, $$slots["default"]), headings.length > 0 && renderTemplate`<aside class="doc-toc"> ${renderComponent($$result, "TableOfContents", $$TableOfContents, { "headings": headings })} </aside>`);
}, "C:/MinecraftModDev/projects_gashistudios/[GashiStudios]CobbleRanked_Reloaded/docs-site/src/layouts/DocLayout.astro", "self");

const $$Astro = createAstro("https://gashistudios.site");
async function getStaticPaths() {
  const docs = await getCollection("docs");
  return docs.map((entry) => ({
    params: { slug: entry.id.replace(/\.md$/, "").replace(/\/index$/, "") },
    props: { entry }
  }));
}
const $$ = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$;
  const { entry } = Astro2.props;
  const { Content, headings } = await renderEntry(entry);
  return renderTemplate`${renderComponent($$result, "DocLayout", $$DocLayout, { "title": entry.data.title, "description": entry.data.description, "headings": headings }, { "default": async ($$result2) => renderTemplate` ${renderComponent($$result2, "Content", Content, {})} ` })}`;
}, "C:/MinecraftModDev/projects_gashistudios/[GashiStudios]CobbleRanked_Reloaded/docs-site/src/pages/docs/[...slug].astro", void 0);

const $$file = "C:/MinecraftModDev/projects_gashistudios/[GashiStudios]CobbleRanked_Reloaded/docs-site/src/pages/docs/[...slug].astro";
const $$url = "/docs/[...slug]";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$,
  file: $$file,
  getStaticPaths,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };

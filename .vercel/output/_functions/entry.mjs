import { renderers } from './renderers.mjs';
import { c as createExports, s as serverEntrypointModule } from './chunks/_@astrojs-ssr-adapter_DQngFRpK.mjs';
import { manifest } from './manifest_DSxqC055.mjs';

const serverIslandMap = new Map();;

const _page0 = () => import('./pages/_image.astro.mjs');
const _page1 = () => import('./pages/api/cobbleranked/leaderboard.astro.mjs');
const _page2 = () => import('./pages/api/cobbleranked/usage-stats.astro.mjs');
const _page3 = () => import('./pages/demo/leaderboard.astro.mjs');
const _page4 = () => import('./pages/demo/ranked-stats.astro.mjs');
const _page5 = () => import('./pages/docs/_---slug_.astro.mjs');
const _page6 = () => import('./pages/servers.astro.mjs');
const _page7 = () => import('./pages/terms.astro.mjs');
const _page8 = () => import('./pages/index.astro.mjs');
const pageMap = new Map([
    ["node_modules/astro/dist/assets/endpoint/generic.js", _page0],
    ["src/pages/api/cobbleranked/leaderboard.ts", _page1],
    ["src/pages/api/cobbleranked/usage-stats.ts", _page2],
    ["src/pages/demo/leaderboard.astro", _page3],
    ["src/pages/demo/ranked-stats.astro", _page4],
    ["src/pages/docs/[...slug].astro", _page5],
    ["src/pages/servers.astro", _page6],
    ["src/pages/terms.astro", _page7],
    ["src/pages/index.astro", _page8]
]);

const _manifest = Object.assign(manifest, {
    pageMap,
    serverIslandMap,
    renderers,
    actions: () => import('./noop-entrypoint.mjs'),
    middleware: () => import('./_noop-middleware.mjs')
});
const _args = {
    "middlewareSecret": "32abe91b-0049-42b1-994a-792e0f9fa9f4",
    "skewProtection": false
};
const _exports = createExports(_manifest, _args);
const __astrojsSsrVirtualEntry = _exports.default;
const _start = 'start';
if (Object.prototype.hasOwnProperty.call(serverEntrypointModule, _start)) ;

export { __astrojsSsrVirtualEntry as default, pageMap };

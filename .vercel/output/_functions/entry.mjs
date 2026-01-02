import { renderers } from './renderers.mjs';
import { c as createExports, s as serverEntrypointModule } from './chunks/_@astrojs-ssr-adapter_Cgp4L0-T.mjs';
import { manifest } from './manifest_vDD4DB4J.mjs';

const serverIslandMap = new Map();;

const _page0 = () => import('./pages/_image.astro.mjs');
const _page1 = () => import('./pages/api/og.png.astro.mjs');
const _page2 = () => import('./pages/docs/_---slug_.astro.mjs');
const _page3 = () => import('./pages/servers.astro.mjs');
const _page4 = () => import('./pages/terms.astro.mjs');
const _page5 = () => import('./pages/index.astro.mjs');
const pageMap = new Map([
    ["node_modules/astro/dist/assets/endpoint/generic.js", _page0],
    ["src/pages/api/og.png.ts", _page1],
    ["src/pages/docs/[...slug].astro", _page2],
    ["src/pages/servers.astro", _page3],
    ["src/pages/terms.astro", _page4],
    ["src/pages/index.astro", _page5]
]);

const _manifest = Object.assign(manifest, {
    pageMap,
    serverIslandMap,
    renderers,
    actions: () => import('./noop-entrypoint.mjs'),
    middleware: () => import('./_noop-middleware.mjs')
});
const _args = {
    "middlewareSecret": "25482241-eba6-4dfe-a474-a912bd540243",
    "skewProtection": false
};
const _exports = createExports(_manifest, _args);
const __astrojsSsrVirtualEntry = _exports.default;
const _start = 'start';
if (Object.prototype.hasOwnProperty.call(serverEntrypointModule, _start)) ;

export { __astrojsSsrVirtualEntry as default, pageMap };

export const manifest = (() => {
function __memo(fn) {
	let value;
	return () => value ??= (value = fn());
}

return {
	appDir: "_app",
	appPath: "_app",
	assets: new Set(["DSC00977.jpg","DSC00981.jpg","bmw-logo.jpg","eurotech-logo-white.png","eurotech-logo.png","eurotech-main-logo.png","favicon.svg","icons/facebook.svg","icons/google.svg","icons/instagram.svg","icons/linkedin.svg","icons/twitter.svg","images/placeholder.svg","jaguar-logo-lg.jpg","mini-logo-lg.jpg","mta-logo.png","og-image-generator.svg"]),
	mimeTypes: {".jpg":"image/jpeg",".png":"image/png",".svg":"image/svg+xml"},
	_: {
		client: {start:"_app/immutable/entry/start.BdMQzBpe.js",app:"_app/immutable/entry/app.Dbn8tKUl.js",imports:["_app/immutable/entry/start.BdMQzBpe.js","_app/immutable/chunks/DZO7Fpvg.js","_app/immutable/chunks/CZeBOXM3.js","_app/immutable/chunks/CBi7E2Tb.js","_app/immutable/entry/app.Dbn8tKUl.js","_app/immutable/chunks/CZeBOXM3.js","_app/immutable/chunks/CaTuT9WQ.js","_app/immutable/chunks/By7y3pNT.js","_app/immutable/chunks/V1TAOuGS.js"],stylesheets:[],fonts:[],uses_env_dynamic_public:false},
		nodes: [
			__memo(() => import('./nodes/0.js')),
			__memo(() => import('./nodes/1.js')),
			__memo(() => import('./nodes/2.js')),
			__memo(() => import('./nodes/3.js'))
		],
		remotes: {
			
		},
		routes: [
			{
				id: "/",
				pattern: /^\/$/,
				params: [],
				page: { layouts: [0,], errors: [1,], leaf: 2 },
				endpoint: null
			},
			{
				id: "/robots.txt",
				pattern: /^\/robots\.txt\/?$/,
				params: [],
				page: null,
				endpoint: __memo(() => import('./entries/endpoints/robots.txt/_server.ts.js'))
			},
			{
				id: "/sitemap.xml",
				pattern: /^\/sitemap\.xml\/?$/,
				params: [],
				page: null,
				endpoint: __memo(() => import('./entries/endpoints/sitemap.xml/_server.ts.js'))
			},
			{
				id: "/theme",
				pattern: /^\/theme\/?$/,
				params: [],
				page: { layouts: [0,], errors: [1,], leaf: 3 },
				endpoint: null
			}
		],
		prerendered_routes: new Set([]),
		matchers: async () => {
			
			return {  };
		},
		server_assets: {}
	}
}
})();

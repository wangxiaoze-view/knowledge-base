import { defineConfig } from "vitepress";
import nav from "./nav/nav.mts";
import sidebar from "./nav/sidebar.mts";
import timeline from "vitepress-markdown-timeline";
import { exit } from "process";

import {
	containerPreview,
	componentPreview,
} from "@vitepress-demo-preview/plugin";
// https://vitepress.dev/reference/site-config
export default defineConfig({
	title: "知识库",
	description: "知识库",
	ignoreDeadLinks: true,
	head: [
		[
			"link",
			{
				rel: "icon",
				href: "/logo.png",
			},
		],
		[
			"link",
			{
				rel: "stylesheet",
				href: "https://cdn.jsdelivr.net/npm/remixicon@4.2.0/fonts/remixicon.css",
			},
		],

		// google代码分析
		[
			"script",
			{},
			`
			(function (w, d, s, l, i) {
				w[l] = w[l] || [];
				w[l].push({ "gtm.start": new Date().getTime(), event: "gtm.js" });
				var f = d.getElementsByTagName(s)[0],
					j = d.createElement(s),
					dl = l != "dataLayer" ? "&l=" + l : "";
				j.async = true;
				j.src = "https://www.googletagmanager.com/gtm.js?id=" + i + dl;
				f.parentNode.insertBefore(j, f);
			})(window, document, "script", "dataLayer", "GTM-KJ452JQX");
			`,
		],
		[
			"script",
			{},
			`
				(function () {
				var hm = document.createElement("noscript");
				var iframe = document.createElement("iframe");
				iframe.src = "https://www.googletagmanager.com/ns.html?id=GTM-KJ452JQX";
				iframe.height = 0;
				iframe.width = 0;
				iframe.style.display = "none";
				iframe.style.visibility = "hidden";
				hm.appendChild(iframe)
				var s = document.querySelector("#app");
				s.parentNode.insertBefore(hm, s);
			})();
				`,
		],
		// 百度统计
		[
			"script",
			{},
			`
				var _hmt = _hmt || [];
				(function() {
					var hm = document.createElement("script");
					hm.src = "https://hm.baidu.com/hm.js?da07a284a6d9edb2782b563c4763bd82";
					var s = document.getElementsByTagName("script")[0]; 
					s.parentNode.insertBefore(hm, s);
				})();
			`,
		],
		// 统计
		[
			"script",
			{},
			`
				(function() {
					let hm = document.createElement("script");
					hm.src = "https://cloud.umami.is/script.js";
					hm.setAttribute("data-website-id", "63e283e0-9946-4f12-a732-c0e74a121289");
					var s = document.getElementsByTagName("script")[0];
					s.parentNode.insertBefore(hm, s);
				})();
			`,
		],
	],
	themeConfig: {
		// https://vitepress.dev/reference/default-theme-config
		nav,

		// @ts-ignore
		sidebar,

		socialLinks: [
			{ icon: "github", link: "https://github.com/wangxiaoze-view" },
		],
		footer: {
			message: "wangxiaoze | MIT License.",
			copyright: `@copyright 2023-now wangxiaoze`,
		},
		docFooter: {
			prev: "上一页",
			next: "下一页",
		},
		search: {
			provider: "algolia",
			options: {
				appId: "39L9KD4UX8",
				apiKey: "55d3697b2488fea5658b31a7ba6c7f12",
				indexName: "wangzevw",
			},
		},
	},
	markdown: {
		config(md) {
			md.use(timeline);
			md.use(containerPreview);
			md.use(componentPreview);
		},
	},
	buildEnd() {
		exit();
	},
});

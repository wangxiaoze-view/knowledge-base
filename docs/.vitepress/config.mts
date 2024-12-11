import { defineConfig } from "vitepress";
import { resolve } from "node:path";
import { exit } from "node:process";
import timeline from "vitepress-markdown-timeline";
import { vitepressDemoPlugin } from "vitepress-demo-plugin";

import { head } from "./config/head.mts";
import { buildSidebar, generatePath } from "./theme/utils/generate-path";

export default defineConfig({
	title: "知识库",
	description: "知识库",
	ignoreDeadLinks: true,
	head,
	// vite: {
	// 	plugins: [...AutoSidebar],
	// },
	base: process.env.CLIENT_PLATFORM === "vercel" ? "/" : "/knowledge-base/",
	themeConfig: {
		nav: [
			{ text: "首页", link: "/" },
			{ text: "指南", link: "/guide/01_阅读指南/01_初衷" },
			{ text: "前端小册", link: "/brochure/01_介绍" },
			{ text: "我的项目", link: "/project/01_介绍" },
			{ text: "生活趣记", link: "/life/01_介绍" },
		],
		sidebar: {
			"/guide/": buildSidebar(generatePath("docs/guide")),
			"/brochure/": buildSidebar(generatePath("docs/brochure")),
			"/project/": buildSidebar(generatePath("docs/project")),
			"/life/": buildSidebar(generatePath("docs/life")),
		},

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
			md.use(vitepressDemoPlugin, {
				//@ts-ignore
				demoDir: resolve(__dirname, "../demos"),
				// stackblitz: {
				// 	show: true,
				// },
				codesandbox: {
					show: true,
				},
			});
		},
	},
	buildEnd() {
		// fix: 修复避免在vercel中打包一直计算时间
		exit();
	},
});

import { defineConfig } from "vitepress";

// https://vitepress.dev/reference/site-config
export default defineConfig({
	title: "知识库",
	description: "知识库",
	head: [
		[
			"link",
			{
				rel: "icon",
				href: "/logo.png",
			},
		],

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
	],
	themeConfig: {
		// https://vitepress.dev/reference/default-theme-config
		nav: [
			{ text: "首页", link: "/" },
			{ text: "指南", link: "/guide/start-guide" },
			{
				text: "专题",
				items: [
					{ text: "设计模式", link: "/featured/design/subscribe" },
					{ text: "Vue", link: "/featured/vue/1" },
					{ text: "工程化", link: "/featured/project/1" },
					{ text: "Git", link: "/featured/git/1" },
				],
			},
			{
				text: "生活",
				items: [
					{ text: "日常", link: "/life/daily/1" },
					{ text: "小说", link: "/life/novel/1" },
				],
			},
			{
				text: "总结",
				items: [
					{ text: "项目总结", link: "/summary/project/1" },
					{ text: "技术调研", link: "/summary/dev/1" },
					{ text: "个人总结", link: "/summary/person/1" },
				],
			},
			{ text: "备忘录", link: "/remark/cmd" },
			{ text: "文档", link: "https://docs.wangzevw.com" },
		],

		sidebar: {
			"/guide/": [
				{
					text: "阅读指南",
					items: [
						{ text: "初衷", link: "/guide/start-guide" },
						{ text: "介绍", link: "/guide/info-guide" },
					],
				},
				{
					text: "公告",
					items: [
						{ text: "版本升级", link: "/guide/version-post" },
						{ text: "赞助", link: "/guide/sponsor-post" },
					],
				},
				{
					text: "工具",
					items: [
						{ text: "个人开发", link: "/guide/person-post" },
						{ text: "总结的工具", link: "/guide/utils-post" },
					],
				},
			],
			"/featured/design/": [
				{
					text: "设计模式",
					items: [
						{ text: "订阅发布模式", link: "/featured/design/subscribe" },
						{ text: "单例模式", link: "/featured/design/singleton" },
					],
				},
			],
			"/featured/vue/": [
				{
					text: "面试题",
					items: [
						{ text: "渐进式框架的理解", link: "/featured/vue/1" },
						{ text: "created和mounted的区别", link: "/featured/vue/2" },
						{
							text: "watch,watcheffect和computed的区别",
							link: "/featured/vue/3",
						},
						{ text: "if和show的区别", link: "/featured/vue/4" },
						{ text: "v-for和v-if为什么不能同时使用", link: "/featured/vue/5" },
					],
				},
			],
			"/featured/project/": [
				{
					text: "工程化",
					items: [
						{ text: "Vue项目搭建", link: "/featured/project/1" },
						{ text: "webpack与vite的区别", link: "/featured/project/2" },
						{ text: "从哪些方面进行性能优化", link: "/featured/project/3" },
						{ text: "webpack项目优化", link: "/featured/project/4" },
					],
				},
			],

			"/featured/git/": [
				{
					text: "Git",
					items: [{ text: "基础", link: "/featured/git/1" }],
				},
			],

			"/life/daily/": [
				{
					text: "日常",
					items: [
						{ text: `“舍，得，放” 下之 “放”`, link: "/life/daily/1" },
						{ text: `“舍，得，放” 下之 “舍，得”`, link: "/life/daily/2" },
						{ text: `五年时间的蜕变, 他回来了!`, link: "/life/daily/3" },
						{ text: `沉浸之后的总结（一）`, link: "/life/daily/4" },
						{ text: `沉浸之后的总结（二）`, link: "/life/daily/5" },
						{ text: `我的拿手好菜-红烧牛肉面`, link: "/life/daily/6" },
						{ text: `拍摄三要素`, link: "/life/daily/7" },
					],
				},
			],

			"/life/novel/": [
				{
					text: "临终前的回溯",
					items: [
						{ text: `序章：生命之烛摇曳`, link: "/life/novel/1" },
						{ text: `童年时光`, link: "/life/novel/2" },
						{ text: `与她初识`, link: "/life/novel/3" },
						{ text: `相离`, link: "/life/novel/4" },
						{ text: `现实的鞭打`, link: "/life/novel/5" },
						{ text: `我的蜕变`, link: "/life/novel/6" },
					],
				},
			],
			"/summary/project/": [
				{
					text: "项目总结",
					items: [
						{ text: `老系统升级问题总结`, link: "/summary/project/1" },
						{
							text: `系统下单(重复单提示框)的异常`,
							link: "/summary/project/2",
						},
						{ text: `图片上传之前的自定义水印`, link: "/summary/project/3" },
						{ text: `中英文搜索按键回车事件冲突`, link: "/summary/project/4" },
						{ text: `GridView宫格加载渲染优化`, link: "/summary/project/5" },
						{ text: `支付中转页面`, link: "/summary/project/6" },
						{ text: `移动端返回触发俩次`, link: "/summary/project/7" },
						{ text: `键盘弹起底部被顶起问题`, link: "/summary/project/8" },
						{ text: `防篡改水印`, link: "/summary/project/9" },
						{ text: `选项卡loading`, link: "/summary/project/10" },
					],
				},
			],

			"/summary/dev/": [
				{
					text: "技术调研",
					items: [
						{ text: `跨端之多端系统`, link: "/summary/dev/1" },
						{ text: `浅谈跨端技术的局限性`, link: "/summary/dev/2" },
						{ text: `网站更新一`, link: "/summary/dev/3" },
						{ text: `网站更新二`, link: "/summary/dev/3-1" },
						{ text: `发现nvm1.1.12版本的一个问题`, link: "/summary/dev/4" },
						{ text: `记录使用1Panel遇到的问题`, link: "/summary/dev/5" },
						{ text: `nvm替换为fnm`, link: "/summary/dev/6" },
						{ text: `rust-env没有继承问题`, link: "/summary/dev/7" },
					],
				},
			],

			"/summary/person/": [
				{
					text: "个人总结",
					items: [
						{ text: "2019.06 - 2022-07", link: "/summary/person/1" },
						{ text: "2022-08 - 2024-07", link: "/summary/person/2" },
					],
				},
			],

			"/remark": [
				{
					text: "备忘录",
					items: [
						{ text: "命令代码", link: "/remark/cmd" },
						{ text: "docker命令", link: "/remark/docker" },
					],
				},
			],
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
});

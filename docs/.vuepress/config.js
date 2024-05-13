const baiduCode = require("./config/baiduCode.js"); // 百度统计hm码
const htmlModules = require("./config/htmlModules.js");

module.exports = {
	theme: "vdoing", // 使用依赖包主题
	// theme: require.resolve('../../vdoing'), // 使用本地主题 (先将vdoing主题文件下载到本地：https://github.com/wangxiaoze-view/vuepress-theme-vdoing)

	title: "knowledge base",
	description: "整理个人工作生活的知识",

	// base: '/', // 默认'/'。如果你想将你的网站部署到如 https://foo.github.io/bar/，那么 base 应该被设置成 "/bar/",（否则页面将失去样式等文件）
	head: [
		// 注入到页面<head> 中的标签，格式[tagName, { attrName: attrValue }, innerHTML?]
		[
			"link",
			{
				rel: "icon",
				href: "https://qiniu.wangxiaoze.wang/hexo-blog/wb_logo_m_d.png",
			},
		], //favicons，资源放在public文件夹
		["meta", { name: "keywords", content: "vuepress,theme,blog" }],
		["meta", { name: "theme-color", content: "#11a8cd" }], // 移动浏览器主题颜色

		// 百度联盟
		[
			"meta",
			{
				name: "baidu_union_verify",
				content: "cb3bdee510c2883df3872a41a8092e2c",
			},
		],
		// 谷歌广告
		[
			"meta",
			{
				name: "google-adsense-account",
				content: "ca-pub-1298654158984505",
			},
		],
		[
			"script",
			{},
			`
			var _hmt = _hmt || [];
			(function () {
				var hm = document.createElement("script");
				hm.src = "https://hm.baidu.com/hm.js?7788821213245c8545569fd14a3fc292";
				var s = document.getElementsByTagName("script")[0];
				s.parentNode.insertBefore(hm, s);
			})();
		`,
		],
	],

	// 主题配置
	themeConfig: {
		nav: [
			{ text: "首页", link: "/" },
			{
				text: "指南",
				link: "/pages/f5ad97/",
				items: [
					{ text: "初衷", link: "/pages/f5ad97/" },
					{ text: "介绍", link: "/pages/fbd9a1/" },
				],
			},
			{
				text: "前端",
				link: "/pages/96c357/",
				items: [
					{
						text: "三件套",
						link: "/pages/96c357/",
					},
					{
						text: "Vue",
						link: "/pages/c51072/",
					},
					{
						text: "工程化",
						link: "/pages/3c293c/",
					},
					{
						text: "工具",
						link: "/pages/a20ce8/",
					},
					{
						text: "Git",
						link: "/pages/60296d/",
					},
				],
			},
			{
				text: "案例",
				link: "/pages/e3c66c/",
				items: [
					{
						text: "Html｜Css",
						link: "/pages/e3c66c/",
					},
					{
						text: "H5｜小程序",
						link: "/pages/2c714a/",
					},
					{
						text: "Vue",
						link: "/pages/ec65a8/",
					},
					{
						text: "技术调研",
						link: "/pages/de843f/",
					},
					{
						text: "Demos",
						link: "/pages/99ea2a/",
					},
				],
			},
			{
				text: "其他",
				link: "/pages/9cb243/",
				items: [
					{
						text: "Nest",
						link: "/pages/9cb243/",
					},
					{
						text: "移动端",
						link: "/pages/9039b2/",
					},
					{
						text: "桌面端",
						link: "/pages/0ea9d1/",
					},
					{
						text: "three",
						link: "/pages/647027/",
					},
				],
			},
			{
				text: "生活",
				link: "/pages/c81370/",
				items: [
					{
						text: "日常",
						link: "/pages/c81370/",
					},
					{
						text: "小说",
						link: "/pages/66f179/",
					},
					{
						text: "公告",
						link: "/pages/bf73f1/",
					},
				],
			},

			{ text: "赞助", link: "/pages/1a52d7/" },
		],
		sidebarDepth: 2, // 侧边栏显示深度，默认1，最大2（显示到h3标题）
		logo: "/img/logo.png", // 导航栏logo
		repo: "https://github.com/wangxiaoze-view/knowledge-base", // 导航栏右侧生成Github链接
		searchMaxSuggestions: 10, // 搜索结果显示最大数
		lastUpdated: "上次更新", // 更新的时间，及前缀文字   string | boolean (取值为git提交时间)

		// docsDir: 'docs', // 编辑的文件夹
		// editLinks: true, // 编辑链接
		// editLinkText: '编辑',

		// 以下配置是Vdoing主题改动的和新增的配置
		sidebar: { mode: "structuring", collapsable: false }, // 侧边栏  'structuring' | { mode: 'structuring', collapsable: Boolean} | 'auto' | 自定义    温馨提示：目录页数据依赖于结构化的侧边栏数据，如果你不设置为'structuring',将无法使用目录页

		// sidebarOpen: false, // 初始状态是否打开侧边栏，默认true
		updateBar: {
			// 最近更新栏
			showToArticle: false, // 显示到文章页底部，默认true
			// moreArticle: '/archives' // “更多文章”跳转的页面，默认'/archives'
		},
		// titleBadge: false, // 文章标题前的图标是否显示，默认true
		// titleBadgeIcons: [ // 文章标题前图标的地址，默认主题内置图标
		//   '图标地址1',
		//   '图标地址2'
		// ],

		pageStyle: "line", // 页面风格，可选值：'card'卡片 | 'line' 线（未设置bodyBgImg时才生效）， 默认'card'。 说明：card时背景显示灰色衬托出卡片样式，line时背景显示纯色，并且部分模块带线条边框

		// contentBgStyle: 1,

		category: false, // 是否打开分类功能，默认true。 如打开，会做的事情有：1. 自动生成的frontmatter包含分类字段 2.页面中显示与分类相关的信息和模块 3.自动生成分类页面（在@pages文件夹）。如关闭，则反之。
		tag: false, // 是否打开标签功能，默认true。 如打开，会做的事情有：1. 自动生成的frontmatter包含标签字段 2.页面中显示与标签相关的信息和模块 3.自动生成标签页面（在@pages文件夹）。如关闭，则反之。
		// archive: false, // 是否打开归档功能，默认true。 如打开，会做的事情有：1.自动生成归档页面（在@pages文件夹）。如关闭，则反之。

		author: {
			// 文章默认的作者信息，可在md文件中单独配置此信息 String | {name: String, href: String}
			name: "王小泽", // 必需
			href: "https://github.com/wangxiaoze-view", // 可选的
		},
		social: {
			// 社交图标，显示于博主信息栏和页脚栏
			// iconfontCssFile: '//at.alicdn.com/t/font_1678482_u4nrnp8xp6g.css', // 可选，阿里图标库在线css文件地址，对于主题没有的图标可自由添加
			icons: [
				{
					iconClass: "icon-youjian",
					title: "发邮件",
					link: "mailto:wangxiaoze@petalmail.com",
				},
				{
					iconClass: "icon-github",
					title: "GitHub",
					link: "https://github.com/wangxiaoze-view",
				},
				{
					iconClass: "icon-erji",
					title: "听音乐",
					link: "https://music.163.com/#/playlist?id=755597173",
				},
			],
		},
		footer: {
			// 页脚信息
			createYear: 2023, // 博客创建年份
			copyrightInfo: "wangxiaoze | MIT License", // 博客版权信息，支持a标签
		},
		htmlModules,

		// 搜索
		// algolia: {
		// 	apiKey: "ee6a8a765ccc0e90991ef28dca78a0d4",
		// 	indexName: "wangxiaoze",
		// 	// 如果 Algolia 没有为你提供 `appId` ，使用 `BH4D9OD16A` 或者移除该配置项
		// 	appId: "CBVXXU4KUE",
		// },
	},

	// 插件
	plugins: [
		[
			require("./plugins/love-me"),
			{
				// 鼠标点击爱心特效
				color: "#11a8cd", // 爱心颜色，默认随机色
				excludeClassName: "theme-vdoing-content", // 要排除元素的class, 默认空''
			},
		],

		// ["fulltext-search"], // 全文搜索

		[
			"vuepress-plugin-baidu-tongji", // 百度统计
			{
				hm: baiduCode,
			},
		],

		[
			"one-click-copy",
			{
				// 代码块复制按钮
				copySelector: [
					'div[class*="language-"] pre',
					'div[class*="aside-code"] aside',
				], // String or Array
				copyMessage: "复制成功", // default is 'Copy successfully and then paste it for use.'
				duration: 1000, // prompt message display time.
				showInMobile: false, // whether to display on the mobile side, default: false.
			},
		],

		["demo-container"],

		// [
		// 	"demo-block", // demo演示模块 https://github.com/xiguaxigua/vuepress-plugin-demo-block
		// 	{
		// 		settings: {
		// 			// jsLib: ['http://xxx'], // 在线示例(jsfiddle, codepen)中的js依赖
		// 			// cssLib: ['http://xxx'], // 在线示例中的css依赖
		// 			// vue: 'https://jsd.cdn.zzko.cn/npm/vue/dist/vue.min.js', // 在线示例中的vue依赖
		// 			jsfiddle: false, // 是否显示 jsfiddle 链接
		// 			codepen: true, // 是否显示 codepen 链接
		// 			horizontal: false, // 是否展示为横向样式
		// 		},
		// 	},
		// ],

		[
			"vuepress-plugin-zooming", // 放大图片
			{
				selector: ".theme-vdoing-content img:not(.no-zoom)",
				options: {
					bgColor: "rgba(0,0,0,0.6)",
				},
			},
		],
		[
			"@vuepress/last-updated", // "上次更新"时间格式
			{
				transformer: (timestamp, lang) => {
					const dayjs = require("dayjs"); // https://day.js.org/
					return dayjs(timestamp).format("YYYY/MM/DD, HH:mm:ss");
				},
			},
		],
	],

	markdown: {
		// lineNumbers: true,
		extractHeaders: ["h2", "h3", "h4", "h5", "h6"], // 提取标题到侧边栏的级别，默认['h2', 'h3']
	},

	// 监听文件变化并重新构建
	extraWatchFiles: [".vuepress/config.js", ".vuepress/config/htmlModules.js"],
};

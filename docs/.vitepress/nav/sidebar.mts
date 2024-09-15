export default {
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

	"/brochure": [
		{ text: "小册介绍", link: "/brochure/info" },
		{
			text: "Html",
			items: [
				{
					text: "元素",
					items: [{ text: "基础标签", link: "/brochure/html/ele/base_tag" }],
				},
			],
		},
		{
			text: "Javascript",
			items: [
				{
					text: "设计模式",
					items: [
						{
							text: "订阅发布模式",
							link: "/brochure/javascript/design/subscribe",
						},
						{ text: "单例模式", link: "/brochure/javascript/design/singleton" },
					],
				},
			],
		},
		{
			text: "Vue",
			items: [
				{
					text: "vue的初探",
					items: [
						{
							text: "渐进式框架的理解",
							link: "/brochure/vue/interview/progressive",
						},
						{
							text: "created 和 mounted的区别",
							link: "/brochure/vue/interview/create_mounted",
						},
						{
							text: "v-if 和 v-show的区别",
							link: "/brochure/vue/interview/if_show",
						},
						{
							text: "v-for 和 v-if不能同时使用",
							link: "/brochure/vue/interview/for_if",
						},
						{
							text: "watch, watchEffect 和 computed",
							link: "/brochure/vue/interview/watch_watchEffect_computed",
						},
					],
				},
			],
		},
		{
			text: "项目管理",
			items: [
				{
					text: "项目创建",
					items: [
						{
							text: "vue项目创建",
							link: "/brochure/project/product/init_vue",
						},
					],
				},
				{
					text: "工程化",
					items: [
						{
							text: "webpack与vite的区别",
							link: "/brochure/project/engineering/webpack_vite",
						},
					],
				},
				{
					text: "项目优化",
					items: [
						{
							text: "优化的方向",
							link: "/brochure/project/direction/direction",
						},
						{
							text: "webpack打包优化",
							link: "/brochure/project/direction/webpack_direction",
						},
						,
					],
				},
			],
		},
		{
			text: "Git版本控制",
			items: [
				{
					text: "备忘录",
					items: [{ text: "基础知识", link: "/brochure/git/base/base" }],
				},
			],
		},
		{
			text: "其它",
			items: [
				{
					text: "备忘录",
					items: [
						{ text: "brew命令", link: "/brochure/others/remark/brew" },
						{ text: "docker命令", link: "/brochure/others/remark/docker" },
					],
				},
			],
		},
	],

	"/life": [
		{ text: "介绍", link: "/life/info" },
		{
			text: "总结",
			items: [
				{
					text: "项目总结",
					items: [
						{ text: `老系统升级问题总结`, link: "/life/summary/project/1" },
						{
							text: `系统下单(重复单提示框)的异常`,
							link: "/life/summary/project/2",
						},
						{
							text: `图片上传之前的自定义水印`,
							link: "/life/summary/project/3",
						},
						{
							text: `中英文搜索按键回车事件冲突`,
							link: "/life/summary/project/4",
						},
						{
							text: `GridView宫格加载渲染优化`,
							link: "/life/summary/project/5",
						},
						{ text: `支付中转页面`, link: "/life/summary/project/6" },
						{ text: `移动端返回触发俩次`, link: "/life/summary/project/7" },
						{ text: `键盘弹起底部被顶起问题`, link: "/life/summary/project/8" },
						{ text: `防篡改水印`, link: "/life/summary/project/9" },
						{ text: `选项卡loading`, link: "/life/summary/project/10" },
					],
				},
				{
					text: "技术调研",
					items: [
						{ text: `跨端之多端系统`, link: "/life/summary/dev/1" },
						{ text: `浅谈跨端技术的局限性`, link: "/life/summary/dev/2" },
						{ text: `网站更新一`, link: "/life/summary/dev/3" },
						{ text: `网站更新二`, link: "/life/summary/dev/3-1" },
						{
							text: `发现nvm1.1.12版本的一个问题`,
							link: "/life/summary/dev/4",
						},
						{ text: `记录使用1Panel遇到的问题`, link: "/life/summary/dev/5" },
						{ text: `nvm替换为fnm`, link: "/life/summary/dev/6" },
						{ text: `rust-env没有继承问题`, link: "/life/summary/dev/7" },
						{ text: `开发远程组件的介绍`, link: "/life/summary/dev/8" },
					],
				},
				{
					text: "个人总结",
					items: [
						{ text: "2019.06 - 2022-07", link: "/life/summary/person/1" },
						{ text: "2022-08 - 2024-07", link: "/life/summary/person/2" },
					],
				},
			],
		},
		{
			text: "趣记",
			items: [
				{ text: "“舍，得，放” 下之 “放”", link: "/life/daily/1" },
				{ text: "“舍，得，放” 下之 “舍，得”", link: "/life/daily/2" },
				{ text: "五年时间的蜕变, 他回来了!", link: "/life/daily/3" },
				{ text: "沉浸之后的总结（一）", link: "/life/daily/4" },
				{ text: "沉浸之后的总结（二）", link: "/life/daily/5" },
				{ text: "我的拿手好菜-红烧牛肉面", link: "/life/daily/6" },
				{ text: "拍摄三要素", link: "/life/daily/7" },
			],
		},
		{
			text: "小说",
			items: [
				{
					text: "临终前的回溯",
					items: [
						{ text: "序章：生命之烛摇曳", link: "/life/novel/backtracking/1" },
						{ text: "童年时光", link: "/life/novel/backtracking/2" },
						{ text: "与她初识", link: "/life/novel/backtracking/3" },
						{ text: "相离", link: "/life/novel/backtracking/4" },
						{ text: "现实的鞭打", link: "/life/novel/backtracking/5" },
						{ text: "我的蜕变", link: "/life/novel/backtracking/6" },
					],
				},
			],
		},
	],

	"/remark": [
		{
			text: "备忘录",
			items: [
				{ text: "命令代码", link: "/remark/cmd" },
				{ text: "docker命令", link: "/remark/docker" },
				{ text: "git命令", link: "/remark/git" },
			],
		},
	],
};

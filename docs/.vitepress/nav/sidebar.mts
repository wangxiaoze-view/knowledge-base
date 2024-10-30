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
	],
	"/demos": [
		{ text: "介绍", link: "/demos/info" },
		{
			text: "Css",
			items: [
				{ text: "按钮", link: "/demos/css/button/common" },
				{ text: "卡片", link: "/demos/css/card/common" },
				{ text: "css-3d", link: "/demos/css/3d/common" },
				{ text: "图片", link: "/demos/css/image/common" },
				{ text: "文字", link: "/demos/css/text/common" },
				{ text: "交互", link: "/demos/css/mutual/common" },
				{ text: "导航栏", link: "/demos/css/nav/common" },
				{ text: "滚动", link: "/demos/css/scroll/common" },
				{ text: "canvas", link: "/demos/css/canvas/common" },
				{ text: "订单", link: "/demos/css/order/common" },
			],
		},
		{
			text: "JS",
			items: [
				{ text: "取色", link: "/demos/js/color/index" },
				{ text: "管道通信", link: "/demos/js/channel/index" },
				{ text: "语音合成", link: "/demos/js/speech/index" },
				{ text: "视口交叉", link: "/demos/js/windowCross/index" },
				{ text: "粘贴板", link: "/demos/js/clipboard/index" },
				{ text: "上万条数据的渲染", link: "/demos/js/data/index" },
			],
		},
		{
			text: "3D",
			items: [
				{ text: "3d模型", link: "/demos/3d/models/common" },
				{ text: "3d物体", link: "/demos/3d/object/common" },
				{ text: "3d贴图", link: "/demos/3d/stickers/common" },
			],
		},
	],

	"/docs": [
		{ text: "介绍", link: "/docs/info" },
		{
			text: "log-reporting",
			items: [
				{ text: "V1", link: "/docs/log-reporting/v1" },
				{ text: "V2", link: "/docs/log-reporting/v2" },
			],
		},

		{
			text: "temp-pro",
			items: [{ text: "如何使用", link: "/docs/temp-pro/docs" }],
		},
		{
			text: "dev-tools",
			items: [
				{ text: "介绍", link: "/docs/dev-tools/info" },
				{ text: "环境配置", link: "/docs/dev-tools/env" },
				{ text: "常见问题", link: "/docs/dev-tools/bug" },
			],
		},
		{
			text: "remote-components-lib",
			items: [
				{ text: "介绍", link: "/docs/remote-components-lib/info" },
				{ text: "常见问题", link: "/docs/remote-components-lib/issue" },
				{
					text: "Element-plus",
					link: "/docs/remote-components-lib/element",
				},
				{ text: "Vant", link: "/docs/remote-components-lib/vant" },
				{ text: "枚举", link: "/docs/remote-components-lib/enum" },
				{ text: "hooks", link: "/docs/remote-components-lib/hooks" },
				{ text: "utils", link: "/docs/remote-components-lib/utils" },
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
					text: "基础沉淀",
					items: [
						{ text: "变量提升", link: "/brochure/javascript/base/var-up" },
						{
							text: "数据类型",
							link: "/brochure/javascript/base/data",
						},
						{
							text: "线程引发的思考",
							link: "/brochure/javascript/base/threads",
						},
					],
				},
				{
					text: "设计模式",
					items: [
						{
							text: "订阅发布模式",
							link: "/brochure/javascript/design/subscribe",
						},
						{ text: "单例模式", link: "/brochure/javascript/design/singleton" },
						{
							text: "观察者模式",
							link: "/brochure/javascript/design/observer",
						},
						{
							text: "订阅发布与观察者区别",
							link: "/brochure/javascript/design/subOrOb",
						},
						{ text: "代理模式", link: "/brochure/javascript/design/proxy" },
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
						{
							text: ".browserslistrc",
							link: "/brochure/project/engineering/browserslistrc",
						},
						{
							text: ".editorConfig",
							link: "/brochure/project/engineering/editorConfig",
						},
						{
							text: ".env",
							link: "/brochure/project/engineering/env",
						},
						{
							text: ".git相关配置",
							link: "/brochure/project/engineering/git",
						},
						{
							text: ".prettier",
							link: "/brochure/project/engineering/prettier",
						},
						{
							text: ".eslint",
							link: "/brochure/project/engineering/eslint",
						},
						{
							text: ".stylelint",
							link: "/brochure/project/engineering/stylelint",
						},
						{
							text: ".husky",
							link: "/brochure/project/engineering/husky",
						},
						{
							text: "commitizen",
							link: "/brochure/project/engineering/commitizen",
						},
						{
							text: "changelog",
							link: "/brochure/project/engineering/changelog",
						},
						{
							text: "其他配置文件",
							link: "/brochure/project/engineering/others",
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
						{
							text: "webpack打包优化(老版本)",
							link: "/brochure/project/direction/webpack_direction_old",
						},
					],
				},
			],
		},
		{
			text: "Nest",
			items: [
				{
					text: "课余积累",
					items: [
						{ text: "初识", link: "/brochure/nest/base/info" },
						{ text: "入手Demo", link: "/brochure/nest/base/demo" },
						{ text: "加载环境文件", link: "/brochure/nest/base/reform" },
						{ text: "中间件", link: "/brochure/nest/base/middleware" },
						{ text: "请求拦截器", link: "/brochure/nest/base/interceptor" },
						{ text: "数据库的配置", link: "/brochure/nest/base/database" },
						{
							text: "异常过滤器",
							link: "/brochure/nest/base/exceptionFilter",
						},
						{ text: "jwt授权", link: "/brochure/nest/base/jwt" },
						{ text: "路由守卫", link: "/brochure/nest/base/canActive" },
						{ text: "拦截器", link: "/brochure/nest/base/interceptors" },
						{ text: "其他配置", link: "/brochure/nest/base/others" },
					],
				},
			],
		},
		{
			text: "服务器部署",
			items: [
				{
					text: "运营",
					items: [
						{ text: "宝塔面板", link: "/brochure/server/operations/baoTa" },
						{ text: "pm2", link: "/brochure/server/operations/pm2" },
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
	"/work": [
		{
			text: "工作总结",
			items: [
				{
					text: "项目总结",
					items: [
						{ text: `老系统升级问题总结`, link: "/work/summary/project/1" },
						{
							text: `系统下单(重复单提示框)的异常`,
							link: "/work/summary/project/2",
						},
						{
							text: `图片上传之前的自定义水印`,
							link: "/work/summary/project/3",
						},
						{
							text: `中英文搜索按键回车事件冲突`,
							link: "/work/summary/project/4",
						},
						{
							text: `GridView宫格加载渲染优化`,
							link: "/work/summary/project/5",
						},
						{ text: `支付中转页面`, link: "/work/summary/project/6" },
						{ text: `移动端返回触发俩次`, link: "/work/summary/project/7" },
						{ text: `键盘弹起底部被顶起问题`, link: "/work/summary/project/8" },
						{ text: `防篡改水印`, link: "/work/summary/project/9" },
						{ text: `选项卡loading`, link: "/work/summary/project/10" },
					],
				},
				{
					text: "技术调研",
					items: [
						{
							text: `跨端`,
							items: [
								{ text: `跨端之多端系统`, link: "/work/summary/dev/1" },
								{ text: `浅谈跨端技术的局限性`, link: "/work/summary/dev/2" },
							],
						},

						{
							text: `网站更新`,
							items: [
								{ text: `网站更新一`, link: "/work/summary/dev/3" },
								{ text: `网站更新二`, link: "/work/summary/dev/3-1" },
							],
						},

						{
							text: `开发工具`,
							items: [
								{
									text: `nvm1.1.12版本的一个问题`,
									link: "/work/summary/dev/4",
								},
								{ text: `nvm替换为fnm`, link: "/work/summary/dev/6" },
								{ text: `开发远程组件的介绍`, link: "/work/summary/dev/8" },
							],
						},

						{
							text: `其他语言`,
							items: [
								{
									text: `记录使用1Panel遇到的问题`,
									link: "/work/summary/dev/5",
								},
								{ text: `rust-env没有继承问题`, link: "/work/summary/dev/7" },
							],
						},
					],
				},
				{
					text: "个人总结",
					items: [
						{ text: "2019.06 - 2022-07", link: "/work/summary/person/1" },
						{ text: "2022-08 - 2024-07", link: "/work/summary/person/2" },
					],
				},
			],
		},
	],

	"/life": [
		{ text: "介绍", link: "/life/info" },
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
						{ text: "步入正轨", link: "/life/novel/backtracking/7" },
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

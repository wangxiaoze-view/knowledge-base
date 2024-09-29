// https://vitepress.dev/guide/custom-theme
import { h, onMounted, watch, nextTick } from "vue";
import { useRoute, useData, Theme } from "vitepress";
import DefaultTheme from "vitepress/theme";
import { ElementPlusContainer } from "@vitepress-demo-preview/component";
import mediumZoom from "medium-zoom";

import "./style.css";
// demo
import "@vitepress-demo-preview/component/dist/style.css";
// 时间线
import "vitepress-markdown-timeline/dist/theme/index.css";

export default {
	extends: DefaultTheme,
	setup() {
		// 图片放大
		const route = useRoute();
		const initZoom = () => {
			mediumZoom(".main img", { background: "var(--vp-c-bg)" });
		};
		onMounted(() => {
			// TODO: 后期判断图片加载状态
			// console.log(document.querySelectorAll("img"), 123);
			initZoom();
		});
		watch(
			() => route.path,
			() => nextTick(() => initZoom())
		);
	},

	Layout: () => {
		const props: Record<string, any> = {};
		// 获取 frontmatter
		const { frontmatter } = useData();

		/* 添加自定义 class */
		if (frontmatter.value?.layoutClass) {
			props.class = frontmatter.value.layoutClass;
		}
		return h(DefaultTheme.Layout, props);
	},

	enhanceApp({ app, router, siteData }) {
		app.component("demo-preview", ElementPlusContainer);
	},
} satisfies Theme;

// https://vitepress.dev/guide/custom-theme
import { h } from "vue";
import type { Theme } from "vitepress";
import DefaultTheme from "vitepress/theme";
import "./style.css";
import { AntDesignContainer } from "@vitepress-demo-preview/component";
import "@vitepress-demo-preview/component/dist/style.css";

import "vitepress-markdown-timeline/dist/theme/index.css";
import googleAnalytics from "vitepress-plugin-google-analytics";

import mediumZoom from "medium-zoom";
import { onMounted, watch, nextTick } from "vue";
import { useRoute } from "vitepress";

export default {
	extends: DefaultTheme,
	setup() {
		const route = useRoute();
		const initZoom = () => {
			// mediumZoom('[data-zoomable]', { background: 'var(--vp-c-bg)' }); // 默认
			mediumZoom(".main img", { background: "var(--vp-c-bg)" }); // 不显式添加{data-zoomable}的情况下为所有图像启用此功能
		};
		onMounted(() => {
			initZoom();
		});
		watch(
			() => route.path,
			() => nextTick(() => initZoom())
		);
	},
	Layout: () => {
		return h(DefaultTheme.Layout, null, {
			// https://vitepress.dev/guide/extending-default-theme#layout-slots
		});
	},
	enhanceApp({ app, router, siteData }) {
		googleAnalytics({
			id: "GTM-KJ452JQX", //跟踪ID，在analytics.google.com注册即可
		}),
			app.component("demo-preview", AntDesignContainer);
	},
} satisfies Theme;

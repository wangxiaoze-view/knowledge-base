import { h, onMounted, watch, nextTick } from "vue";
import { useRoute, useData, Theme } from "vitepress";
import DefaultTheme from "vitepress/theme";
import mediumZoom from "medium-zoom";

import "./style.css";
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

		// 这里的作用就是，如果图片加载失败，则使用 github 上的图片
		const imageError = () => {
			const images = document.querySelectorAll("img");
			for (let i = 0; i < images.length; i++) {
				const item = images[i];
				const src = item.src;
				if (src.indexOf("www.wangzevw.com/cdn-file") !== -1) {
					const lastIndex = src.lastIndexOf("/");
					if (lastIndex !== -1) {
						const end = src.substring(lastIndex, src.length);
						item.setAttribute("data-origin", src);
						item.setAttribute(
							"data-github",
							`https://wangxiaoze-view.github.io/picx-images-hosting/images${end}`
						);
					}
					item.onerror = function () {
						item.src = item.getAttribute("data-github") || "";
					};
				}
			}
		};

		onMounted(() => {
			imageError();
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

	// enhanceApp({ app, router, siteData }) {},
} satisfies Theme;

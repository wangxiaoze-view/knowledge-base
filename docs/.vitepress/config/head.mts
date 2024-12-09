import { HeadConfig } from "vitepress";
import { googleGtm, googleNs, baidu } from "./scripts.mts";

const links: HeadConfig[] = [
	["link", { rel: "icon", href: "/logo.png" }],
	// 如果后期加载慢，那么需要将其放在cdn中
	[
		"link",
		{
			rel: "stylesheet",
			href: "https://cdn.jsdelivr.net/npm/remixicon@4.2.0/fonts/remixicon.css",
		},
	],
];

const scripts: HeadConfig[] = [
	["script", {}, `${googleGtm}`],
	["script", {}, `${googleNs}`],
	["script", {}, `${baidu}`],
];

export const head: HeadConfig[] = [...links, ...scripts];

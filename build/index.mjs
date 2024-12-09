import fs from "node:fs";

const entry = ["assets", "guide", "brochure", "project", "life", "*"];

const vercel = {
	headers: Array.from({
		length: entry.length,
	}).map((_, i) => ({
		source: `/${entry[i]}/(.*)`,
		headers: [
			{
				key: "Cache-Control",
				value: "max-age=31536000, immutable",
			},
		],
	})),
};

// 文件写入
fs.writeFileSync(
	"docs/.vitepress/dist/vercel.json",
	JSON.stringify(vercel, null, 2)
);

// // 检测是否有文件
// const exit = "docs/.vitepress/dist/assets";
// if (fs.accessSync(exit)) {
// 	fs.rmSync(exit);
// }

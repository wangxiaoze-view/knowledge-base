// .vitepress/theme/utils/generate-path.js
import fs from "fs"; // 导入fs模块
import path from "path"; // 导入path模块

// 设置notes目录为根目录
const rootPath = path.resolve(process.cwd(), "docs");
const whiteList = [
	// 定义白名单列表
	// ".vuepress",
	// ".vitepress",
	// ".git",
	// "node_modules",
	// "notes/.obsidian",
	// "notes/.obsidian.vimrc",
	// "notes/模板",
];

// 从rootPath开始生成路径的函数
function generatePath(basePath) {
	const files = fs.readdirSync(path.resolve(process.cwd(), basePath));
	const paths = {};

	files.forEach(file => {
		if (whiteList.includes(file) || file === "index.md") return;
		const filePath = path.join(basePath, file);
		const stat = fs.statSync(filePath);

		const _f = file.replace(/^\d+_/, "");

		if (stat.isDirectory()) {
			paths[_f] = generatePath(filePath);
		} else if (path.extname(file) === ".md") {
			const relativePath = path
				.relative(rootPath, filePath)
				.replace(/\\/g, "/");
			const formattedPath = `/${relativePath.slice(0, -3)}`; // 以 '/' 开头
			paths[_f] = formattedPath;
		}
	});
	return paths;
}

// 从一个空的基本路径开始构建侧边栏的函数
function buildSidebar(structure, basePath = "") {
	const sidebar = [];

	Object.entries(structure).forEach(([key, value]) => {
		if (typeof value === "string") {
			const link = basePath ? `${basePath}/${value}` : value; // 避免 basePath 是空时前面多一个 '/'
			sidebar.push({
				text: path.basename(key, ".md"),
				link: link,
			});
		} else {
			// 递归处理目录，传递已经累积的 basePath
			// const newBasePath = basePath ? `${basePath}/${key}` : key;
			sidebar.push({
				text: key,
				// collapsed: true,
				items: buildSidebar(value),
			});
		}
	});

	return sidebar;
}
export { buildSidebar, generatePath };

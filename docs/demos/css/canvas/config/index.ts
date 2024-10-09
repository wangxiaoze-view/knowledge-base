export enum Shape {
	// 矩形
	RECTANGLE = "rectangle",
	// 菱形
	DIAMOND = "diamond",
	// 圆
	CIRCLE = "circle",
	// 清除
	CLEAN = "clean",
}

export interface IRectType {
	width: number;
	height: number;
	x: number;
	y: number;
}

export interface ICircleType {
	x: number;
	y: number;
	r: number;
}

export interface IShapesItem {
	type: Shape;
}
export const shapes: IShapesItem[] = [
	{ type: Shape.RECTANGLE },
	{ type: Shape.CIRCLE },
	{ type: Shape.CLEAN },
];

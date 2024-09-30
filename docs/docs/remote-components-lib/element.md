::: tip
下方列举了一些组件的使用示例，用到的组件为`element-plus`
:::

## 金额组件的显示

| Props      | 解释                            | 默认值               |
| ---------- | ------------------------------- | -------------------- |
| **cost**   | 金额,支持数字和字符串，如：1000 | -                    |
| **format** | 小数位数，默认 2 位             | 2                    |
| **color**  | 颜色 默认橘色                   | rgba(255, 136, 0, 1) |

使用示例如下

<preview path="./components/AmountText/index.vue"></preview>

## 图片组展示

| Props          | 解释                                           | 默认值                        |
| -------------- | ---------------------------------------------- | ----------------------------- |
| **image**      | 图片地址, 支持字符串数组 或 字符串             | -                             |
| **isLazy**     | 是否启用懒加载                                 | false                         |
| **style**      | 自定义样式                                     | width: '60px', height: '60px' |
| **limit**      | 限制展示的数量                                 | 9                             |
| **exceedType** | 超出数量展示类型;支持插槽'default' or 'number' | default                       |
| **isPreview**  | 是否开启预览                                   | true                          |

使用示例如下
<preview path="./components/LazyImage/index.vue"></preview>

## 插画

| Props      | 解释                            | 默认值 |
| ---------- | ------------------------------- | ------ |
| **type**   | 插画类型，支持字符串，如：'404' | -      |
| **width**  | 宽度                            | auto   |
| **height** | 高度                            | auto   |

插画图的`type`支持以下：

```ts
type TProps =
	| "404"
	| "502"
	| "add_address"
	| "bind_card"
	| "bind"
	| "loading"
	| "mapping"
	| "message_list"
	| "network_interruption"
	| "no_message"
	| "no_meeting"
	| "no_order"
	| "no_permission"
	| "no_products"
	| "no_task"
	| "pass"
	| "save_success"
	| "search"
	| "warning";
```

使用示例如下
<preview path="./components/PlateIcon/index.vue"></preview>

## 图片预览

| Event            | 解释                                              | 默认值 |
| ---------------- | ------------------------------------------------- | ------ |
| **reviewImages** | (visible: boolean, options: IReviewImage) => void | -      |

```ts
interface IReviewImage {
	/**
	 * @description 图片列表， 默认[]
	 */
	urlList: string[];
	/**
	 * @description 初始图片索引, 默认为0
	 */
	initIndex: number;
}
```

点击图片可以直接通过`reviewImages`方法预览
使用示例如下
<preview path="./components/PreviewImage/index.vue"></preview>

## 视频预览

| Event          | 解释                                                    | 默认值 |
| -------------- | ------------------------------------------------------- | ------ |
| **setVisible** | (val: boolean, playerConfig: IVideoPlayerProps) => void | -      |

```ts
/**
 * @description 具体参数详看西瓜播放器 https://h5player.bytedance.com/guide/#%E5%9F%BA%E6%9C%AC%E4%BD%BF%E7%94%A8
 */
interface IReviewImage {
	url: string;
	id?: string;
	lang?: "zh";
	volume?: number;
	autoplay?: boolean;
	screenShot?: boolean;
	playbackRate?: number[];
	fluid?: boolean;
}
```

点击图片可以直接通过`setVisible`方法预览
使用示例如下
<preview path="./components/PreviewVideo/index.vue"></preview>

## 自定义视频播放器

| Props      | 解释                     | 默认值                      |
| ---------- | ------------------------ | --------------------------- |
| **config** | 自定义视频播放器配置, {} | id: 'video-player', url: '' |

| Emits      | 解释     | 默认值                   |
| ---------- | -------- | ------------------------ |
| **player** | 播放事件 | 参数为：当前播放器的实例 |

用法和`视频预览`类似，只不过`视频预览`外层嵌套了一层弹框，里层用的正是`自定义视频播放器`组件。

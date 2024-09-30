::: tip
下方列举了一些组件的使用示例，用到的组件为`vant`
:::

## 移动端默认页面

**`Props， 插槽`和[官方文档](https://vant-ui.github.io/vant/#/zh-CN/empty)一致**

使用示例如下， 使用插槽和插画图搭配

<preview path="./components/VanEmpty/index.vue"></preview>

## 移动端状态栏

**`Props， 插槽`和[官方文档](https://vant-ui.github.io/vant/#/zh-CN/nav-bar)一致**

| Props          | 解释                                               | 默认值 |
| -------------- | -------------------------------------------------- | ------ |
| **bgColor**    | 背景色                                             | #fff   |
| **paddingTop** | 距离顶部状态栏的距离，在移动端中需要间隔状态栏高度 | 0px    |

| Emits           | 解释     | 默认值 |
| --------------- | -------- | ------ |
| **click-left**  | 左侧点击 | -      |
| **click-right** | 右侧点击 | -      |

使用示例如下，

<preview path="./components/VanNavBar/index.vue"></preview>

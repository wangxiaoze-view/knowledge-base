(window.webpackJsonp=window.webpackJsonp||[]).push([[14],{330:function(v,e,_){"use strict";_.r(e);var o=_(4),s=Object(o.a)({},(function(){var v=this,e=v._self._c;return e("ContentSlotsDistributor",{attrs:{"slot-key":v.$parent.slotKey}},[e("p",[e("code",[v._v("Vue")]),v._v(" 中的"),e("code",[v._v("v-if 和 v-show")]),v._v(" 都是用来实现条件性渲染的指令，它们都允许根据表达式的真假值来决定是否显示对应的 DOM 元素。然而，二者在实现机制、性能影响及适用场景上存在显著差异。")]),v._v(" "),e("h2",{attrs:{id:"渲染机制"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#渲染机制"}},[v._v("#")]),v._v(" 渲染机制")]),v._v(" "),e("ol",[e("li",[e("code",[v._v("v-if")]),v._v("控制元素的显示与否，当条件为"),e("code",[v._v("false")]),v._v("时，vue 在编译阶段会跳过该元素以及子元素的渲染, 这些元素不会在 DOM 树中创建；当条件为 true 时，vue 会动态添加该元素以及子元素。"),e("code",[v._v("true变为false")]),v._v("，相应的元素也会销毁在 DOM 中也会移除；这意味着使用 "),e("code",[v._v("v-if")]),v._v(" 的元素会经历一个局部编译/卸载的过程，包括其内部的事件监听器和子组件也会被适当地销毁和重建。")]),v._v(" "),e("li",[e("code",[v._v("v-show")]),v._v("不论初始条件如何，带有"),e("code",[v._v("v-show")]),v._v(" 的元素总会被渲染到 DOM 中。它通过动态修改元素的 CSS 属性（通常是 "),e("code",[v._v("display: none 或 display: block")]),v._v("）来控制元素的显示与隐藏。这意味着当条件变化时，元素本身始终存在于 DOM 结构中，只是简单地改变了其可见性。")])]),v._v(" "),e("h2",{attrs:{id:"编译开销与性能影响"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#编译开销与性能影响"}},[v._v("#")]),v._v(" 编译开销与性能影响：")]),v._v(" "),e("ol",[e("li",[e("p",[e("code",[v._v("v-if")]),v._v("由于它会根据条件动态地添加或删除 DOM 元素，因此在初次渲染时，如果条件为 false，可以节省不必要的 DOM 构建和渲染成本。对于复杂的元素或组件，这种策略能更高效地利用资源。然而，当条件频繁切换时，每次切换都需要重新编译、创建或销毁元素，这可能会带来较高的性能开销。")])]),v._v(" "),e("li",[e("p",[e("code",[v._v("v-show")]),v._v("由于始终渲染元素到 DOM 中，初次渲染时无论条件如何，都会产生一定的 DOM 构建成本。但后续条件切换时，只需简单地更新 CSS 属性，无需进行 DOM 节点的增删操作，因此在频繁切换显示状态的情况下，v-show 的性能通常优于 v-if。不过，即使元素被隐藏，它仍会影响文档流布局，占用内存资源。")])])]),v._v(" "),e("h2",{attrs:{id:"适用场景总结"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#适用场景总结"}},[v._v("#")]),v._v(" 适用场景总结")]),v._v(" "),e("ol",[e("li",[e("code",[v._v("v-if")]),v._v("适用于那些在大部分时间内不需要渲染，或者条件变化不频繁，且渲染代价较大的情况。例如，加载额外数据的分页组件、用户登录后才显示的个人资料区域、根据权限控制的高级功能模块等")]),v._v(" "),e("li",[e("code",[v._v("v-show")]),v._v("适合于条件变化频繁，且元素本身相对简单，或者切换显示状态的开销远小于 DOM 操作的情况。比如，用户交互频繁的切换按钮、滑动展开/收起的内容区域、切换不同视图的同一部分 UI 元素等。")])])])}),[],!1,null,null,null);e.default=s.exports}}]);
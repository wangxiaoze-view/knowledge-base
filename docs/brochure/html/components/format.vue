<template>
	<div class="p_container">
		<p><b>粗体</b></p>
		<p><strong>粗体</strong></p>
		<p><em>斜体</em></p>
		<p><i>斜体</i></p>
		<p><u>下划线</u></p>
		<p><ins>下划线</ins></p>
		<p><s>删除线</s></p>
		<p><del>删除线</del></p>
		<p><mark>标记</mark></p>
		<p><sub>下标</sub></p>
		<p><sup>上标</sup></p>
		<p><small>小号</small></p>
		<p><abbr title="Hyper Text Markup Language">HTML</abbr></p>
		<p><code>代码</code></p>
		<p><kbd>键盘</kbd></p>
		<p><var>变量</var></p>
		<p><samp>示例</samp></p>
		<p><cite>引用</cite></p>
		<p><dfn>定义</dfn></p>
		<p><q>引用</q></p>
		<blockquote>引用</blockquote>
		<p><cite>引用</cite></p>
		<address>地址</address>
		<p><ins>引用</ins></p>
		<p><del>引用</del></p>
		<p><s>引用</s></p>
		<p><s>引用</s></p>
		<pre>
      My Bonnie lies over the ocean.
    </pre>
	</div>
</template>

<style lang="scss" scoped>
.p_container {
	display: flex;
	gap: 10px;
	flex-wrap: wrap;

	p {
		text-align: left;
	}
}
</style>

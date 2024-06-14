import{_ as e,c as a,o,a3 as t}from"./chunks/framework.DflgEAq4.js";const p=JSON.parse('{"title":"","description":"","frontmatter":{"outline":"deep"},"headers":[],"relativePath":"featured/vue/3.md","filePath":"featured/vue/3.md"}'),c={name:"featured/vue/3.md"},l=t('<div class="info custom-block"><p class="custom-block-title">atch,watcheffect 和 computed 的区别</p><p><code>vue</code>中的<code>watch, watchEffect,computed</code>是三个不同的工具，用于处理数据响应式和根据数据的改变而执行对应的逻辑。</p></div><h2 id="computed" tabindex="-1">computed <a class="header-anchor" href="#computed" aria-label="Permalink to &quot;computed&quot;">​</a></h2><h3 id="作用" tabindex="-1">作用 <a class="header-anchor" href="#作用" aria-label="Permalink to &quot;作用&quot;">​</a></h3><p>计算属性。<code>computed</code> 用于定义那些基于组件状态<code>（如 data、其他 computed 属性、props 等）</code>的衍生值。当其依赖的状态发生变化时，计算属性会自动重新计算并返回结果。</p><h3 id="特性" tabindex="-1">特性 <a class="header-anchor" href="#特性" aria-label="Permalink to &quot;特性&quot;">​</a></h3><ol><li><strong>缓存机制：</strong> <code>computed</code>是有缓存的，只有依赖的状态发生变化时，才会重新计算。如果依赖未发生变化，则直接返回之前计算的结果，<strong>避免了不必要的重复计算，提高了性能</strong></li><li><strong>声明式：</strong> 在模板中可直接使用<code>computed</code>属性，就像访问普通函数一样</li><li><strong>读取优先：</strong> <code>conputed</code>主要用于<strong>读取</strong>场景，其值由<code>vue</code>自动维护, 通常不建议在业务逻辑中直接修改<code>computed</code>属性, 因为这会破坏依赖追踪机制，导致计算属性的依赖项变化无法触发重新计算。<code>computed</code>默认是可读的状态；</li></ol><h3 id="使用场景" tabindex="-1">使用场景 <a class="header-anchor" href="#使用场景" aria-label="Permalink to &quot;使用场景&quot;">​</a></h3><ol><li>当需要对数据进行复杂计算或者逻辑出库，并且结果仅仅依赖于输入状态时</li><li>需要以高效，声明式的方式展示经过处理的数据(格式化，筛选，汇总)</li></ol><h2 id="watch" tabindex="-1">watch <a class="header-anchor" href="#watch" aria-label="Permalink to &quot;watch&quot;">​</a></h2><h3 id="作用-1" tabindex="-1">作用 <a class="header-anchor" href="#作用-1" aria-label="Permalink to &quot;作用&quot;">​</a></h3><p>响应式监听器， 允许指定单个或者多个数据源(可以是任意数据, 数据属性，对象，数组甚至是<code>props, computed</code>)， 当这数据源的值发生变化并执行回调函数</p><h3 id="特性-1" tabindex="-1">特性 <a class="header-anchor" href="#特性-1" aria-label="Permalink to &quot;特性&quot;">​</a></h3><ol><li><strong>准确监听：</strong> 可以精确监听指定的数据源的深度，控制监听粒度</li><li><strong>选项丰富：</strong> 提供了多种选项去定制监听行为，如<code>deep深度监听</code>，<code>immediate立即执行</code>, <code>flush队列刷新策略</code>等</li><li><strong>手动控制：</strong> 回调函数内可以进行复杂的异步操作、资源清理等工作，并能访问到新旧值。</li></ol><h3 id="使用场景-1" tabindex="-1">使用场景 <a class="header-anchor" href="#使用场景-1" aria-label="Permalink to &quot;使用场景&quot;">​</a></h3><ol><li>当需要在特定数据变化时执行异步操作、昂贵计算或者进行副作用处理（如更新 DOM、发送网络请求、更新外部状态等）。</li><li>需要对数据变化进行精细控制，如深度监听、处理特定类型的变更事件等。</li></ol><h2 id="watcheffect" tabindex="-1">watchEffect <a class="header-anchor" href="#watcheffect" aria-label="Permalink to &quot;watchEffect&quot;">​</a></h2><h3 id="作用-2" tabindex="-1">作用 <a class="header-anchor" href="#作用-2" aria-label="Permalink to &quot;作用&quot;">​</a></h3><p>自动追踪副作用函数；<code>watchEffect</code>立即执行传入的回调函数，并在此之后持续追踪其内部依赖（所有响应式引用），每当这些依赖变化时，回调函数会再次执行。</p><h3 id="特性-2" tabindex="-1">特性 <a class="header-anchor" href="#特性-2" aria-label="Permalink to &quot;特性&quot;">​</a></h3><ol><li><strong>自动搜集依赖：</strong> 不需要明确指定要监听的数据源，函数体内部访问到的所有响应式数据都会被自动追踪</li><li><strong>立即执行：</strong> 创建时立即运行一次，无需 immediate 选项，默认总是同步执行回调。</li><li><strong>关注副作用：</strong> 更关注于副作用（side effect）的执行，而非具体监听哪个数据的变化。</li></ol><h3 id="使用场景-2" tabindex="-1">使用场景 <a class="header-anchor" href="#使用场景-2" aria-label="Permalink to &quot;使用场景&quot;">​</a></h3><ol><li>当需要自动追踪和即时响应所有影响组件状态变化的因素时，无需关心具体是哪些数据变化。</li><li>用于处理初始化逻辑或依赖复杂且动态变化的情况，简化代码编写。</li></ol><h2 id="总结" tabindex="-1">总结 <a class="header-anchor" href="#总结" aria-label="Permalink to &quot;总结&quot;">​</a></h2><ul><li><code>computed</code> 适用于定义基于状态的衍生值，提供高效的缓存机制，常用于视图渲染。</li><li><code>watch</code> 用于监听特定数据的变化，并在变化时执行特定的回调，适合处理复杂副作用。</li><li><code>watchEffect</code> 自动追踪副作用函数的依赖，无须指定监听目标，常用于初始化和简单即时响应场景。</li></ul>',24),d=[l];function i(r,h,n,s,u,f){return o(),a("div",null,d)}const b=e(c,[["render",i]]);export{p as __pageData,b as default};

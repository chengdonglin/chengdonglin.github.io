import{_ as s,c as i,o as a,a3 as e}from"./chunks/framework.pgMqRpUO.js";const y=JSON.parse('{"title":"SpringBoot 基于 ServletRequestHandledEvent 完成接口耗时调用","description":"","frontmatter":{},"headers":[],"relativePath":"column/springboot/015_spring_boot_cost_time.md","filePath":"column/springboot/015_spring_boot_cost_time.md"}'),n={name:"column/springboot/015_spring_boot_cost_time.md"},t=e(`<h1 id="springboot-基于-servletrequesthandledevent-完成接口耗时调用" tabindex="-1">SpringBoot 基于 ServletRequestHandledEvent 完成接口耗时调用 <a class="header-anchor" href="#springboot-基于-servletrequesthandledevent-完成接口耗时调用" aria-label="Permalink to &quot;SpringBoot 基于 ServletRequestHandledEvent 完成接口耗时调用&quot;">​</a></h1><p>在开发 Web 应用时，监控接口的性能是非常重要的。通过记录接口的调用耗时，我们可以及时发现性能瓶颈，优化系统性能。本文将介绍如何在 Spring Boot 应用中使用 ServletRequestHandledEvent 来记录接口的调用耗时。</p><h2 id="什么是-servletrequesthandledevent" tabindex="-1">什么是 ServletRequestHandledEvent？ <a class="header-anchor" href="#什么是-servletrequesthandledevent" aria-label="Permalink to &quot;什么是 ServletRequestHandledEvent？&quot;">​</a></h2><p>ServletRequestHandledEvent 是 Spring 框架提供的一个事件，它在每次 HTTP 请求处理完成后被发布。这个事件包含了请求的详细信息，如请求 URL、处理时间等。通过监听这个事件，我们可以获取到请求的处理时间，从而记录接口的调用耗时。</p><h2 id="创建事件监听器" tabindex="-1">创建事件监听器 <a class="header-anchor" href="#创建事件监听器" aria-label="Permalink to &quot;创建事件监听器&quot;">​</a></h2><div class="language-java vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">java</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">@</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">Component</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">@</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">Slf4j</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">public</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;"> class</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;"> RequestTimeEventListener</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;"> implements</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;"> ApplicationListener</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">&lt;</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">ServletRequestHandledEvent</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">&gt; {</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">    @</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">Override</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">    public</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;"> void</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;"> onApplicationEvent</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(ServletRequestHandledEvent </span><span style="--shiki-light:#E36209;--shiki-dark:#FFAB70;">event</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">) {</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">        Throwable failureCause </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">=</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> event.</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">getFailureCause</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">();</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">        String failureMessage </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">=</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> failureCause </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">==</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> null</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;"> ?</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> &quot;&quot;</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;"> :</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> failureCause.</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">getMessage</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">();</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">        if</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> (failureCause </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">!=</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> null</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">) {</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">            failureMessage </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">=</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> failureCause.</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">getMessage</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">();</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">        }</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">        String clientAddress </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">=</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> event.</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">getClientAddress</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">();</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">        String requestUrl </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">=</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> event.</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">getRequestUrl</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">();</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">        String method </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">=</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> event.</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">getMethod</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">();</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">        long</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> processingTimeMillis </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">=</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> event.</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">getProcessingTimeMillis</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">();</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">        if</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> (StrUtil.</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">isEmpty</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(failureMessage)) {</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">            log.</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">info</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&quot;clientAddress = {} requestUrl = {} method = {} costTime = {}&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">,clientAddress,requestUrl,method,processingTimeMillis);</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">        } </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">else</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> {</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">            log.</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">error</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&quot;clientAddress = {} requestUrl = {} method = {} costTime = {} error = {}&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">,clientAddress,requestUrl,method,processingTimeMillis,failureMessage);</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">        }</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">    }</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">}</span></span></code></pre></div><h2 id="总结" tabindex="-1">总结 <a class="header-anchor" href="#总结" aria-label="Permalink to &quot;总结&quot;">​</a></h2><p>通过使用 ServletRequestHandledEvent，我们可以非常方便地记录接口的调用耗时。这种方法不仅简单，而且不会对现有代码造成侵入。</p>`,8),l=[t];function h(k,p,r,E,d,g){return a(),i("div",null,l)}const c=s(n,[["render",h]]);export{y as __pageData,c as default};
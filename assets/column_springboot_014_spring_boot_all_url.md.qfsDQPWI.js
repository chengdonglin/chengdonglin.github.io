import{_ as s,c as i,o as a,a3 as n}from"./chunks/framework.pgMqRpUO.js";const y=JSON.parse('{"title":"SpringBoot 基于 CommandLineRunner 扩展点获取 web 项目所有 URL","description":"","frontmatter":{},"headers":[],"relativePath":"column/springboot/014_spring_boot_all_url.md","filePath":"column/springboot/014_spring_boot_all_url.md"}'),t={name:"column/springboot/014_spring_boot_all_url.md"},h=n(`<h1 id="springboot-基于-commandlinerunner-扩展点获取-web-项目所有-url" tabindex="-1">SpringBoot 基于 CommandLineRunner 扩展点获取 web 项目所有 URL <a class="header-anchor" href="#springboot-基于-commandlinerunner-扩展点获取-web-项目所有-url" aria-label="Permalink to &quot;SpringBoot 基于 CommandLineRunner 扩展点获取 web 项目所有 URL&quot;">​</a></h1><p>Spring Boot 的 CommandLineRunner 接口是一个函数式接口，用于在 Spring Boot 应用程序启动后执行一些初始化操作。它提供了一个 run 方法，该方法在应用程序启动后被调用。使用 CommandLineRunner 接口，可以在应用程序启动后执行一些必要的初始化操作，例如加载初始化数据，启动打印应用信息，启动异步任务，接口健康检查，外部服务调用，启动参数校验等。可以通过实现 CommandLineRunner 接口，并重写 run 方法来定义自己的初始化逻辑。</p><h2 id="需求点" tabindex="-1">需求点： <a class="header-anchor" href="#需求点" aria-label="Permalink to &quot;需求点：&quot;">​</a></h2><p>项目在启动的时候，会采集项目所有对外 http 接口信息，来做一些额外的信息，对此，我们基于 CommandLineRunner 在应用启动就上报这些信息给指定的平台</p><h2 id="自定义实现-commandlinerunner-函数接口" tabindex="-1">自定义实现 CommandLineRunner 函数接口 <a class="header-anchor" href="#自定义实现-commandlinerunner-函数接口" aria-label="Permalink to &quot;自定义实现 CommandLineRunner 函数接口&quot;">​</a></h2><div class="language-java vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">java</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">@</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">Component</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">@</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">Slf4j</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">public</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;"> class</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;"> RequestUrlEndpointCommandLineRunner</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;"> implements</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;"> CommandLineRunner</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> {</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">    @</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">Override</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">    public</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;"> void</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;"> run</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(String... </span><span style="--shiki-light:#E36209;--shiki-dark:#FFAB70;">args</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">) </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">throws</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> Exception {</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">        log.</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">info</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&quot;-----------------开始采集项目所有的http接口信息------------------------&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">);</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">        RequestMappingHandlerMapping handlerMapping </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">=</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> ApplicationContextUtils.</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">getBean</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(RequestMappingHandlerMapping.class);</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">        assert</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> handlerMapping </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">!=</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> null</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">;</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">        Map&lt;</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">RequestMappingInfo</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">, </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">HandlerMethod</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">&gt; handlerMethods </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">=</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> handlerMapping.</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">getHandlerMethods</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">();</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">        List&lt;Map&lt;</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">String</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">, </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">String</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">&gt;&gt; list </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">=</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;"> new</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> ArrayList&lt;&gt;();</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">        handlerMethods.</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">forEach</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">((requestMappingInfo , handlerMethod) </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">-&gt;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> {</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">            Map&lt;</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">String</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">, </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">String</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">&gt; map </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">=</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;"> new</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> HashMap&lt;&gt;();</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">            PatternsRequestCondition condition </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">=</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> requestMappingInfo.</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">getPatternsCondition</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">();</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">            if</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> (condition </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">!=</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> null</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">) {</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">                Set&lt;</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">String</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">&gt; patterns </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">=</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> condition.</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">getPatterns</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">();</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">                patterns.</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">forEach</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(pattern </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">-&gt;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> { map.</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">put</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&quot;url&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">, pattern);});</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">            }</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">            map.</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">put</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&quot;className&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">,handlerMethod.</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">getMethod</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">().</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">getDeclaringClass</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">().</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">getName</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">());</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">            map.</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">put</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&quot;methodName&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">,handlerMethod.</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">getMethod</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">().</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">getName</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">());</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">            RequestMethodsRequestCondition methodsCondition </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">=</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> requestMappingInfo.</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">getMethodsCondition</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">();</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">            for</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> (RequestMethod requestMethod </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">:</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> methodsCondition.</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">getMethods</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">()) {</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">                map.</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">put</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&quot;type&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">, requestMethod.</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">toString</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">());</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">            }</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">            list.</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">add</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(map);</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">        });</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">        list.</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">forEach</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(m </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">-&gt;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> {</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">            log.</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">info</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&quot;className = {} methodName = {} request method = {} url = {} &quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">, m.</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">get</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&quot;className&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">), m.</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">get</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&quot;methodName&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">),m.</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">get</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&quot;type&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">), m.</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">get</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&quot;url&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">));</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">        });</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">        log.</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">info</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&quot;-----------------采集项目所有的http接口信息------------------------&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">);</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">    }</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">}</span></span></code></pre></div><h2 id="启动" tabindex="-1">启动 <a class="header-anchor" href="#启动" aria-label="Permalink to &quot;启动&quot;">​</a></h2><p>启动之后我们可以看到控制台输出以下信息</p><div class="language-text vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">text</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>2024-10-15 14:03:44.356  INFO 26680 --- [           main] .c.i.RequestUrlEndpointCommandLineRunner : -----------------开始采集项目所有的http接口信息------------------------</span></span>
<span class="line"><span>2024-10-15 14:03:44.356  INFO 26680 --- [           main] .c.i.RequestUrlEndpointCommandLineRunner : className = springfox.documentation.oas.web.OpenApiControllerWebMvc methodName = getDocumentation request method = GET url = /v3/api-docs</span></span>
<span class="line"><span>2024-10-15 14:03:44.357  INFO 26680 --- [           main] .c.i.RequestUrlEndpointCommandLineRunner : className = com.ssn.hub.api.ProjectApi methodName = addProjectMember request method = POST url = /api/projects/add/member</span></span>
<span class="line"><span>2024-10-15 14:03:44.357  INFO 26680 --- [           main] .c.i.RequestUrlEndpointCommandLineRunner : className = springfox.documentation.swagger.web.ApiResourceController methodName = securityConfiguration request method = GET url = /swagger-resources/configuration/security</span></span>
<span class="line"><span>2024-10-15 14:03:44.357  INFO 26680 --- [           main] .c.i.RequestUrlEndpointCommandLineRunner : className = com.ssn.hub.api.ProjectApi methodName = addTask request method = POST url = /api/projects/add/task</span></span>
<span class="line"><span>2024-10-15 14:03:44.357  INFO 26680 --- [           main] .c.i.RequestUrlEndpointCommandLineRunner : className = com.ssn.hub.api.ProjectApi methodName = addProjectCollection request method = POST url = /api/projects/add/collection</span></span>
<span class="line"><span>2024-10-15 14:03:44.357  INFO 26680 --- [           main] .c.i.RequestUrlEndpointCommandLineRunner : className = com.ssn.hub.api.UserApi methodName = addUser request method = POST url = /api/user/add</span></span>
<span class="line"><span>2024-10-15 14:03:44.357  INFO 26680 --- [           main] .c.i.RequestUrlEndpointCommandLineRunner : className = springfox.documentation.swagger2.web.Swagger2ControllerWebMvc methodName = getDocumentation request method = GET url = /v2/api-docs</span></span>
<span class="line"><span>2024-10-15 14:03:44.357  INFO 26680 --- [           main] .c.i.RequestUrlEndpointCommandLineRunner : className = com.ssn.hub.api.FileApi methodName = upload request method = POST url = /api/</span></span>
<span class="line"><span>.....</span></span>
<span class="line"><span></span></span>
<span class="line"><span>2024-10-15 14:03:44.358  INFO 26680 --- [           main] .c.i.RequestUrlEndpointCommandLineRunner : -----------------采集项目所有的http接口信息------------------------</span></span></code></pre></div><h2 id="总结" tabindex="-1">总结 <a class="header-anchor" href="#总结" aria-label="Permalink to &quot;总结&quot;">​</a></h2><p>通过 CommandLineRunner,可以深度控制 Spring Boot 应用的启动流程,在应用启动阶段增强各种自定义逻辑。是 Spring Boot 提供的一个很实用的扩展点</p>`,11),p=[h];function e(l,k,E,r,d,o){return a(),i("div",null,p)}const c=s(t,[["render",e]]);export{y as __pageData,c as default};

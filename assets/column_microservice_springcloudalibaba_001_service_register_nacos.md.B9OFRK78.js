import{_ as s,c as a,o as i,a3 as n}from"./chunks/framework.pgMqRpUO.js";const e="/assets/nacos_namespace.DBdlsD6u.png",t="/assets/nacos-register.BFZrrhrP.png",u=JSON.parse('{"title":"Service register to Nacos","description":"","frontmatter":{},"headers":[],"relativePath":"column/microservice/springcloudalibaba/001_service_register_nacos.md","filePath":"column/microservice/springcloudalibaba/001_service_register_nacos.md"}'),p={name:"column/microservice/springcloudalibaba/001_service_register_nacos.md"},l=n('<h1 id="service-register-to-nacos" tabindex="-1">Service register to Nacos <a class="header-anchor" href="#service-register-to-nacos" aria-label="Permalink to &quot;Service register to Nacos&quot;">​</a></h1><p>Now, nacos is popular register center,it imp the spring cloud.In this tutorial,I&#39;ll step by step register service to nacos.</p><h2 id="create-namespace" tabindex="-1">create namespace <a class="header-anchor" href="#create-namespace" aria-label="Permalink to &quot;create namespace&quot;">​</a></h2><p>Creating namespaces not only isolates services but also configuration files, allowing these files to be defined in different domains. This facilitates the management of configuration files and helps avoid the issue of different project teams or developers using duplicate names for configuration files. <img src="'+e+`" alt="project"></p><h2 id="maven-dependencies" tabindex="-1">Maven Dependencies <a class="header-anchor" href="#maven-dependencies" aria-label="Permalink to &quot;Maven Dependencies&quot;">​</a></h2><div class="language-xml vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">xml</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">        &lt;</span><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">dependency</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">&gt;</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">          &lt;</span><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">groupId</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">&gt;com.alibaba.cloud&lt;/</span><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">groupId</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">&gt;</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">          &lt;</span><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">artifactId</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">&gt;spring-cloud-starter-alibaba-nacos-discovery&lt;/</span><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">artifactId</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">&gt;</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">      &lt;/</span><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">dependency</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">&gt;</span></span></code></pre></div><h2 id="bootstrap-yml" tabindex="-1">bootstrap.yml <a class="header-anchor" href="#bootstrap-yml" aria-label="Permalink to &quot;bootstrap.yml&quot;">​</a></h2><p>the, we&#39;ll configuration the nacos in project bootstrap.yml, also,you should add dependencies</p><div class="language-xml vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">xml</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">        &lt;</span><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">dependency</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">&gt;</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">          &lt;</span><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">groupId</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">&gt;org.springframework.cloud&lt;/</span><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">groupId</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">&gt;</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">          &lt;</span><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">artifactId</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">&gt;spring-cloud-starter-bootstrap&lt;/</span><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">artifactId</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">&gt;</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">      &lt;/</span><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">dependency</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">&gt;</span></span></code></pre></div><p>edit bootstrap.yml</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>spring:</span></span>
<span class="line"><span>  application:</span></span>
<span class="line"><span>    name: cloud-mall-system-admin-business # setting you application name</span></span>
<span class="line"><span></span></span>
<span class="line"><span>  cloud:</span></span>
<span class="line"><span>    nacos:</span></span>
<span class="line"><span>      discovery:</span></span>
<span class="line"><span>        server-addr: 127.0.0.1:8848 # nacos address</span></span>
<span class="line"><span>        username: nacos</span></span>
<span class="line"><span>        password: nacos</span></span>
<span class="line"><span>        namespace: 8bde195d-0b0d-4c67-9890-0f2c71594581 # namespace id, you call get it it from nacos web page</span></span>
<span class="line"><span>        group: MALL_GROUP # define group</span></span>
<span class="line"><span>        service: \${spring.application.name} # servicename</span></span></code></pre></div><h2 id="add-enablediscoveryclient-annotation" tabindex="-1">add @@EnableDiscoveryClient annotation <a class="header-anchor" href="#add-enablediscoveryclient-annotation" aria-label="Permalink to &quot;add @@EnableDiscoveryClient annotation&quot;">​</a></h2><div class="language-java vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">java</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">@</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">SpringBootApplication</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">@</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">EnableDiscoveryClient</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">public</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;"> class</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;"> SystemAdminApplication</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> {</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">    public</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;"> static</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;"> void</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;"> main</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">String</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">[] </span><span style="--shiki-light:#E36209;--shiki-dark:#FFAB70;">args</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">) {</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">        SpringApplication.</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">run</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(SystemAdminApplication.class,args);</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">    }</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">}</span></span></code></pre></div><h2 id="run" tabindex="-1">run <a class="header-anchor" href="#run" aria-label="Permalink to &quot;run&quot;">​</a></h2><p>when start you project, you can find service has register to nacos.see below: <img src="`+t+'" alt="project"></p>',15),r=[l];function h(c,o,d,k,g,E){return i(),a("div",null,r)}const m=s(p,[["render",h]]);export{u as __pageData,m as default};

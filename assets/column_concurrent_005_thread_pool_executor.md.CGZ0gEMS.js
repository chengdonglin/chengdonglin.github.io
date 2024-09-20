import{_ as a,c as n,o as s,a3 as e}from"./chunks/framework.pgMqRpUO.js";const m=JSON.parse('{"title":"Java 线程池","description":"","frontmatter":{},"headers":[],"relativePath":"column/concurrent/005_thread_pool_executor.md","filePath":"column/concurrent/005_thread_pool_executor.md"}'),t={name:"column/concurrent/005_thread_pool_executor.md"},p=e(`<h1 id="java-线程池" tabindex="-1">Java 线程池 <a class="header-anchor" href="#java-线程池" aria-label="Permalink to &quot;Java 线程池&quot;">​</a></h1><ol><li>一是当执行大量异步任务时线程池能够提供较好的性能。在不使用线程池时，每当需要执行异步任务时直接 new 一个线程来运行，而线程的创建和销毁是需要开销的。线程池里面的线程是可复用的，不需要每次执行异步任务时都重新创建和销毁线程</li><li>二是线程池提供了一种资源限制和管理的手段,比如可以限制线程的个数，动态新增线程等</li></ol><h2 id="线程池的参数解析" tabindex="-1">线程池的参数解析 <a class="header-anchor" href="#线程池的参数解析" aria-label="Permalink to &quot;线程池的参数解析&quot;">​</a></h2><table tabindex="0"><thead><tr><th>参数名</th><th>描述</th></tr></thead><tbody><tr><td>corePoolSize</td><td>核心线程池的大小，如果核心线程池有空闲，新增任务就会呗核心线程池新建一个线程执行，执行完不会销毁线程，线程会进入缓存队列等待再次呗运行</td></tr><tr><td>maximumPoolSize</td><td>线程池能创建最大的线程数量，如果核心线程池和缓存队列都满了，新的任务进来就会创建新的线程来执行，数量不会超过 maximumPoolSize，一般建议设置跟 corePoolSize 一样</td></tr><tr><td>keepAliveTime</td><td>非核心线程能够空闲的最长时间，超过时间，线程终止。这个参数默认只有在线程数量超过核心线程池大小时才会起作用。只要线程数量不超过核心线程大小，就不会起作用</td></tr><tr><td>unit</td><td>时间单位，和 keepAliveTime 配合使用</td></tr><tr><td>workQueue</td><td>缓存队列，用来存放等待被执行的任务</td></tr><tr><td>threadFactory</td><td>线程工程，用来创建线程</td></tr><tr><td>handler</td><td>拒绝策略</td></tr></tbody></table><h2 id="使用案例" tabindex="-1">使用案例 <a class="header-anchor" href="#使用案例" aria-label="Permalink to &quot;使用案例&quot;">​</a></h2><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span></span></span>
<span class="line"><span>@Slf4j</span></span>
<span class="line"><span>public class UploadThreadPool {</span></span>
<span class="line"><span></span></span>
<span class="line"><span></span></span>
<span class="line"><span>    private static final int THREAD_SIZE = 5;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    private static final int QUEUE_SIZE = 100000;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    private static ExecutorService executor = new ThreadPoolExecutor(</span></span>
<span class="line"><span>            THREAD_SIZE,</span></span>
<span class="line"><span>            THREAD_SIZE,</span></span>
<span class="line"><span>            60L,</span></span>
<span class="line"><span>            TimeUnit.SECONDS,</span></span>
<span class="line"><span>            new ArrayBlockingQueue&lt;&gt;(QUEUE_SIZE),</span></span>
<span class="line"><span>            new ThreadFactory() {</span></span>
<span class="line"><span>                @Override</span></span>
<span class="line"><span>                public Thread newThread(Runnable r) {</span></span>
<span class="line"><span>                    Thread thread = new Thread(r);</span></span>
<span class="line"><span>                    thread.setName(&quot;archive-upload-thread&quot;);</span></span>
<span class="line"><span>                    return thread;</span></span>
<span class="line"><span>                }</span></span>
<span class="line"><span>            },</span></span>
<span class="line"><span>            new ThreadPoolExecutor.AbortPolicy()</span></span>
<span class="line"><span>    );</span></span>
<span class="line"><span></span></span>
<span class="line"><span></span></span>
<span class="line"><span>    public static void submit(Runnable task) {</span></span>
<span class="line"><span>        executor.execute(task);</span></span>
<span class="line"><span>    }</span></span>
<span class="line"><span>}</span></span></code></pre></div>`,6),l=[p];function i(r,c,o,d,h,u){return s(),n("div",null,l)}const b=a(t,[["render",i]]);export{m as __pageData,b as default};

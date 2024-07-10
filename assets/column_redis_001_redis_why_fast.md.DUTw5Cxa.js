import{_ as s,c as i,o as a,a3 as t}from"./chunks/framework.pgMqRpUO.js";const e="/assets/redis_store_structure.CzZ7qh8F.png",n="/assets/redis_hash_table.CRS2LeYG.png",l="/assets/sds_str.X_Ws4zVz.png",h="/assets/quicklist.B3N_K0dQ.png",p="/assets/skiplist.B0vcaTD0.png",r="/assets/IO.BM_rK_1s.png",b=JSON.parse('{"title":"Redis Unveiled: Decoding the Secrets Behind Its Blazing Speed","description":"","frontmatter":{},"headers":[],"relativePath":"column/redis/001_redis_why_fast.md","filePath":"column/redis/001_redis_why_fast.md"}'),d={name:"column/redis/001_redis_why_fast.md"},k=t('<h1 id="redis-unveiled-decoding-the-secrets-behind-its-blazing-speed" tabindex="-1">Redis Unveiled: Decoding the Secrets Behind Its Blazing Speed <a class="header-anchor" href="#redis-unveiled-decoding-the-secrets-behind-its-blazing-speed" aria-label="Permalink to &quot;Redis Unveiled: Decoding the Secrets Behind Its Blazing Speed&quot;">​</a></h1><h2 id="memory-implementation" tabindex="-1">Memory Implementation <a class="header-anchor" href="#memory-implementation" aria-label="Permalink to &quot;Memory Implementation&quot;">​</a></h2><p>Redis stores data in memory, bypassing the speed limitations of disk I/O for read and write operations</p><h2 id="efficient-data-structures" tabindex="-1">Efficient data structures <a class="header-anchor" href="#efficient-data-structures" aria-label="Permalink to &quot;Efficient data structures&quot;">​</a></h2><p>The relationship between Redis data structures and their underlying data structures is depicted in the following diagram. <img src="'+e+'" alt="project"></p><h3 id="redis-hash-dict" tabindex="-1">Redis Hash Dict <a class="header-anchor" href="#redis-hash-dict" aria-label="Permalink to &quot;Redis Hash Dict&quot;">​</a></h3><p>Redis essentially functions as a hash table to store all key-value pairs, regardless of the data type, which can be any one of the five types available. The hash table is fundamentally an array where each element is a hash bucket. Regardless of the data type, each bucket contains an entry that stores a pointer to the actual value. <img src="'+n+'" alt="project"></p><p>A database can be conceptualized as a hash table, where the time complexity of a hash table is O(1). This is because calculating the hash value for each key directly provides the corresponding hash bucket location. By locating the entry within the bucket, the corresponding data can be quickly found. This is one of the reasons why Redis is so fast.</p><p>Hash 冲突的解决方案：</p><p>Redis 通过链式哈希解决冲突：也就是同⼀个 桶⾥⾯的元素使⽤链表保存。但是当链表过⻓就会导致查找性能变差可能，所以 Redis 为了追求快，使⽤了两个全局哈希表。⽤于 rehash 操作，增加现有的哈希桶数量，减少哈希冲突。</p><ul><li><p>开始默认使⽤ hash 表 1 保存键值对数据，哈希表 2 此刻没有分配空间。当数据越来多触发 rehash 操作，则执⾏以下操作： a. 给 hash 表 2 分配更⼤的空间； b. 将 hash 表 1 的数据重新映射拷⻉到 hash 表 2 中； c. 释放 hash 表 1 的空间。</p></li><li><p>将 hash 表 1 的数据重新映射到 hash 表 2 的过程中并不是⼀次性的，这样会造成 Redis 阻塞，⽆法提供服务。⽽是采⽤了渐进式 rehash，每次处理客户端请求的时候，先从 hash 表 1 中第⼀个索引开始，将这个位置的 所有数据拷⻉到 hash 表 2 中，就这样将 rehash 分散到多次请求过程中，避免耗时阻塞。</p></li></ul><h3 id="sds-简单动态字符" tabindex="-1">SDS 简单动态字符 <a class="header-anchor" href="#sds-简单动态字符" aria-label="Permalink to &quot;SDS 简单动态字符&quot;">​</a></h3><p>redis 针对 c 语言的字符串上重新设计，增加了一些功能，SDS 动态字符串结构如下： <img src="'+l+`" alt="project"></p><ul><li>O(1)时间复杂度获取字符串长度</li></ul><p>SDS 中用 len 记录了字符串的长度，只需要 O(1)时间复杂度，而 C 语言中要获取字符串长度，需要循环整个字符串，时间复杂度为 O(N)</p><ul><li>空间预分配</li></ul><p>SDS 修改之后程序不仅会为 SDS 分配所需要的必须空间，还会分配额外的未使⽤空间。 分配规则如下：对 SDS 修改，len 的长度小于 1M，那么同时会分配相同长度未使用空间，例如：如果字符串长度为 10，重新分配之后，buf 长度会变成 10(已使用空间) + 10(额外空间) + 1(空字符串) = 21.如果对 SDS 修改长度大于 1M，那么就分配 1M 未使用空间</p><ul><li>惰性空间释放</li></ul><p>对 SDS 进行缩短操作时，程序不会回收多余的内存空间，而是使用 free 字段将这些字节数量记录下来不释放，后面需要 append 操作，直接使用 free 未使用的空间，减少内存的分配</p><h3 id="ziplist-压缩列表" tabindex="-1">zipList 压缩列表 <a class="header-anchor" href="#ziplist-压缩列表" aria-label="Permalink to &quot;zipList 压缩列表&quot;">​</a></h3><p>压缩列表是 List 、hash、 sorted Set 三种数据类型底层实现之⼀。</p><div class="language-c vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">c</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">struct</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> ziplist</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">&lt;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">T</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">&gt;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> {</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">    int32 zlbytes;</span><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;"> // 整个压缩列表占用字节数</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">    int32 zltail_offset;</span><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;"> // 最后⼀个元素距离压缩列表起始位置的偏移量，⽤于快速定位到最后⼀个节点</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">    int16 zllength;</span><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;"> // 元素个数</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">    T</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">[]</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> entries;</span><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;"> // 元素内容列表</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">    int8 zlend;</span><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;"> // 标志压缩列表的结束，值为0XFF</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">}</span></span></code></pre></div><p>ziplist 有一序列特殊编码的连续内存块组成的顺序型数据结构，ziplist 中可以包含多个 entry 节点，每个节点可以存放整数或者字符串 ziplist 在表头有三个字段 zlbytes、zltail 和 zllen，分别表示列表占⽤字节数、列表尾的偏移量和列表中的 entry 个数；压缩列表在表尾还有⼀个 zlend，表示列表结束。 需要定义第一个元素和最后一个元素，可以通过表头三个字段的长度直接定位，复杂度为 O(1),查询其他元素，就只能逐个查找，复杂度为 O(N)</p><h3 id="双端列表" tabindex="-1">双端列表 <a class="header-anchor" href="#双端列表" aria-label="Permalink to &quot;双端列表&quot;">​</a></h3><p>Redis List 数据类型通常被⽤于队列、微博关注⼈时间轴列表等场景。不管是先进先出的队列，还是先进后出的栈，双端列表都很好的⽀持这些特性</p><div class="language-c vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">c</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">typedef</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;"> struct</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> list {</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">  listNode </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">*</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">head;</span><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;"> //表头节点</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">  listNode </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">*</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">tail;</span><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;"> // 表尾节点</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">  unsigned</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;"> long</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> len;</span><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;"> // 链表包含的节点数量</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">  void</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> (</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">*</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">dup)(</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">void</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;"> *</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">ptr);</span><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;"> // 节点值复制函数</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">  void</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> (</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">*</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">free)(</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">void</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;"> *</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">ptr)；</span><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">// 节点值释放函数</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">  int</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> (</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">*</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">match)(</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">void</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;"> *</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">ptr,</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">void</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;"> *</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">key)；</span><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">// 节点值对比函数</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">}</span></span></code></pre></div><p>特性：</p><ol><li>双端：链表节点带 prev 和 next 指针，获取某个节点的前置节点和后置节点复杂度是 O(1)</li><li>无环：表头节点的 prev 指针和表尾节点的 next 指针都指向 NULL，对链表的访问以 NULL 为终点</li><li>带表头指针和表尾指针通过 list 结构的 head 指针和 tail 指针，程序获取链表的表头节点和表尾节点的复杂度 O(1)</li><li>带链表⻓度计数器：程序使⽤ list 结构的 len 属性来对 list 持有的链表节点进⾏计数，程序获取链表中节点数量的复杂度为 O（1）</li><li>多态：：链表节点使⽤ void* 指针来保存节点值，并且可以通过 list 结构的 dup、free、match 三个属性为节点值设置类型特定函数，所以链表可以⽤于保存各种不同类型的值</li></ol><p>后续版本对列表数据结构进⾏了改造，使⽤ quicklist 代替了 ziplist 和 linkedlist。 quicklist 是 ziplist 和 linkedlist 的混合体，它将 linkedlist 按段切分，每⼀段使⽤ ziplist 来紧凑存储，多个 ziplist 之间使⽤双向指针串接起来。 <img src="`+h+'" alt="project"></p><h3 id="skiplist-跳表" tabindex="-1">skipList 跳表 <a class="header-anchor" href="#skiplist-跳表" aria-label="Permalink to &quot;skipList 跳表&quot;">​</a></h3><p>sorted set 类型的排序功能便是通过「跳跃列表」数据结构来实现 跳跃表（skiplist）是⼀种有序数据结构，它通过在每个节点中维持多个指向其他节点的指针，从⽽达到快速访问节点的目的 跳跃表⽀持平均 O（logN）、最坏 O（N）复杂度的节点查找，还可以通过顺序性操作来批量处理节点 跳表在链表的基础上，增加了多层级索引，通过索引位置的⼏个跳转，实现数据的快速定位，如下图所示： <img src="'+p+`" alt="project"></p><h3 id="整数数组-intset" tabindex="-1">整数数组（intset） <a class="header-anchor" href="#整数数组-intset" aria-label="Permalink to &quot;整数数组（intset）&quot;">​</a></h3><p>当一个集合只包含整数型元素，元素不多时， redis 就会使用整数集合为集合键的底层实现</p><div class="language-c vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">c</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">typedef</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;"> struct</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> intset {</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">    uint32_t</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> encoding;</span><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;"> //编码方式</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">    uint32_t</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> length;</span><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;"> // 集合包含的元素数量</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">    int8_t</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> contents</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">[]</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">;</span><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;"> // 保存元素的数组</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">}</span></span></code></pre></div><p>contents 数组是整数集合的底层实现：整数集合的每个元素都是 contents 数组的⼀个数组项（item），各个项在数组中按值的⼤⼩从⼩到⼤有序地排列，并且数组中不包含任何重复项。length 属性记录了整数集合包含的元素数量，也即是 contents 数组的⻓度。</p><h2 id="单线程模型" tabindex="-1">单线程模型 <a class="header-anchor" href="#单线程模型" aria-label="Permalink to &quot;单线程模型&quot;">​</a></h2><p>Redis 单线程指的是 Redis 的网络 IO 以及键值对指令读写是由一个线程来执行。但是 Redis 持久化，集群数据同步，异步删除都是其他线程执行 单线程模型的好处：</p><ol><li>不会因为线程创建导致性能消耗</li><li>避免上下文切换引起的 CPU 消耗，没有多线程切换的开销</li><li>避免了线程之间的竞争问题</li></ol><p>单线程是基于内存财政，CPU 不是 Redis 的瓶颈，Redis 瓶颈最有可能是机器内存的大小或者网络带宽。参考<a href="https://redis.io/docs/latest/develop/get-started/faq/" target="_blank" rel="noreferrer">https://redis.io/docs/latest/develop/get-started/faq/</a></p><h2 id="i-o-多路复用模型" tabindex="-1">I/O 多路复用模型 <a class="header-anchor" href="#i-o-多路复用模型" aria-label="Permalink to &quot;I/O 多路复用模型&quot;">​</a></h2><p><img src="`+r+'" alt="project"> Redis 线程不会阻塞在某⼀个特定的监听或已连接套接字上，也就是说，不会阻塞在某⼀个特定的客户端请求处理上。正因为此，Redis 可以同时和多个客户端连接并处理请求，从⽽提升并发性</p>',41),o=[k];function c(g,E,y,u,D,m){return a(),i("div",null,o)}const A=s(d,[["render",c]]);export{b as __pageData,A as default};

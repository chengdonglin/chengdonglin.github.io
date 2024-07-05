import{_ as s,c as a,o as i,a3 as e}from"./chunks/framework.pgMqRpUO.js";const n="/assets/kakfa_product_consumer.IUuaVbGd.png",t="/assets/kafka_consumer_detail.Umg890Fc.png",F=JSON.parse('{"title":"Kafka Basic Operator","description":"","frontmatter":{},"headers":[],"relativePath":"column/kafka/002_kafka_basic_operator.md","filePath":"column/kafka/002_kafka_basic_operator.md"}'),p={name:"column/kafka/002_kafka_basic_operator.md"},l=e(`<h1 id="kafka-basic-operator" tabindex="-1">Kafka Basic Operator <a class="header-anchor" href="#kafka-basic-operator" aria-label="Permalink to &quot;Kafka Basic Operator&quot;">​</a></h1><pre><code>In these tutorial, kafka cmd tool is direct and effective.

before operator the cmd, we should enter kafka container by next bash
</code></pre><div class="language-bash vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">bash</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">   docker</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> exec</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> -it</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> 066d6fbce8cb</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> sh</span></span></code></pre></div><h3 id="create-topic" tabindex="-1">create topic <a class="header-anchor" href="#create-topic" aria-label="Permalink to &quot;create topic&quot;">​</a></h3><p>The next cmd will create a topic name test.</p><div class="language-bash vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">bash</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">kafka-topics.sh</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> --zookeeper</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> zookeeper:2181</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> --create</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> --topic</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> test</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> --partitions</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> 2</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> --replication-factor</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> 1</span></span></code></pre></div><h3 id="list-topic" tabindex="-1">List Topic <a class="header-anchor" href="#list-topic" aria-label="Permalink to &quot;List Topic&quot;">​</a></h3><div class="language-bash vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">bash</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">kafka-topics.sh</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> --zookeeper</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> zookeeper:2181</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> --list</span></span></code></pre></div><p>this cmd will show all the topic names.</p><p>also, if we want to see the topic more detail, we can exec next cmd:</p><div class="language-bash vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">bash</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">kafka-topics.sh</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> --zookeeper</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> zookeeper:2181</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> --describe</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> --topic</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> test</span></span></code></pre></div><p>will show info</p><div class="language-text vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">text</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>Topic: test     TopicId: VlyyjZkrTcO54GHlK5HRyw PartitionCount: 2       ReplicationFactor: 1    Configs:</span></span>
<span class="line"><span>        Topic: test     Partition: 0    Leader: 1       Replicas: 1     Isr: 1</span></span>
<span class="line"><span>        Topic: test     Partition: 1    Leader: 1       Replicas: 1     Isr: 1</span></span></code></pre></div><h3 id="message-product-and-consumer" tabindex="-1">Message Product And Consumer <a class="header-anchor" href="#message-product-and-consumer" aria-label="Permalink to &quot;Message Product And Consumer&quot;">​</a></h3><p>client listener</p><div class="language-bash vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">bash</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">./kafka-console-consumer.sh</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> --bootstrap-server</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> localhost:9092</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> --topic</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> test</span></span></code></pre></div><p>create another client to product message</p><div class="language-bash vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">bash</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">kafka-console-producer.sh</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> --broker-list</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> localhost:9092</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> --topic</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> test</span></span></code></pre></div><p>now, we can test product and consumer message</p><p><img src="`+n+'" alt="project"></p><h3 id="consumer-offset-detail" tabindex="-1">Consumer offset detail <a class="header-anchor" href="#consumer-offset-detail" aria-label="Permalink to &quot;Consumer offset detail&quot;">​</a></h3><div class="language-bash vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">bash</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">kafka-consumer-groups.sh</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> --bootstrap-server</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> kafka-1:9092</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> --describe</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> --group</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> aaa</span></span></code></pre></div><p>aaa is means group name, then we can see the detail</p><p><img src="'+t+`" alt="project"></p><h2 id="kafka-meta-data" tabindex="-1">Kafka Meta Data <a class="header-anchor" href="#kafka-meta-data" aria-label="Permalink to &quot;Kafka Meta Data&quot;">​</a></h2><p>if we want see kafka Meta Data, we can enter zookeeper container</p><div class="language-bash vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">bash</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">docker</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> exec</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> -it</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> e6feccc5166b</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> bash</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">./bin/zkCli.sh</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">ls</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> /</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">ls</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> /brokers</span></span></code></pre></div><p>detail</p><div class="language-text vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">text</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>[seqid, topics, ids]</span></span></code></pre></div><div class="language-bash vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">bash</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">ls</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> /brokers/ids</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">[1]</span></span></code></pre></div><p>broker info</p><div class="language-bash vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">bash</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">get</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> /brokers/ids/1</span></span></code></pre></div><div class="language-text vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">text</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>{&quot;features&quot;:{},&quot;listener_security_protocol_map&quot;:{&quot;PLAINTEXT&quot;:&quot;PLAINTEXT&quot;},&quot;endpoints&quot;:[&quot;PLAINTEXT://10.32.1.200:9092&quot;],&quot;jmx_port&quot;:-1,&quot;port&quot;:9092,&quot;host&quot;:&quot;10.32.1.200&quot;,&quot;version&quot;:5,&quot;timestamp&quot;:&quot;1720082796829&quot;}</span></span>
<span class="line"><span>cZxid = 0x19</span></span>
<span class="line"><span>ctime = Thu Jul 04 08:46:36 UTC 2024</span></span>
<span class="line"><span>mZxid = 0x19</span></span>
<span class="line"><span>mtime = Thu Jul 04 08:46:36 UTC 2024</span></span>
<span class="line"><span>pZxid = 0x19</span></span>
<span class="line"><span>cversion = 0</span></span>
<span class="line"><span>dataVersion = 1</span></span>
<span class="line"><span>aclVersion = 0</span></span>
<span class="line"><span>ephemeralOwner = 0x1000087a5a10000</span></span>
<span class="line"><span>dataLength = 206</span></span>
<span class="line"><span>numChildren = 0</span></span></code></pre></div><p>topic and partitions info</p><div class="language-text vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">text</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>[zk: localhost:2181(CONNECTED) 5] ls /brokers/topics</span></span>
<span class="line"><span>[test, __consumer_offsets]</span></span>
<span class="line"><span>[zk: localhost:2181(CONNECTED) 6] ls /brokers/topics/test</span></span>
<span class="line"><span>[partitions]</span></span>
<span class="line"><span>[zk: localhost:2181(CONNECTED) 7] ls /brokers/topics/test/partitions</span></span>
<span class="line"><span>[0, 1]</span></span>
<span class="line"><span>[zk: localhost:2181(CONNECTED) 8] ls /brokers/topics/test/partitions/0</span></span>
<span class="line"><span>[state]</span></span>
<span class="line"><span></span></span>
<span class="line"><span>[zk: localhost:2181(CONNECTED) 18] get /brokers/topics/test/partitions/0/state</span></span>
<span class="line"><span>{&quot;controller_epoch&quot;:1,&quot;leader&quot;:1,&quot;version&quot;:1,&quot;leader_epoch&quot;:0,&quot;isr&quot;:[1]}</span></span>
<span class="line"><span>cZxid = 0xb0</span></span>
<span class="line"><span>ctime = Tue Jan 05 05:56:06 GMT 2021</span></span>
<span class="line"><span>mZxid = 0xb0</span></span>
<span class="line"><span>mtime = Tue Jan 05 05:56:06 GMT 2021</span></span>
<span class="line"><span>pZxid = 0xb0</span></span>
<span class="line"><span>cversion = 0</span></span>
<span class="line"><span>dataVersion = 0</span></span>
<span class="line"><span>aclVersion = 0</span></span>
<span class="line"><span>ephemeralOwner = 0x0</span></span>
<span class="line"><span>dataLength = 72</span></span>
<span class="line"><span>numChildren = 0</span></span></code></pre></div>`,35),o=[l];function h(c,r,k,d,u,g){return i(),a("div",null,o)}const C=s(p,[["render",h]]);export{F as __pageData,C as default};
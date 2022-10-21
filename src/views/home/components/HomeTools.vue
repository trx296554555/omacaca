<template>
	<div id="HomeTools" class="HomeTools">
		<div class="title">Research Tools</div>
		<div class="content">
			<div class="col-span-1">
				<div class="subtitle">
					<tool-outlined />
					<p>在线工具</p>
				</div>
				<ul>
					<li>
						<a href="https://biit.cs.ut.ee/gprofiler/gost" target="_blank"
							>Function Enrichment (g:Profiler)
						</a>
					</li>
					<li>
						<a href="https://biodbnet-abcc.ncifcrf.gov/db/db2db.php" target="_blank"
							>ID Convert (bioDBnet)
						</a>
					</li>
					<li>
						<a href="https://biodbnet-abcc.ncifcrf.gov/db/db2db.php" target="_blank"
							>Tree Visualization (ITOL)
						</a>
					</li>
					<li>
						<a
							href="https://cn.string-db.org/cgi/input?sessionId=bsWjw2PtflBX&input_page_show_search=on"
							target="_blank"
						>
							PPI Network (STRING)
						</a>
					</li>
					<li>
						<a href="http://www.ehbio.com/test/venn/#/" target="_blank"
							>Venn Plot (Evenn)</a
						>
					</li>
					<li>
						<a href="https://tool.lu/" target="_blank">Tool Box (tools)</a>
					</li>
				</ul>
			</div>
			<div class="col-span-1">
				<div class="subtitle">
					<hdd-outlined />
					<p>集群管理</p>
				</div>
				<ul>
					<li>
						<a href="https://http://222.18.10.6:404/" target="_blank"
							>服务器集群登录（校园网）
						</a>
					</li>
					<li>
						<a href="http://192.168.199.228/core/auth/login/" target="_blank"
							>服务器集群管理（内网）</a
						>
					</li>
					<li>
						<a href="http://192.168.199.228:3000/login" target="_blank"
							>服务器集群监控（内网）</a
						>
					</li>
					<li>
						<a
							href="https://sculife404wukongnas.cn3.quickconnect.cn/#/signin"
							target="_blank"
							>储存服务器访问-WukongNas</a
						>
					</li>
					<li>
						<a
							href="https://sculife404pandanas.cn4.quickconnect.cn/#/signin"
							target="_blank"
							>储存服务器访问-PandaNas</a
						>
					</li>
					<li>
						<a
							href="https://sculife404shukenas.quickconnect.cn/#/signin"
							target="_blank"
							>储存服务器访问-ShukeNas</a
						>
					</li>
				</ul>
			</div>
			<div class="col-span-1">
				<div class="subtitle">
					<link-outlined />
					<p>友情链接</p>
				</div>
				<ul>
					<li><a href="http://uprobiotics.cn/" target="_blank">益生菌产学研联盟</a></li>

					<li><a href="https://www.littleming.ml/" target="_blank">小明网盘</a></li>

					<li>
						<a href="http://big.cdu.edu.cn/macsnvdb/" target="_blank"
							>Macaque SNV Database</a
						>
					</li>
				</ul>
			</div>
		</div>
	</div>
</template>
<script setup lang="ts">
import { ToolOutlined, HddOutlined, LinkOutlined } from '@ant-design/icons-vue'
</script>

<style scoped lang="less">
.HomeTools {
	@apply text-justify;
	@apply py-12 px-10 md:px-36 text-center 2xl:text-left;

	.title {
		@apply font-sans text-left pb-8 text-2xl;
		color: @primary-color;
	}

	.content {
		@apply grid grid-cols-1 md:grid-cols-3 gap-8;
		.subtitle {
			@apply uppercase text-lg font-medium mb-2 flex items-center justify-center md:justify-start;
			color: @primary-color;
			p {
				margin-left: 0.5rem;
			}
		}
		li {
			@apply mb-2;
		}
		a {
			@apply text-black dark:text-dark-w-first;
		}
		a:hover {
			text-decoration: underline;
			color: @primary-color;
		}
	}
}
</style>

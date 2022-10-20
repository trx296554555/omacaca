<template>
	<div id="HomeTools" class="HomeTools">
		<div class="title">Research Tools</div>
		<div class="content">
			<div class="col-span-1">
				<p class="subtitle">在线工具</p>
			</div>
			<div class="col-span-1">
				<p class="subtitle">集群管理</p>
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
				<p class="subtitle">友情链接</p>
				<ul>
					<li><a href="http://uprobiotics.cn/" target="_blank">益生菌产学研联盟</a></li>

					<li><a href="https://www.littleming.ml/" target="_blank">小明网盘</a></li>
				</ul>

				<a href="http://big.cdu.edu.cn/macsnvdb/" target="_blank">Macaque SNV Database</a>
			</div>
		</div>
	</div>
</template>

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
			@apply uppercase text-lg font-medium mb-2 flex justify-center md:justify-start;
			color: @primary-color;
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

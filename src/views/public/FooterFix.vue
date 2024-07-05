<template>
	<footer id="Footer" class="FooterBg">
		<div class="Footer">
			<div class="foot-link grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-8 py-2">
				<div class="col-span-2">
					<p
						class="uppercase text-xl font-semibold mb-4 flex justify-center md:justify-start"
					>
						{{ $t("footer.research") }}
					</p>
					<router-link to="/ltbm">Long-term Tracking of Baby Macaque</router-link>
					<a href="#!">Gene Expression Features of Breast-feeding Rhesus Macaque</a>
					<a href="#!">Sex-specific Gene Expression of Four Primates</a>
					<router-link to="/main-out">Persistent Diarrhoea in Rhesus Macaque</router-link>
				</div>

				<div class="col-span-2 lg:col-span-1">
					<p
						class="uppercase text-xl font-semibold mb-4 flex justify-center md:justify-start"
					>
						{{ $t("footer.resources") }}
					</p>
					<div class="grid grid-cols-2">
						<a href="https://db.cngb.org/" target="_blank">CNGB</a>
						<a href="https://www.ncbi.nlm.nih.gov/genbank/" target="_blank">NCBI</a>
						<a href="https://asia.ensembl.org/index.html" target="_blank">Ensembl</a>
						<a href="https://www.gsea-msigdb.org/gsea/msigdb" target="_blank">GSEA</a>
						<a href="https://www.ebi.ac.uk/QuickGO/" target="_blank">Quick GO</a>
						<a href="https://www.genome.jp/kegg/" target="_blank">KEGG</a>
						<a href="https://www.uniprot.org/" target="_blank">UniPort</a>
					</div>
				</div>

				<div class="col-span-2 flex flex-wrap content-center justify-center md:justify-start">
					<a
						href="https://beian.miit.gov.cn/#/Integrated/index"
						style="margin-bottom: 0; display: inline; font-size: 1.5rem"
						target="_blank"
					>蜀ICP备2021011041号-2</a>
<!--					<a href="https://life.scu.edu.cn/klbeme/" target="_blank"-->
<!--					>{{ $t("footer.lab1") }}</a-->
<!--					>-->
<!--					<a-->
<!--						href="http://www.panda.org.cn/china/research/importance/2013-01-10/52.html"-->
<!--						target="_blank"-->
<!--					>{{ $t("footer.lab2") }}</a-->
<!--					>-->
<!--					<p>-->
<!--						Copyright © 2015-2022 Sichuan University. All Rights Reserved.-->
<!--						<a-->
<!--							href="https://beian.miit.gov.cn/#/Integrated/index"-->
<!--							style="margin-bottom: 0; display: inline; font-size: 0.5rem"-->
<!--							target="_blank"-->
<!--						>蜀ICP备2021011041号-2</a-->
<!--						>-->
<!--						{{ $t("footer.location") }}-->
<!--					</p>-->
				</div>
			</div>
			<div class="foot-tools grid grid-cols-1 md:grid-cols-2 border-t border-gray-300 pt-6">
				<div class="hidden md:block">
					<!--						<img src="@img/homeFig/scu.logo.png" style="height: 5rem" alt="scuLogo" />-->
				</div>
				<div class="grid grid-rows-2">
					<div class="flex justify-center md:justify-end">
						<ChangeLocale class="mx-4 w-7 h-7"></ChangeLocale>
						<ChangeTheme class="mx-4 w-8 h-8"></ChangeTheme>
						<a-tooltip trigger="click">
							<template #title><img class="w-24 h-24"
												  src="@img/homeFig/wechatCode.jpg"
												  alt="wechat-qrcode" /></template>
							<a id="wechat-link" href="" @click.prevent>
								<WechatOutlined id="wechat-icon" class="bottom-icon" />
							</a>
						</a-tooltip>
						<a href="https://github.com/trx296554555/omacaca" target="_blank">
							<GithubOutlined id="github-icon" class="bottom-icon" />
						</a>
					</div>
					<div class="flex justify-center md:justify-end items-center">
						<router-link to="/aboutus">{{ $t("footer.aboutUs") }}</router-link>
						<router-link to="/contact">{{ $t("footer.contactUs") }}</router-link>
						<a href="https://www.scu.edu.cn/"
						   target="_blank">{{ $t("footer.sichuanUniversity") }}</a>
						<router-link to="/help">{{ $t("footer.help") }}</router-link>
					</div>
				</div>
			</div>
		</div>
	</footer>
</template>


<script setup lang="ts">
import { useCheckErrorPageStore } from "@/store/modules/isErrorPage";
import { GithubOutlined, WechatOutlined } from "@ant-design/icons-vue";

// 自定义的404页面不显示footer
const isErrorStore = useCheckErrorPageStore();

</script>

<style scoped lang="less">
.FooterBg {
	background-color: @primary-color;
}
.Footer {
	@apply Container py-6;
	@apply text-center lg:text-left text-gray-100;
	transition: all 0.2s ease-in-out 0.2s;
}

.foot-link {
	a {
		@apply block text-gray-100 dark:text-dark-w-first hover:underline mb-3;
	}
}
.foot-tools > * {
	a {
		@apply block text-gray-100 dark:text-dark-w-first text-base md:text-lg hover:underline mx-3 md:mx-4 ;
	}
}

.bottom-icon {
	font-size: 2rem;
}
#wechat-link{
	position: relative;
	& img {
		height: 6rem;
		width: 6rem;
		position: absolute;
		top: -200%;
		overflow: hidden;
	}
}
#wechat-icon:hover {
	color: #26d86f;

}
#github-icon:hover{
	color: #0d1118;
}

</style>

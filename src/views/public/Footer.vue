<template>
	<div id="Footer" v-show="!isErrorStore.isError">
		<footer class="px-0 2xl:px-16 text-center 2xl:text-left bg-primary text-gray-100">
			<div class="mx-6 py-6 text-center md:text-left">
				<div class="foot-link grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-8 py-2">
					<div class="col-span-2">
						<p
							class="uppercase text-xl font-semibold mb-4 flex justify-center 2xl:justify-start"
						>
							projects
						</p>
						<a href="#!">Long-term Tracking of Baby Macaque</a>
						<a href="#!">Gene Expression Features of Breast-feeding Rhesus Macaque</a>
						<a href="#!">Sex-specific Gene Expression of Four Primates</a>
						<a href="#!">Persistent Diarrhoea in Rhesus Macaque</a>
					</div>

					<div class="col-span-2 lg:col-span-1">
						<p
							class="uppercase text-xl font-semibold mb-4 flex justify-center md:justify-start"
						>
							Resources
						</p>
						<div class="grid grid-cols-2">
							<a href="https://db.cngb.org/" target="_blank">CNGB</a>
							<a href="https://www.ncbi.nlm.nih.gov/genbank/" target="_blank">NCBI</a>
							<a href="http://asia.ensembl.org/index.html" target="_blank">Ensembl</a>
							<a href="https://www.gsea-msigdb.org/gsea/msigdb" target="_blank">GSEA</a>
							<a href="https://www.ebi.ac.uk/QuickGO/" target="_blank">Quick GO</a>
							<a href="https://www.genome.jp/kegg/" target="_blank">KEGG</a>
							<a href="https://www.uniprot.org/" target="_blank">UniPort</a>
						</div>
					</div>

					<div class="col-span-2 flex flex-wrap content-center">
						<a href="https://life.scu.edu.cn/klbeme/" target="_blank"
						>Key Laboratory of Bio-Resources and Eco-Environment of Ministry of
							Education</a
						>
						<a
							href="http://www.panda.org.cn/china/research/importance/2013-01-10/52.html"
							target="_blank"
						>Sichuan Key Laboratory of Conservation Biology for Endangered Wildlife</a
						>
						<p>
							Copyright © 2021 Sichuan University. All Rights Reserved.
							<a
								href="https://beian.miit.gov.cn/#/Integrated/index"
								style="margin-bottom: 0; display: inline; font-size: 0.5rem"
								target="_blank"
							>蜀ICP备2021011041号-1</a
							>
							No.29 Wangjiang Road, Chengdu, Sichuan, China, 610064
						</p>
					</div>
				</div>
				<div class="foot-tools grid grid-cols-2 border-t border-gray-300 pt-6">
					<div class="hidden md:block">
						<img src="@img/homeFig/scu.logo.png" style="height: 5rem" alt="SCU" />
					</div>
					<div class="grid grid-rows-2">
						<div class="flex justify-center lg:justify-end">
							<ChangeLocale class="mx-4 w-7 h-7"></ChangeLocale>
							<ChangeTheme class="mx-4 w-8 h-8"></ChangeTheme>
							<a-tooltip trigger="click">
								<template #title><img class="w-24 h-24" src="@img/homeFig/wechatCode.jpg" alt="wechat-qrcode"/></template>
								<a id="wechat-link" href="" @click.prevent>
									<WechatOutlined id="wechat-icon" class="bottom-icon"/>
								</a>
							</a-tooltip>
							<a href="https://github.com/trx296554555/omacaca" target="_blank">
								<GithubOutlined id="github-icon" class="bottom-icon" />
							</a>
						</div>
						<div class="flex justify-center lg:justify-end items-center">
							<a class="" href="" @click.prevent="toAbtus()">About us</a>
							<a href="" @click.prevent="toCttus()">Contact us</a>
							<a href="https://www.scu.edu.cn/" target="_blank">Sichuan University</a>
							<a href="" @click.prevent="toCttus()">Help</a>
						</div>
					</div>
				</div>
			</div>
		</footer>
	</div>
</template>


<script setup lang="ts">
import {useI18n} from 'vue-i18n'
import {useRouter} from 'vue-router'
import {useCheckErrorPageStore} from '@/store/modules/isErrorPage'
import ChangeLocale from '@/components/ChangeLocale.vue';
import ChangeTheme from '@/components/ChangeTheme.vue';
import { GithubOutlined, WechatOutlined } from '@ant-design/icons-vue'

const isErrorStore = useCheckErrorPageStore()

const toLtgem = () => {
	router.push('/Ltgem')
}
const toAbtus = () => {
	router.push('/AboutUs')
}
const toCttus = () => {
	router.push('/ContactUs')
}

const {
	locale
} = useI18n()
const changeLang = () => {
	console.log('test')
	// locale.value = lang
}
</script>

<style lang="less" scoped>
.foot-link {
	a {
		@apply block text-gray-100 hover:underline mb-3;
	}
}
.foot-tools > * {
	a {
		@apply block text-gray-100 text-lg hover:underline mx-3 md:mx-4 ;
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

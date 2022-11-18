export default {
	ltbm_title: {
		project: '长期追踪猕猴幼崽组学变化',
		home: '首页',
		introduction: '简介',
		transcriptomics: '转录组分析',
		metagenomics: '宏基因组分析',
		co_analysis: '联合分析',
		csa: '基因差异表达分析（横向）',
		lma: '基因表达聚类分析（纵向）',
		deg: '基因差异表达分析',
		ora: '过表达富集分析',
		gsea: '基因集富集分析',
		tsa: '时间序列分析',
		vpa: '方差分解分析',
		wgcna: '加权基因共表达网络分析',
	},
	ltbm_introduction: {
		background: '背景',
		background1:
			'几十年来，对衰老过程和其对寿命限制的理解一直是生物学家们研究的热门课题，对人类衰老机制的研究已经进行了很长时间。\
		30年前，通过识别延长多细胞模式生物寿命的基因变异，衰老生物学获得了前所未有的进步。并且随着时代和技术的发展，研究者们对衰老机制的理解愈发的深入，\
		我们认为现今对衰老过程的研究正进入一个具有独特医学、商业和社会影响的新时代。而我们研究衰老相关机制的最终目的是进行临床转化与应用。\
		(Figure: Timeline of ageing research, Judith Campisi et.al., Nature, 2019)',
		background2:
			'过去30年的衰老研究已经从识别衰老表型转变为研究这些表型背后的遗传途径。衰老遗传学研究揭示了细胞内信号通路和高阶过程相互作用的复杂网络。\
		许多已经确定的途径和过程，如饮食限制，在对环境变化的体内平衡反应中是至关重要的。',
		background3:
			'而发掘衰老相关的调控通路是了解衰老机制的关键，低等动物模型的系统结构相对简单，在探索衰老机制方面有一定的优势，但在临床转化方面却存在很大的差距。\
		同时由于生物体和外界环境有连续不断且复杂的互作；而在人类实验当中又很难做到大规模的实验变量控制，不同人种、生活环境、饮食习惯、健康状况等因素都会对衰老过程造成影响，\
		这使得挑选一种合适的生物模型，来构建衰老机制和人类临床转化的良性关系就显得十分重要。',
		background4:
			'猕猴属动物与人类有很近的亲缘关系，相对于大小鼠、兔子等是更优的动物模型。其中的猕猴很早就应用到医学研究中，\
		是目前人类疾病研究和临床药物开发中最重要的非人灵长类模式动物。',
		description: '描述',
		description1:
			'本课题组由四川大学生物资源与生态环境教育部重点实验室与四川省濒危野生动物保护生物学重点实验室共同支持，\
		主要研究方向为圈养猕猴衰老过程中，基因表达的模式，基因表达调控的分子机制，以及猕猴体内微生物与宿主协同进化的机理。\
		我们对圈养猕猴进行了长期跟踪采样，监控其生长发育过程中的各项指标以及环境信息，\
		并获取到大量猕猴血液转录组、口腔及肠道宏基因组、代谢组等组学数据样本，\
		通过生物信息学的手段对相应数据进行分析，进而探讨猕猴在衰老过程中的基因表达变化，鉴定与衰老密切相关的基因和信号通路。',
		description2:
			'重点关注与人类心脑血管疾病、免疫等相关的基因表达变化，再与人类中的研究结果进行详细比较分析，\
		最终结合分子生物学实验和测量血常规、凝血等指标，揭示衰老对猕猴和人类基因表达影响的共性和差异性，\
		为猕猴在人类衰老研究领域的应用和建立适合的衰老模型提供分子数据支持，进而为实现圈养猕猴资源高质量发展提供有力支撑。',
		user_guide: '用户指南',
		version: '版本',
		version1: '2022-01-22 初次完成了网站的搭建，仅提供了基因表达数据',
		version2: '2022-10-01 重构了前端UI，与后端的API框架',
		version3: '2022-11-01 新增了宏基因组数据',
		stagea: '第一次采样，21只小猴与母猴一起生活在成年圈；小猴饮食以母乳为主，可能捡食大猴的食物。',
		stageanote: '当天的采样结束后，21只小猴与母猴分开，集中在一个大笼。',
		stagem: '第一次采集小猴样本的同时，还采集了各小猴母亲的样本；母猴生活在成年圈，食用成年饲料与当季新鲜水果。',
		stageb: '第二次采样，21只小猴集中生活在一个大笼（小猴幼儿园）；饮食配方为幼猴饲料+水果+奶粉。',
		stagec: '第三次采样，21只小猴集中生活在一个大笼（小猴幼儿园）；饮食配方为幼猴饲料+水果+奶粉。',
		stagecnote: '当天的采样结束后，开始停止喂食奶粉，并转移到兽医室小笼(2只一个笼)',
		staged: '第四次采样，每2只小猴生活在一个小笼；饮食配方为幼猴饲料+水果+特殊添加剂。',
		stagednote:
			'特殊添加剂包括：健脾糕片 0.8g + 复合VB 0.1g + VC 0.1g，有时再额外加：干酵母片 1片。于11月15日开始添加，至12月01日停止添加。',
		stagee: '第五次采样，每2只小猴生活在一个小笼；饮食配方为幼猴饲料+水果。',
		stagef: '第六次采样，21只小猴又回到大笼中（小猴幼儿园），但与二三次相比密度更低；饮食配方也更换为新的定制幼猴饲料+水果。',
		stagefnote:
			'视生长发育情况，其中17只小猴于2020年3月11日转移并集中在编号12-3大笼，2只于3月底分别转移到编号11-1与11-3的大笼。\
		而另外两只BCR03、BCR20在采样期间因为出现腹泻，在兽医室小笼中治疗， 取样前与取样当日未用药，康复中，但明显体型变得消瘦，身体弱。',
		stageg: '第七次采样，21只小猴生活在大笼中（小猴幼儿园）；饮食配方为新的定制幼猴饲料+水果。',
		stagegnote: '之前出现腹泻，并在治疗中的两只小猴BCR03、BCR20在这次采样前已经死亡。',
		stageo: '考虑到哺乳期的母猴可能处于特殊的生理状态，挑选了一些相似年龄且生存环境相同的猕猴作为正常成年对照；它们同样生活在成年圈，食用成年饲料与当季新鲜水果。',
	},
}

export default {
	ltbm_title: {
		project: 'Long-term Tracking of Baby Macaque',
		home: 'Home',
		introduction: 'Introduction',
		transcriptomics: 'Transcriptomics Analysis',
		metagenomics: 'Metagenomics Analysis',
		co_analysis: 'Co-analysis',
		csa: 'Gene Differential Expression Analysis (Cross-sectional)',
		deg: 'Gene Differential Expression Analysis',
		lma: 'Gene Expression Clustering Analysis (Longitudinal Model)',
		ora: 'Over-representation Enrichment Analysis',
		gsea: 'Gene Set Enrichment Analysis',
		tsa: 'Time Series Analysis',
		vpa: 'Variance Partition Analysis',
		wgcna: 'Weighted Gene Co-expression Network Analysis',
	},
	ltbm_introduction: {
		background: 'Background',
		background1:
			'For several decades, understanding ageing and the processes that limit lifespan have challenged biologists. \
			Thirty years ago, the biology of ageing gained unprecedented scientific credibility through the identification \
			of gene variants that extend the lifespan of multicellular model organisms.\
			Now ageing research is entering a new era that has unique medical, commercial and societal implications.\
			(Figure: Timeline of ageing research, Judith Campisi et.al., Nature, 2019)',
		background2:
			'The past 30 years of ageing research has transitioned from identifying ageing phenotypes to investigating the genetic pathways that underlie these phenotypes.\
		The genetics of ageing research has revealed a complex network of interacting intracellular signalling pathways and higher-order processes.\
		Many of the pathways and processes, such as dietary restriction, that have been identified are known to be critical in homeostatic responses to environmental change.',
		background3:
			'Various factors such as race, living environment, eating habits and health status will affect the aging process,\
		which makes it very important to select an appropriate biological model to establish a benign relationship between aging mechanism and human clinical transformation.',
		background4:
			'Macaca are closely related to human beings and are currently the most important non-human primate model \
			animals in human disease research and clinical drug development.',
		description: 'Description',
		description1:
			'We performed a long-term tracking on captivity macaques, monitored the indicators and environmental information during its growth and development.\
		For the mean time, a large amount of blood transcriptomic, blood metabolomic, the oral and intestinal metagenomic data were obtained.\
		Through bioinformatics methods, the corresponding data were analyzed to explore the changes of gene expression in macaques during the aging process,\
		and identify the genes and signaling pathways closely related to aging.',
		description2:
			'Focusing on changes in known gene expression associated with cardiovascular disease and immunity in humans.\
		And combined with molecular experiment and measurement of blood routine, coagulation and other indicators, \
		to reveal the similarities and differences of the effects of aging on gene expression in macaques and humans, \
		and provide molecular data support for macaques in the field of human aging research and the establishment of suitable aging model.',
		user_guide: 'User Guide',
		version: 'Version',
		version1:
			'2022-01-22 Completed the construction of the website for the first time, only providing gene expression data',
		version2: '2022-10-01 Refactored the front-end UI, and the back-end API framework',
		version3: '2022-11-01 Added metagenomic data',
		stagea: 'First sampling, 21 baby monkeys lived with their mothers in adult housing; \
			Baby monkeys eat mainly breast milk but may pick up food from their mothers.',
		stageanote:
			'After sampling, the 21 baby monkeys were separated from their mothers and placed in a large cage.',
		stagem: 'At the same time of first sampling, samples of each baby monkey mother were also collected; \
			these female monkeys lived in the adult housing and ate adult feed and seasonal fresh fruits.',
		stageb: 'Second sampling, 21 baby monkeys lived in a large cage (monkey kindergarten). Diet formula was baby monkey feed + fruit + milk powder.',
		stagec: 'Third sampling, 21 baby monkeys lived in a large cage (monkey kindergarten). Diet formula was baby monkey feed + fruit + milk powder.',
		stagecnote:
			'After sampling, stop feeding milk powder and transfer to a small cage (2 per a cage) in the veterinary room',
		staged: 'Fourth sampling, every two baby monkeys lived in a small cage. Diet formula was baby monkey feed + fruit + special additives.',
		stagednote:
			'Special additives include: JianPiGaoPian 0.8g + Vitamin B complex 0.1g + Vitamin C 0.1g, sometimes may extra add: 1 dry yeast tablet.\
		The above additives began to be added on November 15 and stopped to be added on December 01.',
		stagee: 'Fifth sampling, every two baby monkeys lived in a small cage. Diet formula was baby monkey feed + fruit',
		stagef: 'Sixth sampling, the 21 baby monkeys were back in the large cage (monkey kindergarten),\
		but the density of the group was lower than the second and third sampleing. Diet formula was new baby monkey feed + fruit',
		stagefnote:
			'Depending on the growth and development, 17 of the baby monkeys were transferred to cage 12-3 on March 11, 2020,\
		and 2 were transferred to cage 11-1 and 11-3 at the end of March, respectively.\
		The other two BCR03 and BCR20 had diarrhea during the sampling period and were treated in a small cage in the veterinary room.\
		They did not take medicine before and on the sampling day and were recovering, but they became emaciated and weak obviously.',
		stageg: 'Seventh sampling, 21 baby monkeys lived in the large cage (monkey kindergarten). Diet formula was new baby monkey feed + fruit',
		stagegnote:
			'The two monkeys, BCR03 and BCR20, had developed diarrhea and under treatment were dead before this sampling',
		stageo: 'Considering that lactating female monkeys may be in a special physiological state, \
			some rhesus monkeys of similar age and living environment were selected as normal adult controls; \
			they also lived in the adult housing and ate adult feed and seasonal fresh fruits.',
	},
	ltbm_dega: {
		stage: 'Stage',
		sample: 'Sample',
		env: 'Environment',
		gender: 'Sex',
		all: 'all sexes',
		male: 'male',
		female: 'female',
		step1: '1. Select the source data set',
		step1info:
			'When comparing differences between the same groups, there were differences in samples of different sex.\
		So we specifically provide single-sex results for comparison. Default option: Both male and female.',
		step2: '2. Select data analysze mode',
		step2info:
			'According to the experimental design, five modes for finding differentially expressed genes,\
					between groups and one user-defined mode were preset for different concerns.\
					eg. Baby monkey [~ sex + stage], where Baby monkey is the object of data comparison.\
					The design formula containing additional variables for Deseq2 analysis requirements is in square brackets, \
					and the variable at the end of the formula is the main research factor.\
					（The design formula is used to estimate the dispersions and to estimate the log2 fold changes of the model. See detail in DESeq2 Manuel.）',
		step2option1: 'Baby monkeys [ ~ Age difference ]',
		step2option2: 'Baby monkeys [ ~ Sex difference ]',
		step2option3: 'Baby monkeys [ ~ Condition difference ]',
		step2option4: 'All samples [ ~ Stage difference ]',
		step2custom: 'Custom [~ design formula]',
		step2full: 'all',
		step2option1_tooltip:
			'The effects of [sex] factor were corrected, and [stage] is taken as the main factor affecting the comparison results,\
		supporting pairwise comparison between stages A-G (Only baby monkeys, factor stage is the same as age).',
		step2option2_tooltip:
			'The effects of [stage] factors were corrected, and [sex] is taken as the main factor affecting the comparison results,\
		uncheck (√ all) to compare sex differences in a single stage.',
		step2option3_tooltip:
			'The effects of [sex] factors were corrected, and [condition] is taken as the main factor affecting the comparison results,\
		supporting pairwise comparison between conditions 1-5.',
		step2option4_tooltip:
			'The effects of [sex] factors were corrected, and [stage] is taken as the main factor affecting the comparison results,\
		supporting pairwise comparison between baby monkeys stages A-G and their mother (M) and adult monkeys (O).',
		step2option5_tooltip:
			'Optional data form matrix, according to the selected data custom design formula input. (Under development)',
		step3: '3. Select two groups for comparison',
		step3info:
			'Even compare differences between the same two stages, using different raw data sets will get different Deseq2 standardized results,\
					thus affecting the results of some different expression genes (this is caused by the standardization algorithm of Deseq2,\
					both results obtained are reliable, and the differences are due to the different amount of information between data sets).\
					The increase of data will make the standardization process less affected by extreme values, \
					so we recommend using a complete data matrix to find the differential expression genes.\
					However, since this is a long-term tracking project, the data is incremental.\
					In order to ensure that the comparison results of the same two groups before and after each data increment are consistent,\
		      		we also provide a method of only using the comparison group data to build the matrix for reference.\
					The complete data matrix is used as default.',
		step4: '4. Get results',
		step4info:
			'Click the row name of the table above to set groups.\
					You can switch groups by clicking the button Group1/Group2. It is automatically filled in special mode.',
		step5: '',
		step5gsea: '5. Get GSEA results',
		step1info_gsea:
			'In addition to the results of overexpression enrichment analysis (ORA) using artificial threshold screening,\
						gene set enrichment analysis (GSEA) is more likely to identify genes with small gene FoldChange that have an impact on biological pathways/functions,\
						not limited to whether they are differential genes.\
						Here we only provide the most important comparative results.',
		step2info_gsea:
			'Consistent with ORA preprocessing, we also normalized raw count data with DEseq2, \
						and sorted geneList according to the numeric of LogFC between groups',
		step3info_gsea: 'Here we only provide the most important comparative results.',
		reset_btn: 'Reset',
		submit_btn: 'Submit',
		statisticalTitle: 'Statistical Results of Differentially Expressed Genes',
		statisticalGseaTitle: 'Statistical Results of GSEA Enrichment Terms',
		tools: 'Toolkit',
		table_tooltip_death: ' Died before sampling',
		table_tooltip_remove: 'Removed by G-ESD test as an outlier',
		table_tooltip_population: 'Removed by sequencing pollution',
	},
}

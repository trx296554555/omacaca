<template>
	<div id="HomeCards" class="HomeCards -container">
		<div class="homecard">
			<div class="homecontent">
				<h2 class="hometitle">Genomics</h2>
				<p class="homecopy">
					Whole genome resequencing, for reseach of genetics and population evolution.
				</p>
				<a href="http://big.cdu.edu.cn/macsnvdb/" target="_blank">
					<button class="homebtn">More</button>
				</a>
			</div>
		</div>
		<div class="homecard">
			<div class="homecontent">
				<h2 class="hometitle">Transcriptomics</h2>
				<p class="homecopy">
					Transcriptome sequencing can obtain gene expression information and accurately
					analyze gene expression differences, gene structural variation, RNA interaction
					network analysis, etc.
				</p>
				<button class="homebtn">More</button>
			</div>
		</div>
		<div class="homecard">
			<div class="homecontent">
				<h2 class="hometitle">Metagenomics</h2>
				<p class="homecopy">
					Metagenomic sequencing, to analyze microbial community structure diversity,
					microbial community gene composition, etc.
				</p>
				<button class="homebtn">More</button>
			</div>
		</div>
		<div class="homecard">
			<div class="homecontent">
				<h2 class="hometitle">Metabolomics</h2>
				<p class="homecopy">
					Metabolomics is the quantitative analysis of all metabolites in a living
					organism and the search for the relative relationship between metabolites and
					physiological and pathological changes.
				</p>
				<button class="homebtn">More</button>
			</div>
		</div>
	</div>
</template>

<style scoped lang="less">
.HomeCards {
	@apply font-sans text-justify;
	@apply py-12;
	@apply grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-4 gap-8;
	background-color: @primary-trans;
	font-family: 'Rubik', sans-serif;
}
.homecard {
	position: relative;
	display: flex;
	align-items: flex-end;
	overflow: hidden;
	padding: 1rem;
	width: 100%;
	text-align: center;
	color: whitesmoke;
	background-color: whitesmoke;
	box-shadow: 0 1px 1px rgba(0, 0, 0, 0.1), 0 2px 2px rgba(0, 0, 0, 0.1),
		0 4px 4px rgba(0, 0, 0, 0.1), 0 8px 8px rgba(0, 0, 0, 0.1), 0 16px 16px rgba(0, 0, 0, 0.1);
	border-radius: 0.5rem;

	// web
	@media screen and (min-width: 768px) {
		height: 32rem;
	}

	//ipad pro && ipad mini 768px
	@media screen and (max-width: 768px) {
		height: 25rem;
	}

	&:before {
		content: '';
		position: absolute;
		top: 0;
		left: 0;
		width: 100%;
		height: 110%;
		background-size: cover;
		background-position: 0 0;
		transition: transform calc(700ms * 1.5) cubic-bezier(0.19, 1, 0.22, 1);
		pointer-events: none;
	}

	&:after {
		content: '';
		display: block;
		position: absolute;
		top: 0;
		left: 0;
		width: 100%;
		height: 200%;
		pointer-events: none;
		background-image: linear-gradient(
			to bottom,
			hsla(0, 0%, 0%, 0) 0%,
			hsla(0, 0%, 0%, 0.009) 11.7%,
			hsla(0, 0%, 0%, 0.034) 22.1%,
			hsla(0, 0%, 0%, 0.072) 31.2%,
			hsla(0, 0%, 0%, 0.123) 39.4%,
			hsla(0, 0%, 0%, 0.182) 46.6%,
			hsla(0, 0%, 0%, 0.249) 53.1%,
			hsla(0, 0%, 0%, 0.32) 58.9%,
			hsla(0, 0%, 0%, 0.394) 64.3%,
			hsla(0, 0%, 0%, 0.468) 69.3%,
			hsla(0, 0%, 0%, 0.54) 74.1%,
			hsla(0, 0%, 0%, 0.607) 78.8%,
			hsla(0, 0%, 0%, 0.668) 83.6%,
			hsla(0, 0%, 0%, 0.721) 88.7%,
			hsla(0, 0%, 0%, 0.762) 94.1%,
			hsla(0, 0%, 0%, 0.79) 100%
		);
		transform: translateY(-50%);
		transition: transform calc(700ms * 2) cubic-bezier(0.19, 1, 0.22, 1);
	}

	@imgList: '@img/homeFig/card_genomics.jpg', '@img/homeFig/card_metabolomics.jpg',
		'@img/homeFig/card_metagenomics.jpg', '@img/homeFig/card_transcriptomics.jpg';

	.loop(@index) when (@index <= length(@imgList)) {
		@url: extract(@imgList, @index);
		&:nth-child(@{index}):before {
			background-image: url(@url);
			background-repeat: no-repeat;
			background-size: auto 660px;
		}
		.loop(@index + 1);
	}
	.loop(1);
}

.homecontent {
	position: relative;
	display: flex;
	flex-direction: column;
	align-items: center;
	width: 100%;
	padding: 1rem;
	transition: transform 700ms cubic-bezier(0.19, 1, 0.22, 1);
	z-index: 1;

	> * + * {
		margin-top: 1rem;
	}
}

.hometitle {
	color: @white-color;
	font-size: 1.3rem;
	font-weight: bold;
	line-height: 1.2;
}

.homecopy {
	font-family: 'Cardo', serif;
	font-size: 1.125rem;
	font-style: italic;
	line-height: 1.35;
}

.homebtn {
	cursor: pointer;
	margin-top: 1.5rem;
	padding: 0.75rem 1.5rem;
	font-size: 0.65rem;
	font-weight: bold;
	letter-spacing: 0.025rem;
	text-transform: uppercase;
	color: @white-color;
	background-color: black;
	border: none;

	&:hover {
		background-color: lighten(black, 5%);
	}

	&:focus {
		outline: 1px dashed @secondary-color;
		outline-offset: 3px;
	}
}

@media (hover: hover) and (min-width: 768px) {
	.homecard:after {
		transform: translateY(0);
	}

	.homecontent {
		transform: translateY(calc(100% - 4.5rem));

		> *:not(.hometitle) {
			opacity: 0;
			transform: translateY(1rem);
			transition: transform 700ms cubic-bezier(0.19, 1, 0.22, 1),
				opacity 700ms cubic-bezier(0.19, 1, 0.22, 1);
		}
	}

	.homecard:hover,
	.homecard:focus-within {
		align-items: center;

		&:before {
			transform: translateY(-4%);
		}

		&:after {
			transform: translateY(-50%);
		}

		.homecontent {
			transform: translateY(0);

			> *:not(.title) {
				opacity: 1;
				transform: translateY(0);
				transition-delay: calc(700ms / 8);
			}
		}
	}

	.homecard:focus-within {
		&:before,
		&:after,
		.content,
		.content > *:not(.title) {
			transition-duration: 0s;
		}
	}
}
</style>

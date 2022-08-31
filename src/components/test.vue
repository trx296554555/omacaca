<template>
	<div id="CardSection">
		<main class="page-content">
			<div class="homecard">
				<div class="homecontent">
					<h2 class="hometitle">Mountain View</h2>
					<p class="homecopy">
						Check out all of these gorgeous mountain trips with beautiful views of, you guessed it, the
						mountains
					</p>
					<button class="homebtn">View Trips</button>
				</div>
			</div>
			<div class="homecard">
				<div class="homecontent">
					<h2 class="hometitle">To The Beach</h2>
					<p class="homecopy">Plan your next beach trip with these fabulous destinations</p>
					<button class="homebtn">View Trips</button>
				</div>
			</div>
			<div class="homecard">
				<div class="homecontent">
					<h2 class="hometitle">Desert Destinations</h2>
					<p class="homecopy">It's the desert you've always dreamed of</p>
					<button class="homebtn">Book Now</button>
				</div>
			</div>
			<div class="homecard">
				<div class="homecontent">
					<h2 class="hometitle">Explore The Galaxy</h2>
					<p class="homecopy">Seriously, straight up, just blast off into outer space today</p>
					<button class="homebtn">Book Now</button>
				</div>
			</div>
		</main>
	</div>
</template>

<script setup lang="ts">
const mySum: (x: number, y: number) => number = function (x: number, y: number): number {
	return x + y
}
console.log(mySum(1, 2))
</script>

<style scoped="scoped" lang="scss">
/* home组学卡片展示section */

$imageIds: '1517021897933-0e0319cfbc28', '1533903345306-15d1c30952de', '1545243424-0ce743321e11',
	'1531306728370-e2ebd9d7bb99';

$bp-md: 600px;
$bp-lg: 800px;

.page-content {
	display: grid;
	grid-gap: 1rem;
	padding: 1rem;
	max-width: 1024px;
	margin: 0 auto;
	font-family: 'Rubik', sans-serif;

	@media (min-width: $bp-md) {
		grid-template-columns: repeat(2, 1fr);
	}

	@media (min-width: $bp-lg) {
		grid-template-columns: repeat(4, 1fr);
	}
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
	box-shadow: 0 1px 1px rgba(0, 0, 0, 0.1), 0 2px 2px rgba(0, 0, 0, 0.1), 0 4px 4px rgba(0, 0, 0, 0.1),
		0 8px 8px rgba(0, 0, 0, 0.1), 0 16px 16px rgba(0, 0, 0, 0.1);

	@media (min-width: $bp-md) {
		height: 350px;
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

	@each $id in $imageIds {
		$i: index($imageIds, $id);

		&:nth-child(#{$i}):before {
			background-image: url(https://images.unsplash.com/photo-#{$id}?ixlib=rb-1.2.1&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=400&fit=max&ixid=eyJhcHBfaWQiOjE0NTg5fQ);
		}
	}
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
	color: white;
	background-color: black;
	border: none;

	&:hover {
		background-color: lighten(black, 5%);
	}

	&:focus {
		outline: 1px dashed yellow;
		outline-offset: 3px;
	}
}

@media (hover: hover) and (min-width: $bp-md) {
	.homecard:after {
		transform: translateY(0);
	}

	.homecontent {
		transform: translateY(calc(100% - 4.5rem));

		> *:not(.hometitle) {
			opacity: 0;
			transform: translateY(1rem);
			transition: transform 700ms cubic-bezier(0.19, 1, 0.22, 1), opacity 700ms cubic-bezier(0.19, 1, 0.22, 1);
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

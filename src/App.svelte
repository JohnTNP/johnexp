<script lang="ts">

import NavBar from "./components/NavBar.svelte"
import Card from "./components/Card.svelte"

let expDatasComp

const loadData = async () => {
	const response = await fetch('https://ExpDateServerTNP.johntnp.repl.co/getData')	
	const cards = await response.json()
	const objects = await Object.entries(cards)

	console.log(objects)
	expDatasComp = objects 
}
loadData()

</script>

<center>
	<div class="main-app">
		<NavBar />
		<div class="card-page">
			{#if expDatasComp}
				{#each expDatasComp as card}
					<Card cardTitle={card[1]["name"]} expDate={card[1]["expdate"]}/>
				{/each}
			{/if}
		</div>
	</div>
</center>

<style>
.main-app {
	width: 100vw;
	max-width: 60rem;
	height: 100vh;
}
.card-page {
	display: grid;
	grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
	justify-items: center;
	margin: 0 2rem 0 2rem;
}
</style>

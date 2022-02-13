<script lang="ts">

import NavBar from "./components/NavBar.svelte"
import Card from "./components/Card.svelte"
import { navActiveStore } from "./store"

let expDatasComp

const loadData = async () => {
	const response = await fetch('https://john-exp-api.herokuapp.com/getData')	
	const cards = await response.json()
	const objects = await Object.entries(cards)

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
					<Card 
						cardTitle={card[1]["name"]} 
						expDate={card[1]["expdate"]}
						_id={card[1]["_id"]}/>
				{/each}
			{/if}
			{#if !expDatasComp}
				<h1 style="color: white; margin-top: 2rem">Loading...</h1>
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
	grid-template-columns: repeat(2, minmax(150px, 1fr));
	justify-items: center;
	margin: 0 1rem 0 1rem;
}
</style>

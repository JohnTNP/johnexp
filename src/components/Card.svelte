<script lang="ts">
export let cardTitle:string
export let expDate:string

</script>

<div class="card-container">
    <h1 class="card-title">{cardTitle}</h1>
    <h3 class="card-exp">{expDate}</h3>
</div>

<style>
.card-container {
    margin-top: 2rem;
    background-color: white;
    background: linear-gradient(0deg, rgb(204, 246, 252) 0%, rgb(255, 214, 214) 100%);
    color: black;
    height: 6rem;
    width: 12rem;
    align-content: center;
    border-radius: 1rem;
    padding-left: 1rem;
    padding-right: 1rem;
    text-align: center;
}
.card-title {
    font-size: 1.5rem;
}

</style>

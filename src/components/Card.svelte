<script lang="ts">
import { deleteActiveStore, deleteSelected } from '../store'

export let cardTitle:string
export let expDate:string
export let _id:string

let index = 0
let isSelected:boolean = false
let isDelete:boolean = false
deleteActiveStore.subscribe(value => {isDelete = value})
let deletes:Array<string>
deleteSelected.subscribe(value => {deletes = value})

const onClickSelect = () => {
    if (isDelete && !isSelected) {
        isSelected = !isSelected
        if (isSelected) {
            deletes.push(_id)
            index = deletes.length - 1
            deleteSelected.update(value => value = deletes)
        }  
    }
}

</script>

<div class="card-container { (isSelected && isDelete) ? 'card-selected' : '' }" on:click={() => {onClickSelect()}}>
    <h1 class="card-title">{cardTitle}</h1>
    <h3 class="card-exp">{expDate}</h3>
</div>

<style>
.card-container {
    margin-top: 1rem;
    background-color: white;
    background: linear-gradient(0deg, rgb(204, 246, 252) 0%, rgb(255, 214, 214) 100%);
    color: black;
    height: 6rem;
    width: 8rem;
    border-radius: 1rem;
    padding-left: 1rem;
    padding-right: 1rem;
    text-align: center;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
}
.card-title {
    font-size: 1rem;
    margin: 0;
    padding-bottom: 1rem;
}
.card-exp {
    margin: 0;
    font-size: 0.9em;
}

.card-selected {
    background: linear-gradient(0deg, rgb(97, 46, 76) 0%, rgb(121, 40, 40) 100%);
    color: white;
}

</style>

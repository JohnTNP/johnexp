<script lang="ts">
import { navActiveStore, deleteActiveStore, deleteSelected } from '../store'
import MdAddCircleOutline from 'svelte-icons/md/MdAddCircleOutline.svelte'
import MdRemoveCircleOutline from 'svelte-icons/md/MdRemoveCircleOutline.svelte'
import MdDelete from 'svelte-icons/md/MdDelete.svelte'

// Logic
let navActive:boolean
navActiveStore.subscribe(value => {navActive = value})
const onClickNav = () => {
    navActive = !navActive
    navActiveStore.update(value => value = navActive)
}

let deleteConfirm:boolean = false
let deleteActive:boolean
deleteActiveStore.subscribe(value => {deleteActive = value})
const onClickDelete = () => {
    deleteActive = !deleteActive
    deleteActiveStore.update(value => value = deleteActive)
    if (deleteSelects.length != 0) {
        window.location.reload()
    }
}

let deleteSelects:Array<string>
deleteSelected.subscribe(value => {deleteSelects = value})
const onSubmitDelete = () => {
    try {
        for (let i = 0; i < deleteSelects.length; i++ ) {
            const payload = { _id: deleteSelects[i] }     
            const data = JSON.stringify(payload)

            fetch('https://john-exp-api.herokuapp.com/deleteData',
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: data
            }).then(res => {
                console.log(res)
                deleteSelects = []
                window.location.reload()
            })
        }
    } catch (error) {
        console.log(error)
    }
}

// API 
let itemName, date
const addCard = (itemName, date) => {
    const payload = {
        name: itemName,
        expdate: date 
    }
    const data = JSON.stringify(payload)

    fetch('https://john-exp-api.herokuapp.com/insertData',
    {
        method: "POST",
        headers: {
            "Content-Type": 'application/json'
        },
        body: data 
    })
        .then(res => { 
            console.log(res) 
            window.location.reload() 
            itemName = false
            date = false
        })
}

</script>

<div class="nav-container {navActive ? 'nav-active' : ''} {deleteActive ? 'nav-delete-active' : ''}" >
    {#if !deleteActive}
        <div class="nav-icon {navActive ? 'nav-main-icon-active' : ''}" on:click={() => {onClickNav()}}> 
            {#if !navActive}
                <MdAddCircleOutline /> 
            {:else}
                <MdRemoveCircleOutline /> 
            {/if}
        </div>
        {#if navActive}
            <div class="form-container {navActive ? 'form-active': ''}">
            <label for="itemName">Name: </label>
            <input type="text" id="itemName" name="itemName" bind:value={itemName}><br><br>
            <label for="expdate">Expire Date: </label>
            <input type="date" id="expdate" name="expdate" bind:value={date}><br><br>
            <button class="add-button" on:click={() => {
                if (!itemName) {
                    alert('Please Enter Name')
                }
                else if (!date) {
                    alert('Please Enter Date')
                } 
                else {
                    addCard(itemName, date)
                }
            }}>Add</button>
            </div>
        {/if}
    {/if}

    {#if !navActive}
        <div class="delete-icon {deleteActive ? 'delete-icon-active': ''}" on:click={() => {onClickDelete()}}>
            <MdDelete />
        </div>
        {#if deleteActive}
            <h2 style="font-size: 1rem;">{deleteSelects.length} items selected</h2>
            {#if !deleteConfirm}
                <button class="delete-button" 
                    on:click={() => {
                        if (deleteSelects.length > 0) deleteConfirm = true
                        else alert('Please select item')}}>
                    Delete
                </button>
            {/if}
            {#if deleteConfirm}
                <div class="confirm-container">
                    <button class="delete-button" on:click={() => {onSubmitDelete()}}>Yes</button>
                    <button class="delete-button" on:click={() => {deleteConfirm = false}}>No</button>
                </div>
            {/if}
        {/if}
    {/if}
</div>

<style>
:root {
    --primary-duration: 0.3s;
    user-select: none;
}

.nav-container {
    display: flex;
    flex-direction: row;
    position: relative;
    height: 3.5rem;
    width: 100%;
    background: rgb(117,255,162);
    background: radial-gradient(circle, rgb(154, 255, 186) 0%, rgb(224, 153, 248) 100%);
    transition: height var(--primary-duration) ease;
    align-items: center;
    justify-content: center;
    column-gap: 2rem;
    color: black;
}
.nav-active {
    display: block;
    height: 14rem;
}

.nav-icon {
    cursor: pointer;
    width: 2.5rem;
    height: 2.5rem;
    transition: transform var(--primary-duration) ease,
                color var(--primary-duration) ease;
}
.nav-main-icon-active {
    color: darkgreen;
    padding-top: 1rem;
    animation: var(--primary-duration) ease form-load;
}

.nav-delete-active {
    height: 10rem;
    display: flex;
    flex-direction: column;
}
.delete-icon {
    cursor: pointer;
    width: 2.5rem;
    height: 2.5rem;
}
.delete-icon-active {
    color: darkred; 
    animation: var(--primary-duration) ease form-load;
}

.add-button {
    width: 5rem; 
    height: 2.5rem;
    font-family: inherit;
    font-size: inherit;
    border-radius: 1rem;
    color: rgb(0, 43, 21);
    font-weight: bold;
    cursor: pointer;
}
.delete-button {
    width: 5rem; 
    height: 2.5rem;
    font-family: inherit;
    font-size: inherit;
    border-radius: 1rem;
    color: rgb(0, 43, 21);
    font-weight: bold;
    cursor: pointer;
}

.form-container {
    margin-top: 1rem;
    font-size: 1rem; 
    font-weight: bold;
}
.form-active {
    animation: 0.5s ease form-load;
}

@keyframes form-load{
    from {opacity: 0%}
    to {opacity: 100%}
}
</style>
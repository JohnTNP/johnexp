<script lang="ts">
import { navActiveStore } from '../store'
import MdAddCircleOutline from 'svelte-icons/md/MdAddCircleOutline.svelte'
import MdRemoveCircleOutline from 'svelte-icons/md/MdRemoveCircleOutline.svelte'

let navActive:boolean
navActiveStore.subscribe(
    value => {
        navActive = value
    }
)


let itemName, date

const addCard = (itemName, date) => {
    const payload = {
        name: itemName,
        expdate: date 
    }
    const data = JSON.stringify(payload)
    console.log(typeof(data));
    

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

<div class="nav-container {navActive ? 'nav-active' : ''}" >
    <div class="nav-icon {navActive ? 'nav-main-icon-active' : ''}" on:click={() => {navActive = !navActive}}> 
        {#if !navActive}
            <MdAddCircleOutline /> 
        {/if}
        {#if navActive}
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
    height: 15rem;
}

.nav-icon {
    cursor: pointer;
    width: 2.5rem;
    height: 2.5rem;
    transition: transform var(--primary-duration) ease;
}
.nav-main-icon-active {
    padding-top: 1rem;
    animation: 0.5s ease form-load;
}

.add-button {
    width: 5rem; 
    height: 2.5rem;
    font-family: inherit;
    font-size: inherit;
    border-radius: 1rem;
    color: rgb(0, 43, 21);
    font-weight: inherit;
}

.form-container {
    margin-top: 1rem;
    font-size: 1.25rem; 
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
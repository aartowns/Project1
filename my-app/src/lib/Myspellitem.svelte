<script>
	import { createEventDispatcher } from "svelte";

    /**
	 * @type {{ isSelected: boolean; name: any; desc: any; }}
	 */
     export let name;
     export let desc;
     /**
	 * @type {boolean}
	 */
      export let isSelected;
    let dispatch = createEventDispatcher();
    let showDescription = false;
    function toggleDescription() {
        showDescription = !showDescription
    }
    function toggleSelected() {
        isSelected = !isSelected;
        dispatch('selectToggled', {isSelected: isSelected} )
    }
    
   </script>
<div>
<li on:click={()=>toggleDescription()}>{name}</li>
<input type="checkbox" on:click={() => toggleSelected()} style="inline: block;">
{#if showDescription}
<p>{desc}</p>  
{/if}
</div>

<style>
    div {
        width: 100%;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        background-color: #d9d9d9;
        border: 1px solid black;
        box-sizing: border-box;
        flex-grow: 1;
    }

    li {
        display: flex;
        margin-right: 10px;
        justify-content: center;
        align-items: center;
        text-align: center;
    }

    input[type="checkbox"] {
        display: inline;
    }

    p {
        text-decoration: none;
        display: inline-block;
        text-align: center;
    }

    li:hover {
		color: var(--button-selected);
		cursor: pointer;
	}
</style>
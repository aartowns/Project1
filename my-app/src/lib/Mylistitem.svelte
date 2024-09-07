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

<li on:click={()=>toggleDescription()}>{name}</li>
<input type="checkbox" on:click={() => toggleSelected()} style="inline: block;">
{#if showDescription}
<p>{desc}</p>  
{/if}

<style>
    li {
        display: inline;
        margin-right: 10px;
    }

    input[type="checkbox"] {
        display: inline;
    }

    p {
        text-decoration: none;
        display: inline-block;
        
    }

    li:hover {
		color: #d40b0b;
		cursor: pointer;
	}
</style>
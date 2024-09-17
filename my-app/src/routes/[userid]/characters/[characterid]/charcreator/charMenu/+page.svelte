<script>
	import First from "$lib/First.svelte";
	import Five from "$lib/Five.svelte";
	import Four from "$lib/Four.svelte";
	import Second from "$lib/Second.svelte";
	import Third from "$lib/Third.svelte";
	import { writable } from "svelte/store";

     let state = 'first';
    
     let character = writable({
        Level: 1,
        Race: 'Dragonborn',
        Class: 'Barbarian',
        Background: 'Acolyte',
        RolledHitpoints: 0,
        Name: '',
        ProficientSkills: [],
        Strength: 1,
        Dexterity: 1,
        Constitution: 1,
        Wisdom: 1,
        Intelligence: 1,
        Charisma: 1,
        chosenFeats: [],


        


     });
     character.subscribe((val)=>{
        console.log(val);
     })



</script>

<div style="display:flex; justify-content:center; flex-direction: column;">
<div style="display:flex; justify-content:center; flex-direction: row;">
<button class="{state=='first'?'selected':''}" on:click={()=> {
    state='first';
}}>
General Info
</button>
<button class="{state=='second'?'selected':''}" on:click={()=> {
    state='second';
}}>
Skills
</button>
<button class="{state=='third'?'selected':''}" on:click={()=> {
    state='third';
}}>
Atributes
</button>
<button class="{state=='fourth'?'selected':''}" on:click={()=> {
    state='fourth';
}}>
Feats
</button>
<button class="{state=='five'?'selected':''}" on:click={()=> {
    state='five';
}}>
Spells
</button>
</div>

<div >
    {#if state=='five'}
      <Five character={character}></Five>
      {:else if state=='second'}
      <Second character={character}></Second> 
      {:else if state=='third'}
      <Third character={character}></Third>
      {:else if state=='fourth'}
      <Four character={character}></Four>
      {:else}
      <First character={character}></First>
    {/if}
</div>
</div>

<style>
    button {
        width: 20%;
        height: 4em;
        font-size: 16pt;
        font-family: Impact, Haettenschweiler, 'Arial Narrow Bold', sans-serif;
        background-color: var(--button-bg);
    }
    .selected {
        background-color: var(--button-selected);
    }
</style>

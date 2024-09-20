<script>
    export let character;
</script>

<div class="wrapper">
    <h2>Name: {$character.Name}</h2>
    <h2>Level: {$character.Level}</h2>
    <h2>Race: {$character.Race}</h2>
    <h2>Class: {$character.Class}</h2>
    <h2>Background: {$character.Background}</h2>
    <h2>Hitpoints: {$character.RolledHitpoints}</h2>
    <h2>Strength: {$character.Strength}</h2>
    <h2>Dexterity: {$character.Dexterity}</h2>
    <h2>Constitution: {$character.Constitution}</h2>
    <h2>Intelligence: {$character.Intelligence}</h2>
    <h2>Wisdom: {$character.Wisdom}</h2>
    <h2>Charisma: {$character.Charisma}</h2>
    <h2>Skills:</h2>
    <ul>
        {#each $character.ProficientSkills as skill}
        <li><strong>{skill}</strong></li>
        {/each}
    </ul>
    <h2>Feats:</h2>
<ul>
    {#each $character.chosenFeats as feat}
        <li><strong>{feat.name}</strong></li>
        <p>{feat.description}</p>
    {/each}
</ul>

<h2>Spells:</h2>
<ul>
    {#each $character.chosenSpells as spell}
        <li><strong>{spell.name}</strong></li>
        <p>{spell.description}</p> 
    {/each}
</ul>
</div>
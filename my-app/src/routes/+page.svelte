<script>
    import {user} from '$lib/stores'
    let isPopupVisible = false;

    function togglePopup() {
        isPopupVisible = !isPopupVisible;
    }

    function closePopup() {
        isPopupVisible = false;
    }

	 /**
 * Description placeholder
 *
 * @param {Event} event
 */
function handleClickOutside(event) {
    const popup = document.getElementById('popup');
    const toggleButton = document.getElementById('togglePopup');

    // Ensure event.target is a Node
    if (popup && event.target instanceof Node) {
        // Check if click is outside of the popup and not on the toggle button
        if (!popup.contains(event.target) && event.target !== toggleButton) {
            closePopup();
        }
    }
}

/**
 * Description placeholder
 * @param {number} min
 * @param {number} max
 */
 function rollD20(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

let diceRoll = 0;

function handleRoll() {
    diceRoll = rollD20(1, 20)
} 


    // Ensure event listeners are only added on the client side
    import { onMount } from 'svelte';
    onMount(() => {
        window.addEventListener('click', handleClickOutside);
        $user='Aaron';
    });
</script>

<div class="wrapper" style="width: 100vw; height: 100vh;">
    <button id="roll" class="roll" on:click={handleRoll}>
        <h4>Click me to roll a D20!</h4>
        <p>Result: {diceRoll}</p>
    </button>
    <button id="togglePopup" class="popup-btn" on:click={togglePopup}>Toggle Info</button>
    <div id="popup" class="popup {isPopupVisible ? 'visible' : ''}">
        <div class="popup-content">
            <button id="closePopup" class="close-btn" on:click={closePopup} aria-label="Close">&times;</button>
            <h1>Aaron's D&D 5E Character Creator</h1>
            <p>
                Here you should be able to create a D&D 5E character, save your characters, and view your
                character sheets.
            </p>
        </div>
    </div>
</div>

<style>
    .roll {
        background-color: var(--button-selected);
        border: none;
        color: white;
        padding: 15px 32px;
        text-align: center;
        text-decoration: none;
        display: inline-block;
        font-size: 16px;
        margin: 20px 0;
        cursor: pointer;
    }
    

    .wrapper {
        display: flex;
        flex-wrap: wrap;
        background-color: #d9d9d9;
        width: 100vw;
        height: 100%;
        justify-content: center;
        align-items: center;
        gap: 20px;
        margin: 0;
        flex-direction: row;
    }

    

    .wrapper {
        background-image: url('https://us.123rf.com/450wm/paulzhuk/paulzhuk1801/paulzhuk180100011/92649668-roleplay-game-with-dragons-in-dungeon-yellow-field-dice.jpg?ver=6');
        background-size: cover;
        background-position: center;
        background-repeat: no-repeat;
        margin: 0;
        padding: 0;
    }

    .popup {
        display: none;
        position: fixed;
        left: 0;
        top: 0;
        width: 100%;
        height: 100%;
        z-index: 1000;
        text-align: center;
    }

    .popup.visible {
        display: block;
    }

    .popup-content {
        background-color: white;
        margin: 30% auto;
        padding: 20px;
        border-radius: 10px;
        width: 80%;
        max-width: 600px;
    }

    .close-btn {
        color: #000;
        float: right;
        font-size: 28px;
        font-weight: bold;
    }

    .close-btn:hover,
    .close-btn:focus {
        color: var(--button-selected);
        text-decoration: none;
        cursor: pointer;
    }

    .popup-btn {
        background-color: var(--button-selected);
        border: none;
        color: white;
        padding: 15px 32px;
        text-align: center;
        text-decoration: none;
        display: inline-block;
        font-size: 16px;
        margin: 20px 0;
        cursor: pointer;
    }
</style>

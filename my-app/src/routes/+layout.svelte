
<header>
    <div class="header">
        <a class="pageLink" href="/"><strong>Home</strong></a>
    </div>
</header>
<div class="menu">
    <div class="menuOption">
        <a class="pageLink" href="/[userid]/characters/[characterid]/charcreator/charMenu" style="font-size: 4vh;"><strong>Character Creator</strong></a>
    </div>
    <div class="menuOption">
        <a class="pageLink" href="/[userid]/characters/[characterid]/charList" style="font-size: 4vh;"><strong>Characters</strong></a>
    </div>
</div>

<style>
    :global(:root) {
    --button-bg: #999aa1;
    --button-selected: #d40b0b;
}
    .header {
        background-color: var(--button-selected);
        width: 100vw;
        height: 15vh;
        display: flex;
        justify-content: center;
        align-items: center;
        padding: 0;
        margin: 0;
        font-size: 6vh;
        border: solid black .25px;
    }

    .menu {
        width: 100vw;
        height: 10vh;
        display: flex;
        background-color: var(--button-bg);
        justify-content: center;
        align-items: center;
    }

    .menuOption {
        display: flex;
        border: solid black 0.25px;
        justify-content: center;
        align-items: center;
        text-align: center;
        height: 100%;
        width: 50vw;
        font-size: 4vw;
    }
    .pageLink {
        text-decoration: none;
        color: black;
    }

    .pageLink:hover {
        color: cyan;
    }
</style>

<slot></slot>

<header>
    <div class="header">
        <a class="pageLink" href="/">Home</a>
    </div>
</header>
<div class="menu">
    <div class="menuOption">
        <a class="pageLink" href="/[userid]/characters/[characterid]/charcreator/charMenu">Character Creator</a>
    </div>
    <div class="menuOption">
        <a class="pageLink" href="/[userid]/characters/[characterid]/charList">Characters</a>
    </div>
</div>

<style>
    :global(:root) {
    --button-bg: #999aa1;
    --button-selected: #d40b0b;
}
    .header {
        background-color: var(--button-selected);
        width: 100%;
        height: 150px;
        display: flex;
        justify-content: center;
        align-items: center;
        padding: 0;
        margin: 0;
        font-size: 60px;
        border: solid black 1px;
        border-bottom: 0.25px;
    }

    .menu {
        width: 100%;
        height: 100px;
        display: flex;
        background-color: var(--button-bg);
        justify-content: center;
        align-items: center;
    }

    .menuOption {
        display: flex;
        border: solid black 0.5px;
        justify-content: center;
        align-items: center;
        height: 100%;
        width: 50%;
        font-size: 40px;
        border-bottom: 0.25px;
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
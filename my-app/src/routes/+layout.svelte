

<header>
    <div class="header">
        <a class="pageLink" href="../index.html">Home</a>
    </div>
</header>
<div class="menu">
    <div class="menuOption">
        <a class="pageLink" href="../Charcreator">Character Creator</a>
    </div>
    <div class="menuOption">
        <a class="pageLink" href="../Char">Characters</a>
    </div>
</div>

<style>
    .header {
        background-color: #d40b0b;
        width: 100vw;
        height: 150px;
        display: flex;
        justify-content: center;
        align-items: center;
        padding: 0;
        margin: 0;
        font-size: 60px;
        border: solid black 0.5px;
        border-bottom: 0.25px;
    }

    .menu {
        width: 100vw;
        height: 100px;
        display: flex;
        background-color: #999aad;
        justify-content: center;
        align-items: center;
    }

    .menuOption {
        display: flex;
        border: solid black 0.5px;
        justify-content: center;
        align-items: center;
        height: 100%;
        width: 50vw;
        font-size: 40px;
        border-bottom: 0.25px;
    }
    .pageLink {
        text-decoration: none;
        color: black;
    }

    .pageLink:hover {
        text-decoration: underline;
        color: cyan;
    }
</style>

<slot></slot>
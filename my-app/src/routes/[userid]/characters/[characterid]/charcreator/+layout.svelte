<div class="nextBack">
	<div class="back">
		<a class="nextBackLink" href="charcreator1">Back</a>
	</div>
	<div class="next">
		<a class="nextBackLink" href="charcreator3">Next</a>
	</div>
</div>

<slot></slot>

<style>
    .nextBack {
		width: 100vw;
		height: 5em;
		display: flex;
		justify-content: center;
		align-items: center;
		background-color: #999aad;
	}

	.back,
	.next {
		display: flex;
		border: solid black 0.5px;
		justify-content: center;
		align-items: center;
		height: 100%;
		width: 50vw;
		font-size: 40px;
	}

	.nextBackLink {
		text-decoration: none;
		color: black;
	}

	.nextBackLink:hover {
		text-decoration: underline;
		color: cyan;
	}
</style>
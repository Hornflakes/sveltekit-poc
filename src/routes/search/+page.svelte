<script lang="ts">
    import type { PageData } from './$types';

    export let data: PageData;
</script>

<div class="centered">
    <h1>search</h1>

    <form method="GET">
        <label>
            search countries:
            <input name="countryName" autocomplete="country-name" />
        </label>
    </form>

    <ul class="countries">
        {#each data.countries as country}
            <li>
                {country.name}
            </li>
        {/each}
    </ul>
</div>

<style>
    .centered {
        max-width: 20em;
        margin: 0 auto;
    }

    label {
        width: 100%;
    }

    input {
        flex: 1;
    }
</style>

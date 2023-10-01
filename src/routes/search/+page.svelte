<script lang="ts">
    import type { PageData } from './$types';
    import { fly, slide } from 'svelte/transition';
    import { navigating } from '$app/stores';
    import Loading from '$lib/components/Loading.svelte';

    export let data: PageData;
</script>

<div class="centered">
    <h1>search</h1>

    <form>
        <label>
            search countries:
            <input name="name" autocomplete="country-name" required />
        </label>
    </form>

    {#if !$navigating && data.noResults}
        <h2 in:fly={{ y: 20 }} out:slide>no results... :(</h2>
    {/if}

    {#key data.countries}
        {#if !$navigating}
            <ul class="countries" in:fly={{ y: 20 }} out:slide>
                {#each data.countries as country}
                    <li>
                        {country.name.common}
                    </li>
                {/each}
            </ul>
        {:else}
            <Loading />
        {/if}
    {/key}
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
    ul.countries {
        padding: 0;
    }

    ul.countries li {
        position: relative;
        display: flex;
        align-items: center;
        padding: 0.5em 0.5em 0.5em 1em;
        margin: 0 0 0.5em 0;
        gap: 0.5em;
        border-radius: 5px;
        user-select: none;
        background: var(--bg-1);
        filter: drop-shadow(2px 3px 6px rgba(0, 0, 0, 0.1));
        transition: filter 0.2s, opacity 0.2s;
    }
</style>

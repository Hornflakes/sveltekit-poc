<script lang="ts">
    import { fly, slide } from 'svelte/transition';
    import { navigating, page } from '$app/stores';
    import Loading from '$lib/components/Loading.svelte';
    import { favorites } from '$lib/stores/favorites';
    import type { Country } from '$lib/models/country.js';

    export let data;

    const toggleFavorite = (country: Country): void => {
        if ($favorites[country.name]) {
            favorites.remove(country);
        } else {
            favorites.add(country);
        }
    };
</script>

<div class="centered">
    <h1>search</h1>

    <form>
        <label>
            search countries:
            <input
                name="name"
                value={$page.url.searchParams.get('name')}
                autocomplete="country-name"
                required
            />
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
                        <span>{country.name}</span>
                        <button
                            class:active={$favorites[country.name]}
                            on:click={() => toggleFavorite(country)}
                        />
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

    span {
        flex: 1;
    }

    button {
        border: none;
        background: url(./heart.svg) no-repeat 50% 50%;
        background-size: 1rem 1rem;
        cursor: pointer;
        height: 100%;
        aspect-ratio: 1;
        opacity: 0.5;
        transition: opacity 0.2s;
    }

    button:hover {
        opacity: 1;
    }

    button.active {
        opacity: 1;
    }
</style>

<script lang="ts">
    import { fly, slide } from 'svelte/transition';
    import { navigating, page } from '$app/stores';
    import Loading from '$lib/components/Loading.svelte';
    import heart from '$lib/assets/heart.svg';
    import { getFavoritesContext } from '$lib/stores/favorites.js';

    export let data;

    const favorites = getFavoritesContext();
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
                            style="background-image: url({heart})"
                            class="heart"
                            class:active={$favorites[country.name]}
                            on:click={() => favorites.toggle(country)}
                        />
                    </li>
                {/each}
            </ul>
        {:else}
            <Loading />
        {/if}
    {/key}
</div>

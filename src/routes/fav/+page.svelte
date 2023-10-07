<script lang="ts">
    import { getFavoritesContext } from '$lib/stores/favorites';
    import { fly } from 'svelte/transition';
    import heart from '$lib/assets/heart.svg';

    const favorites = getFavoritesContext();
</script>

<div class="centered">
    <h1>favorites</h1>

    <ul class="countries" in:fly={{ y: 20 }}>
        {#each Object.values($favorites) as country}
            <li>
                <span>{country.name}</span>
                <button
                    style="background-image: url({heart})"
                    class="heart active"
                    on:click={() => favorites.toggle(country)}
                />
            </li>
        {/each}
    </ul>
</div>

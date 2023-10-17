<script lang="ts">
    import { getFavoritesContext } from '$lib/stores/favorites';
    import { fly } from 'svelte/transition';
    import heart from '$lib/assets/heart.svg';
    import { Card, Heading } from 'flowbite-svelte';

    const favorites = getFavoritesContext();
</script>

<Heading tag="h1" class="my-4">favorites</Heading>

<ul in:fly={{ y: 20 }} class="flex flex-col gap-4 my-8">
    {#each Object.values($favorites) as country}
        <Card size="xs" padding="md">
            <div class="flex items-center gap-4">
                <Heading tag="h6">{country.name}</Heading>
                <button
                    style="background-image: url({heart})"
                    class="heart active"
                    on:click={() => favorites.toggle(country)}
                />
            </div>
        </Card>
    {/each}
</ul>

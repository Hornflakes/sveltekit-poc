<script lang="ts">
    import { fly, slide } from 'svelte/transition';
    import { navigating, page } from '$app/stores';
    import Loading from '$lib/components/Loading.svelte';
    import heart from '$lib/assets/heart.svg';
    import { getFavoritesContext } from '$lib/stores/favorites.js';
    import { Heading, Label, Input, Card } from 'flowbite-svelte';

    export let data;

    const favorites = getFavoritesContext();
</script>

<Heading tag="h1" class="my-4">search</Heading>

<form class="max-w-xs">
    <Label for="name" class="mb-2">search countries:</Label>
    <Input
        id="name"
        size="lg"
        name="name"
        value={$page.url.searchParams.get('name')}
        autocomplete="country-name"
        required
    />
</form>

{#if !$navigating && data.noResults}
    <div class="my-4" in:fly={{ y: 20 }} out:slide>
        <Heading tag="h2">no results... :(</Heading>
    </div>
{/if}

{#key data.countries}
    {#if !$navigating}
        <ul in:fly={{ y: 20 }} out:slide class="flex flex-col gap-4 my-8">
            {#each data.countries as country}
                <Card size="xs" padding="md">
                    <div class="flex items-center gap-4">
                        <Heading tag="h6">{country.name}</Heading>
                        <button
                            style="background-image: url({heart})"
                            class="heart"
                            class:active={$favorites[country.name]}
                            on:click={() => favorites.toggle(country)}
                        />
                    </div>
                </Card>
            {/each}
        </ul>
    {:else}
        <div class="max-w-xs">
            <Loading />
        </div>
    {/if}
{/key}

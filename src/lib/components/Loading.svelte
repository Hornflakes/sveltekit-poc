<script>
    import { onMount } from 'svelte';
    import { fly, slide } from 'svelte/transition';

    let hidden = true;
    onMount(() => setTimeout(() => (hidden = false), 1000));
</script>

{#if !hidden}
    <h2 in:fly={{ y: 20 }} out:slide>...loading</h2>
{/if}

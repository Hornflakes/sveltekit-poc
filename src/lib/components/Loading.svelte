<script>
    import { Spinner } from 'flowbite-svelte';
    import { onMount } from 'svelte';
    import { fly, slide } from 'svelte/transition';

    let hidden = true;
    onMount(() => setTimeout(() => (hidden = false), 1000));
</script>

{#if !hidden}
    <div in:fly={{ y: 20 }} out:slide class="flex justify-center my-8"><Spinner size="16" /></div>
{/if}

<script>
    import roll from '$lib/assets/roll.gif';
    import { Heading } from 'flowbite-svelte';
</script>

<Heading tag="h1" class="my-5">Welcome!</Heading>
<img src={roll} alt="never gonna give you up" />

<style>
    img {
        max-height: calc(100vh - 12rem);
    }
</style>

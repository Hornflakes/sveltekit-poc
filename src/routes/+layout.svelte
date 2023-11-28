<script lang="ts">
    import '../app.css';
    import { enhance } from '$app/forms';
    import { page } from '$app/stores';
    import { setFavoritesContext } from '$lib/stores/favorites';
    import { Button, NavBrand, NavHamburger, NavLi, NavUl, Navbar } from 'flowbite-svelte';

    setFavoritesContext();
</script>

<Navbar let:NavContainer color="primary">
    <NavContainer class="border px-5 py-2 rounded-lg bg-white dark:bg-gray-600">
        <NavBrand href="/">
            <span class="self-center whitespace-nowrap text-xl font-semibold">SvelteKit PoC</span>
        </NavBrand>

        <div class="flex items-center md:order-2">
            {#if $page.data.user}
                <form action="/logout" method="POST" use:enhance>
                    <Button type="submit" color="light" size="xs">log out</Button>
                </form>
            {/if}

            <NavHamburger />
        </div>

        <NavUl activeUrl={$page.url.pathname}>
            <NavLi href="/">home</NavLi>
            <NavLi href="/search">search</NavLi>
            <NavLi href="/fav">fav</NavLi>
            <NavLi href="/chart">chart</NavLi>
            <NavLi href="/kitchen-sink">kitchen sink</NavLi>

            {#if $page.data.user}
                <NavLi href="/chat" style="margin-right: auto">chat</NavLi>
            {/if}
        </NavUl>

        {#if !$page.data.user}
            <NavUl activeUrl={$page.url.pathname}>
                <NavLi href="/login">login</NavLi>
                <NavLi href="/register">register</NavLi>
            </NavUl>
        {/if}
    </NavContainer>
</Navbar>

<div class="container mx-auto px-2">
    <slot />
</div>

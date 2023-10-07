<script lang="ts">
    import { enhance } from '$app/forms';
    import { page } from '$app/stores';
    import { setFavoritesContext } from '$lib/stores/favorites';
    import { io } from 'socket.io-client';

    setFavoritesContext();

    const socket = io();
    socket.on('hello', (message) => {
        console.log(message);
    });
</script>

<nav>
    <a href="/" aria-current={$page.url.pathname === '/'}>home</a>
    <a href="/search" aria-current={$page.url.pathname === '/search'}>search</a>
    <a href="/fav" aria-current={$page.url.pathname === '/fav'}>fav</a>

    {#if $page.data.user}
        <a href="/chat" aria-current={$page.url.pathname === '/chat'}>chat</a>

        <form action="/logout" method="POST" use:enhance style="margin-left: auto">
            <button type="submit">log out</button>
        </form>
    {/if}

    {#if !$page.data.user}
        <a href="/login" aria-current={$page.url.pathname === '/login'} style="margin-left: auto">
            login
        </a>
        <a href="/register" aria-current={$page.url.pathname === '/register'}>register</a>
    {/if}
</nav>

<slot />

<style>
    button {
        background: white;
        color: var(--fg-1);
        padding: 0.125rem 0.25rem;
    }

    button:hover {
        outline: 1px solid var(--fg-1);
    }
</style>

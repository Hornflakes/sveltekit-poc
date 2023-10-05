<script lang="ts">
    import { page } from '$app/stores';
    import { setFavoritesContext } from '$lib/stores/favorites';

    setFavoritesContext();
</script>

<nav>
    <a href="/" aria-current={$page.url.pathname === '/'}>home</a>
    <a href="/search" aria-current={$page.url.pathname === '/search'}>search</a>
    <a href="/fav" aria-current={$page.url.pathname === '/fav'}>fav</a>
    <a href="/login" aria-current={$page.url.pathname === '/login'} style="margin-left: auto">
        login
    </a>
    <a href="/register" aria-current={$page.url.pathname === '/register'}>register</a>
</nav>

<slot />

<script>
    import { page } from '$app/stores';
</script>

<nav>
    <a href="/" aria-current={$page.url.pathname === '/'}>home</a>
    <a href="/search" aria-current={$page.url.pathname === '/search'}>search</a>
    <a href="/fav" aria-current={$page.url.pathname === '/fav'}>fav</a>
</nav>

<slot />

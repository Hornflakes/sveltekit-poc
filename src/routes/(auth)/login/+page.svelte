<script lang="ts">
    import { enhance } from '$app/forms';

    export let form;
</script>

<div class="centered">
    <h1>login</h1>

    <form method="POST" use:enhance>
        <label>
            username
            <input name="username" autocomplete="username" required />
        </label>
        <label>
            password
            <input name="password" type="password" autocomplete="new-password" required />
        </label>

        <button type="submit">log in</button>

        {#if form?.credentials}
            <p class="error">wrong credentials.</p>
        {/if}
    </form>
</div>

<script lang="ts">
    export let form;
</script>

<div class="centered">
    <h1>register</h1>

    <form method="POST">
        <label>
            username
            <input name="username" value={form?.username ?? ''} autocomplete="username" required />
        </label>
        <label>
            password
            <input
                name="password"
                value={form?.password ?? ''}
                type="password"
                autocomplete="new-password"
                required
            />
        </label>

        <button type="submit">register</button>

        {#if form?.usernameTaken}
            <p class="error">username is taken.</p>
        {/if}
    </form>
</div>

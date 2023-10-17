<script lang="ts">
    import { enhance } from '$app/forms';
    import { Heading, Label, Input, Button } from 'flowbite-svelte';

    export let form;
</script>

<Heading tag="h1" class="my-4">register</Heading>

<form method="POST" use:enhance class="max-w-xs">
    <div class="my-6">
        <Label for="username" class="mb-2">username</Label>
        <Input
            id="username"
            size="lg"
            name="username"
            autocomplete="username"
            required
            value={form?.username ?? ''}
        />
    </div>

    <div class="mb-8">
        <Label for="password" class="mb-2">password</Label>
        <Input
            id="password"
            size="lg"
            name="password"
            type="password"
            autocomplete="new-password"
            required
            value={form?.password ?? ''}
        />
    </div>

    <Button type="submit">register</Button>

    {#if form?.usernameTaken}
        <p class="mt-4 text-rose-700">username is taken.</p>
    {/if}
</form>

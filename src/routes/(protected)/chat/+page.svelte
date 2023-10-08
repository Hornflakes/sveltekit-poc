<script lang="ts">
    import { page } from '$app/stores';
    import type { Message } from '$lib/models/message';
    import { io } from 'socket.io-client';
    import { afterUpdate, beforeUpdate, onMount } from 'svelte';

    let socket: ReturnType<typeof io>;
    let connections = 1;
    let messages: Message[] = [];
    let chat: HTMLDivElement;
    let autoScroll = false;

    onMount(() => {
        socket = io();

        socket.on('connections', (message) => {
            connections = message;
        });

        socket.on('chat', (message: Message) => {
            messages.push(message);
            messages = messages;

            if (document.hidden && message.username !== $page.data.user.name) {
                new Notification(message.username, {
                    body: message.text,
                });
            }
        });

        return () => socket.close();
    });

    beforeUpdate(() => {
        if (chat) {
            const scrollableDistance = chat.scrollHeight - chat.offsetHeight;
            autoScroll = chat.scrollTop > scrollableDistance - 20;
        }
    });

    afterUpdate(() => {
        if (autoScroll) {
            chat.scrollTo(0, chat.scrollHeight);
        }
    });

    const handleKeydown = (event: KeyboardEvent) => {
        if (event.key !== 'Enter') return;

        const target = event.target as HTMLInputElement;
        const text = target.value;
        if (!text) return;

        const message: Message = {
            username: $page.data.user.name,
            time: new Date().getHours() + ':' + new Date().getMinutes(),
            text,
        };
        socket.emit('chat', message);

        target.value = '';
    };
</script>

<div class="centered">
    <h1>chat</h1>
    <p><strong>{connections}</strong> online</p>

    <div class="phone">
        <div class="chat" bind:this={chat}>
            <header>
                <h1>Global Chat</h1>
            </header>

            {#each messages as message}
                <article
                    class={message.username === $page.data.user.name ? 'this-user' : 'other-user'}
                >
                    <span
                        >{message.text}
                        <div>
                            <sub>{message.username} {message.time}</sub>
                        </div>
                    </span>
                </article>
            {/each}
        </div>

        <input on:keydown={handleKeydown} />
    </div>
</div>

<style>
    .phone {
        display: flex;
        flex-direction: column;
        background: var(--bg-2);
        position: relative;
        font-size: min(2.5vh, 1rem);
        height: 100%;
        aspect-ratio: 9 / 16;
        border: 0.2em solid #222;
        border-radius: 1em;
        box-sizing: border-box;
        filter: drop-shadow(1px 1px 0px #222) drop-shadow(2px 2px 0px #222)
            drop-shadow(3px 3px 0px #222);
    }

    .phone::after {
        position: absolute;
        content: '';
        background: #222;
        width: 60%;
        height: 1em;
        left: 20%;
        top: 0;
        border-radius: 0 0 0.5em 0.5em;
    }

    .chat {
        height: 0;
        flex: 1 1 auto;
        padding: 0 1em;
        overflow-y: auto;
        scroll-behavior: smooth;
    }

    .chat::-webkit-scrollbar {
        display: none;
    }

    header {
        display: flex;
        flex-direction: column;
        align-items: center;
        height: 100%;
        padding: 4em 0 0 0;
        box-sizing: border-box;
    }

    article {
        margin: 0 0 0.5em 0;
    }

    span {
        padding: 0.5em 1em;
        display: inline-block;
        word-break: break-all;
    }

    .other-user span {
        background-color: var(--bg-1);
        border-radius: 1em 1em 1em 0;
        color: var(--fg-1);
    }

    .this-user span {
        background-color: #0074d9;
        color: white;
        border-radius: 1em 1em 0 1em;
    }

    .this-user {
        text-align: right;
    }

    input {
        margin: 0.5em 1em 1em 1em;
        flex: 0;
        border: 1px solid #222;
    }
</style>

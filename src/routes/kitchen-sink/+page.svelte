<script lang="ts">
    import {
        Alert,
        Heading,
        Label,
        Select,
        Toast,
        type SelectOptionType,
        MultiSelect,
        Checkbox,
        Button,
        Dropdown,
        DropdownItem,
        Dropzone,
        Indicator,
        Range,
        TextPlaceholder,
        Tooltip,
        Modal,
        TableSearch,
        TableHead,
        TableHeadCell,
        TableBody,
        TableBodyRow,
        TableBodyCell,
    } from 'flowbite-svelte';
    import { CheckCircleSolid, ChevronDownSolid, ChevronRightSolid } from 'flowbite-svelte-icons';
    import { writable } from 'svelte/store';

    let selectedCountry: string;
    let countries: SelectOptionType<string>[] = [
        { value: 'ro', name: 'Romania' },
        { value: 'us', name: 'United States' },
    ];
    let food: SelectOptionType<number>[] = [
        { value: 1, name: 'Burger' },
        { value: 2, name: 'Fries' },
        { value: 3, name: 'Milkshake' },
    ];
    let showModal = false;
    let dropzoneValue: any = [];

    type TableKey = 'id' | 'maker' | 'type' | 'make';
    let items = [
        { id: 1, maker: 'Toyota', type: 'ABC', make: 2017 },
        { id: 2, maker: 'Ford', type: 'CDE', make: 2018 },
        { id: 3, maker: 'Volvo', type: 'FGH', make: 2019 },
        { id: 4, maker: 'Saab', type: 'IJK', make: 2020 },
    ];
    const searchTerm = writable<string>('');
    const sortKey = writable<TableKey>('id');
    const sortDirection = writable(1);
    const searchedItems = writable(items.slice());
    $: {
        const term = $searchTerm;
        const searched = items.filter(
            (item) => item.maker.toLowerCase().indexOf(term.toLowerCase()) !== -1,
        );
        searchedItems.set(searched);
    }
    $: {
        const key = $sortKey;
        const direction = $sortDirection;
        const sorted = $searchedItems.sort((a, b) => {
            const aVal = a[key];
            const bVal = b[key];
            if (aVal < bVal) {
                return -direction;
            } else if (aVal > bVal) {
                return direction;
            }
            return 0;
        });
        searchedItems.set(sorted);
    }

    const country = (value: string): SelectOptionType<string> =>
        countries.find((c) => c.value === selectedCountry);

    const sortTable = (key: TableKey) => {
        if ($sortKey === key) {
            sortDirection.update((val) => -val);
        } else {
            sortKey.set(key);
            sortDirection.set(1);
        }
    };

    const dropHandle = (event: any) => {
        dropzoneValue = [];
        event.preventDefault();
        if (event.dataTransfer.items) {
            [...event.dataTransfer.items].forEach((item, i) => {
                if (item.kind === 'file') {
                    const file = item.getAsFile();
                    dropzoneValue.push(file.name);
                    dropzoneValue = dropzoneValue;
                }
            });
        } else {
            [...event.dataTransfer.files].forEach((file, i) => {
                dropzoneValue = file.name;
            });
        }
    };

    const handleChange = (event: any) => {
        const files = event.target.files;
        if (files.length > 0) {
            dropzoneValue.push(files[0].name);
            dropzoneValue = dropzoneValue;
        }
    };

    const showFiles = (files: any) => {
        if (files.length === 1) return files[0];
        let concat = '';
        files.map((file: any) => {
            concat += file;
            concat += ',';
            concat += ' ';
        });

        if (concat.length > 40) concat = concat.slice(0, 40);
        concat += '...';
        return concat;
    };

    const showNativeNotification = () => {
        new Notification('Hello world!', {
            body: 'This is a native notification.',
        });
    };
</script>

<Heading tag="h1" class="my-4">kitchen sink</Heading>

<Alert>
    <span class="font-medium">Info alert!</span>
    Hello there.
</Alert>

<Label class="my-4 w-64">
    Select a country and <br /> you'll get a notification
    <Select class="mt-2" items={countries} bind:value={selectedCountry} />
</Label>

{#key selectedCountry}
    {#if selectedCountry}
        <Toast color="green" position="bottom-left" class="max-w-xs sm:max-w-fit">
            <svelte:fragment slot="icon">
                <CheckCircleSolid class="w-5 h-5" />
                <span class="sr-only">Check icon</span>
            </svelte:fragment>
            You succesfully selected the country {country(selectedCountry).name} with code {selectedCountry}!
        </Toast>
    {/if}
{/key}

<Label class="my-4 w-96">
    What do you wanna order?
    <MultiSelect class="mt-2" items={food} />
</Label>

<Label class="flex flex-col gap-1 my-4">
    Check us
    <Checkbox>Check me!</Checkbox>
    <Checkbox checked>Check me too!</Checkbox>
</Label>

<Label class="my-4">
    Range
    <Range value={50} />
</Label>

<Button id="btn">
    Dropdown button
    <ChevronDownSolid class="w-3 h-3 ml-2 text-white dark:text-white" />
</Button>
<Dropdown>
    <DropdownItem>Dashboard</DropdownItem>
    <DropdownItem class="flex items-center justify-between">
        Dropdown<ChevronRightSolid class="w-3 h-3 ml-2 text-primary-700 dark:text-white" />
    </DropdownItem>
    <Dropdown placement="right-start">
        <DropdownItem>Overview</DropdownItem>
        <DropdownItem>My downloads</DropdownItem>
        <DropdownItem>Billing</DropdownItem>
    </Dropdown>
    <DropdownItem>Earnings</DropdownItem>
    <DropdownItem slot="footer">Sign out</DropdownItem>
</Dropdown>
<Tooltip triggeredBy="[id^='btn']">Tooltip content</Tooltip>

<Button on:click={() => (showModal = true)}>Show modal</Button>

<Button on:click={showNativeNotification}>Show native notification</Button>

<Modal title="Terms of Service" bind:open={showModal} autoclose outsideclose>
    <p class="text-base leading-relaxed text-gray-500 dark:text-gray-400">
        With less than a month to go before the European Union enacts new consumer privacy laws for
        its citizens, companies around the world are updating their terms of service agreements to
        comply.
    </p>
    <p class="text-base leading-relaxed text-gray-500 dark:text-gray-400">
        The European Union’s General Data Protection Regulation (G.D.P.R.) goes into effect on May
        25 and is meant to ensure a common set of data rights in the European Union. It requires
        organizations to notify users as soon as possible of high-risk data breaches that could
        personally affect them.
    </p>
    <p class="text-base leading-relaxed text-gray-500 dark:text-gray-400">
        With less than a month to go before the European Union enacts new consumer privacy laws for
        its citizens, companies around the world are updating their terms of service agreements to
        comply.
    </p>
    <p class="text-base leading-relaxed text-gray-500 dark:text-gray-400">
        The European Union’s General Data Protection Regulation (G.D.P.R.) goes into effect on May
        25 and is meant to ensure a common set of data rights in the European Union. It requires
        organizations to notify users as soon as possible of high-risk data breaches that could
        personally affect them.
    </p>
    <p class="text-base leading-relaxed text-gray-500 dark:text-gray-400">
        With less than a month to go before the European Union enacts new consumer privacy laws for
        its citizens, companies around the world are updating their terms of service agreements to
        comply.
    </p>
    <p class="text-base leading-relaxed text-gray-500 dark:text-gray-400">
        The European Union’s General Data Protection Regulation (G.D.P.R.) goes into effect on May
        25 and is meant to ensure a common set of data rights in the European Union. It requires
        organizations to notify users as soon as possible of high-risk data breaches that could
        personally affect them.
    </p>
    <p class="text-base leading-relaxed text-gray-500 dark:text-gray-400">
        With less than a month to go before the European Union enacts new consumer privacy laws for
        its citizens, companies around the world are updating their terms of service agreements to
        comply.
    </p>
    <p class="text-base leading-relaxed text-gray-500 dark:text-gray-400">
        The European Union’s General Data Protection Regulation (G.D.P.R.) goes into effect on May
        25 and is meant to ensure a common set of data rights in the European Union. It requires
        organizations to notify users as soon as possible of high-risk data breaches that could
        personally affect them.
    </p>
    <p class="text-base leading-relaxed text-gray-500 dark:text-gray-400">
        With less than a month to go before the European Union enacts new consumer privacy laws for
        its citizens, companies around the world are updating their terms of service agreements to
        comply.
    </p>
    <p class="text-base leading-relaxed text-gray-500 dark:text-gray-400">
        The European Union’s General Data Protection Regulation (G.D.P.R.) goes into effect on May
        25 and is meant to ensure a common set of data rights in the European Union. It requires
        organizations to notify users as soon as possible of high-risk data breaches that could
        personally affect them.
    </p>
    <p class="text-base leading-relaxed text-gray-500 dark:text-gray-400">
        With less than a month to go before the European Union enacts new consumer privacy laws for
        its citizens, companies around the world are updating their terms of service agreements to
        comply.
    </p>
    <p class="text-base leading-relaxed text-gray-500 dark:text-gray-400">
        The European Union’s General Data Protection Regulation (G.D.P.R.) goes into effect on May
        25 and is meant to ensure a common set of data rights in the European Union. It requires
        organizations to notify users as soon as possible of high-risk data breaches that could
        personally affect them.
    </p>
    <p class="text-base leading-relaxed text-gray-500 dark:text-gray-400">
        With less than a month to go before the European Union enacts new consumer privacy laws for
        its citizens, companies around the world are updating their terms of service agreements to
        comply.
    </p>
    <p class="text-base leading-relaxed text-gray-500 dark:text-gray-400">
        The European Union’s General Data Protection Regulation (G.D.P.R.) goes into effect on May
        25 and is meant to ensure a common set of data rights in the European Union. It requires
        organizations to notify users as soon as possible of high-risk data breaches that could
        personally affect them.
    </p>
    <svelte:fragment slot="footer">
        <Button on:click={() => alert('Handle "success"')}>I accept</Button>
        <Button color="alternative" on:click={() => (showModal = false)}>Decline</Button>
    </svelte:fragment>
</Modal>

<ol class="flex items-center my-4">
    <li class="relative w-full mb-6">
        <div class="flex items-center">
            <Indicator
                size="xl"
                color="none"
                class="bg-primary-200 dark:bg-primary-900 z-10 ring-0 ring-white sm:ring-8 dark:ring-gray-900 shrink-0"
            >
                <CheckCircleSolid class="w-6 h-6 text-primary-600 dark:text-primary-300" />
            </Indicator>
            <div class="flex w-full bg-gray-200 h-0.5 dark:bg-gray-700" />
        </div>
        <div class="mt-3">
            <h3 class="font-medium text-gray-900 dark:text-white">Step 1</h3>
        </div>
    </li>
    <li class="relative w-full mb-6">
        <div class="flex items-center">
            <Indicator
                size="xl"
                color="none"
                class="bg-primary-200 dark:bg-primary-900 z-10 ring-0 ring-white sm:ring-8 dark:ring-gray-900 shrink-0"
            >
                <CheckCircleSolid class="w-6 h-6 text-primary-600 dark:text-primary-300" />
            </Indicator>
            <div class="flex w-full bg-gray-200 h-0.5 dark:bg-gray-700" />
        </div>
        <div class="mt-3">
            <h3 class="font-medium text-gray-900 dark:text-white">Step 2</h3>
        </div>
    </li>
    <li class="relative w-full mb-6">
        <div class="flex items-center">
            <Indicator
                size="xl"
                color="none"
                class="bg-primary-200 dark:bg-primary-900 z-10 ring-0 ring-white sm:ring-8 dark:ring-gray-900 shrink-0"
            >
                <CheckCircleSolid class="w-6 h-6 text-primary-600 dark:text-primary-300" />
            </Indicator>
            <div class="flex w-full bg-gray-200 h-0.5 dark:bg-gray-700" />
        </div>
        <div class="mt-3">
            <h3 class="font-medium text-gray-900 dark:text-white">Step 2</h3>
        </div>
    </li>
    <li class="relative w-full mb-6">
        <div class="flex items-center">
            <Indicator
                size="xl"
                color="gray"
                class="dark:bg-gray-700 z-10 ring-0 ring-white sm:ring-8 dark:ring-gray-900 shrink-0"
            >
                <CheckCircleSolid class="w-6 h-6 text-gray-800 dark:text-gray-300" />
            </Indicator>
        </div>
        <div class="mt-3">
            <h3 class="font-medium text-gray-900 dark:text-white">Step 3</h3>
        </div>
    </li>
</ol>

<TableSearch placeholder="Search by maker name" hoverable={true} bind:inputValue={$searchTerm}>
    <TableHead>
        <TableHeadCell on:click={() => sortTable('id')}>ID</TableHeadCell>
        <TableHeadCell on:click={() => sortTable('maker')}>Maker</TableHeadCell>
        <TableHeadCell on:click={() => sortTable('type')}>Type</TableHeadCell>
        <TableHeadCell on:click={() => sortTable('make')}>Make</TableHeadCell>
    </TableHead>
    <TableBody>
        {#each $searchedItems as item}
            <TableBodyRow>
                <TableBodyCell>{item.id}</TableBodyCell>
                <TableBodyCell>{item.maker}</TableBodyCell>
                <TableBodyCell>{item.type}</TableBodyCell>
                <TableBodyCell>{item.make}</TableBodyCell>
            </TableBodyRow>
        {/each}
    </TableBody>
</TableSearch>

<Dropzone
    class="my-4"
    on:drop={dropHandle}
    on:dragover={(event) => {
        event.preventDefault();
    }}
    on:change={handleChange}
>
    <svg
        aria-hidden="true"
        class="mb-3 w-10 h-10 text-gray-400"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
        xmlns="http://www.w3.org/2000/svg"
        ><path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
        /></svg
    >
    {#if dropzoneValue.length === 0}
        <p class="mb-2 text-sm text-gray-500 dark:text-gray-400">
            <span class="font-semibold">Click to upload</span> or drag and drop
        </p>
        <p class="text-xs text-gray-500 dark:text-gray-400">
            SVG, PNG, JPG or GIF (MAX. 800x400px)
        </p>
    {:else}
        <p>{showFiles(dropzoneValue)}</p>
    {/if}
</Dropzone>

<TextPlaceholder class="mt-8 mb-6" />

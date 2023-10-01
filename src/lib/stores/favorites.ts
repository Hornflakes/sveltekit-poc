import type { Country } from '$lib/models/country';
import { writable } from 'svelte/store';

export const favorites = (() => {
    const { subscribe, set, update } = writable<Record<string, Country>>({});

    return {
        subscribe,
        add: (country: Country) =>
            update((countries) => {
                return { ...countries, [country.name]: country };
            }),
        remove: (country: Country) =>
            update((countries) => {
                const { [country.name]: _, ...otherCountries } = countries;
                return otherCountries;
            }),
        reset: () => set({}),
    };
})();

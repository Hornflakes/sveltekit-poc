import type { Country } from '$lib/models/country';
import { writable } from 'svelte/store';

export const favorites = (() => {
    const { subscribe, set, update } = writable<Record<string, Country>>({});

    return {
        subscribe,
        toggle: (country: Country) =>
            update((countries) => {
                if (!countries[country.name]) return { ...countries, [country.name]: country };

                const { [country.name]: _, ...otherCountries } = countries;
                return otherCountries;
            }),
        reset: () => set({}),
    };
})();

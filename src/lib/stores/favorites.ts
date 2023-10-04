import { browser } from '$app/environment';
import type { Country } from '$lib/models/country';
import { getContext, setContext } from 'svelte';
import { writable } from 'svelte/store';

const initialFavorites = () => {
    if (browser) {
        return JSON.parse(localStorage?.getItem('favorites') ?? '{}');
    }
    return {};
};

const createFavorites = () => {
    const { subscribe, set, update } = writable<Record<string, Country>>(initialFavorites());

    return {
        subscribe,
        addCountries: (newCountries: Record<string, Country>) =>
            update((countries) => {
                return { ...countries, ...newCountries };
            }),
        toggle: (country: Country) =>
            update((countries) => {
                if (!countries[country.name]) return { ...countries, [country.name]: country };

                const { [country.name]: _, ...otherCountries } = countries;
                return otherCountries;
            }),
        reset: () => set({}),
    };
};

const contextKey = Symbol();

export const setFavoritesContext = () => {
    const favorites = createFavorites();
    setContext(contextKey, favorites);

    if (browser) {
        favorites.subscribe((state) => {
            localStorage.setItem('favorites', JSON.stringify(state));
        });
    }
};

export const getFavoritesContext = () => {
    return getContext<ReturnType<typeof createFavorites>>(contextKey);
};

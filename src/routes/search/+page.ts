import { adaptCountries } from '$lib/models/country';

export const load = async ({ fetch, url }) => {
    const name = url.searchParams.get('name');

    if (!name) return { countries: [] };

    const response = await fetch(`https://restcountries.com/v3.1/name/${name}`);

    if (response.status === 404) return { countries: [], noResults: true };

    const countries = await response.json();
    return { countries: adaptCountries(countries) };
};

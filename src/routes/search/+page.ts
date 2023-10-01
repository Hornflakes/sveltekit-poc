import type { PageLoad } from './$types';

export const load: PageLoad = async ({ fetch, url }) => {
    const name = url.searchParams.get('name');

    if (!name) return { countries: [] };

    const response = await fetch(`https://restcountries.com/v3.1/name/${name}`);

    if (response.status === 404) return { countries: [], noResults: true };

    const countries = response.json();
    return { countries };
};

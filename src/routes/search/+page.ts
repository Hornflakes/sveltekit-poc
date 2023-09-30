import type { PageLoad } from './$types';

export const load: PageLoad = async ({ fetch }) => {
    const response = await fetch('');
    const countries = await response.json();

    return { countries };
};

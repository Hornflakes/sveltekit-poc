import { redirect } from '@sveltejs/kit';

export const load = async () => {
    throw redirect(302, '/');
};

export const actions = {
    default: ({ cookies }) => {
        cookies.delete('session', {
            path: '/',
        });

        throw redirect(302, '/login');
    },
};

import { db } from '$lib/server/database/database';

export const handle = async ({ event, resolve }) => {
    const session = event.cookies.get('session');
    if (!session) {
        return await resolve(event);
    }

    const user = await db.user.findUnique({
        where: { authToken: session },
        select: { name: true, role: true },
    });
    if (user) {
        event.locals.user = {
            name: user.name,
            role: user.role.name,
        };
    }
    return await resolve(event);
};

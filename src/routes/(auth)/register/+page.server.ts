import { db } from '$lib/server/database/database.js';
import { fail, redirect } from '@sveltejs/kit';
import bcrypt from 'bcrypt';

export const actions = {
    default: async ({ request }) => {
        const data = await request.formData();
        const username = data.get('username');
        const password = data.get('password');

        if (
            typeof username !== 'string' ||
            typeof password !== 'string' ||
            !username ||
            !password
        ) {
            return fail(400, { invalid: true });
        }

        const user = await db.user.findUnique({
            where: { name: username },
        });

        if (user) {
            return fail(409, { usernameTaken: true, username: username, password: password });
        }

        await db.user.create({
            data: {
                name: username,
                passwordHash: await bcrypt.hash(password, 10),
                authToken: crypto.randomUUID(),
            },
        });

        throw redirect(303, '/login');
    },
};

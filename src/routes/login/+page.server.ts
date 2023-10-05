import { db } from '$lib/database/database.js';
import { fail, redirect } from '@sveltejs/kit';
import bcrypt from 'bcrypt';

export const actions = {
    default: async ({ request, cookies }) => {
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

        if (!user) {
            return fail(401, { credentials: true });
        }

        const isPasswordRight = await bcrypt.compare(password, user.passwordHash);

        if (!isPasswordRight) {
            return fail(400, { credentials: true });
        }

        const authenticatedUser = await db.user.update({
            where: { name: user.name },
            data: { authToken: crypto.randomUUID() },
        });

        cookies.set('session', authenticatedUser.authToken, {
            path: '/',
            httpOnly: true,
            sameSite: 'strict',
            secure: process.env.NODE_ENV === 'production',
            maxAge: 60 * 60 * 24 * 30,
        });

        throw redirect(303, '/');
    },
};

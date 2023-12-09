import { PrismaClient, Roles } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
    const roles: Roles[] = [
        {
            id: 1,
            name: 'ADMIN',
        },
        {
            id: 2,
            name: 'USER',
        },
    ];

    for (const role of roles) {
        await prisma.roles.create({
            data: role,
        });
    }
}

main()
    .catch((err) => {
        console.log(err);
        throw err;
    })
    .finally(async () => {
        await prisma.$disconnect();
    });

import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const main = async () => {
  const user = await prisma.user.create({
    data: {
      name: "John Doe",
      email: "john.doe@gmail.com",
      avatarUrl: "https://github.com/felipeaz3vedo.png"
    }
  });

  const pool = await prisma.pool.create({
    data: {
      title: "Example Pool",
      code: "BOL123",
      ownerId: user.id,

      participants: {
        create: {
          userId: user.id
        }
      }
    }
  });

  await prisma.game.create({
    data: {
      date: "2022-12-02T12:00:00.970Z",
      firstTeamCountryCode: "DE",
      secondTeamCountryCode: "BR"
    }
  });

  await prisma.game.create({
    data: {
      date: "2022-12-03T12:00:00.970Z",
      firstTeamCountryCode: "BR",
      secondTeamCountryCode: "AR",

      guesses: {
        create: {
          firstTeamPoints: 2,
          secondTeamPoints: 1,

          participant: {
            connect: {
              userId_poolId: {
                userId: user.id,
                poolId: pool.id
              }
            }
          }
        }
      }
    }
  });
};

main();
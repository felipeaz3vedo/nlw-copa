import { FastifyInstance } from "fastify";
import { z } from "zod";

export const authRoutes = async (fastify: FastifyInstance) => {
  fastify.post("/users", async request => {
    const createUserBody = z.object({
      acess_token: z.string()
    });

    const { acess_token } = createUserBody.parse(request.body);

    const userResponse = await fetch(
      "https://www.googleapis.com/oauth2/v2/userinfo",
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${acess_token}`
        }
      }
    );

    const userData = await userResponse.json();

    const userInfoSchema = z.object({
      id: z.string(),
      email: z.string().email(),
      name: z.string(),
      picture: z.string().url()
    });

    const userInfo = userInfoSchema.parse(userData);

    return { userInfo };
  });
};

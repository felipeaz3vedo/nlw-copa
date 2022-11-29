import { FastifyRequest } from "fastify";

// middleware

export const authenticate = async (request: FastifyRequest) => {
  await request.jwtVerify();
};

import Fastify from "fastify";
import cors from "@fastify/cors";

async function bootstrap() {
  const fastify = Fastify({
    logger: true
  });

  await fastify.register(cors, {
    origin: true
  });

  fastify.get("/pools/count", () => {
    return { count: 0 };
  });

  await fastify.listen({ port: 3333, host: '0.0.0.0' });
}

bootstrap();

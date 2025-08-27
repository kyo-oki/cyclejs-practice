import { ApolloServer } from "@apollo/server";
import { expressMiddleware } from "@as-integrations/express5";
import express from "express";
import http from "http";
import cors from "cors";
import bodyParser from "body-parser";
import { ApolloServerPluginDrainHttpServer } from "@apollo/server/plugin/drainHttpServer";

import { typeDefs } from "./gql/typeDefs.js";
import { resolvers } from "./gql/resolvers.js";

async function start() {
  const app = express();
  const httpServer = http.createServer(app);
  const server = new ApolloServer({
    typeDefs,
    resolvers,
    plugins: [ApolloServerPluginDrainHttpServer({ httpServer })],
  });
  await server.start();
  app.use("/graphql", cors(), bodyParser.json(), expressMiddleware(server));
  await new Promise<void>((resolve) =>
    httpServer.listen({ port: 4000 }, resolve)
  );
  console.log("http://localhost:4000/graphql");
}

start();

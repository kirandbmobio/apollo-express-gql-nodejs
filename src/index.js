import express from "express";
import { success, error } from "consola";
import { PORT, IN_PROD, DB } from "./config";
import { ApolloServer, gql } from "apollo-server-express";
import { typeDefs, resolvers } from "./graphql";
import mongoose from "mongoose";
import * as AppModels from "./models";
/* initialize the Express Application */
const app = express();

const server = new ApolloServer({
  typeDefs,
  resolvers,
  playground: IN_PROD,
  context: {
    ...AppModels,
  },
});

const startApp = async () => {
  try {
    await mongoose.connect(DB, {
      useNewUrlParser: true,
      useFindAndModify: true,
      useUnifiedTopology: true,
    });
    success({
      badge: true,
      message: "Successfully connected with the Database",
    });
    //Inject Apollo server middleware on Express App
    server.applyMiddleware({ app });
    app.listen(PORT, () =>
      success({ badge: true, message: `Server Started On ${PORT}` })
    );
  } catch (err) {
    error({ badge: true, message: err.message });
  }
};

startApp();

import express from "express";
import { success, error } from "consola";
import { PORT, IN_PROD, DB } from "./config";
import { ApolloServer } from "apollo-server-express";
import { typeDefs, resolvers } from "./graphql";
import mongoose from "mongoose";
import * as AppModels from "./models";
import { join } from "path";
import { schemaDirectives } from "./graphql/directives";
import AuthMiddleware from "./middlewares/auth";
/* initialize the Express Application */
const app = express();
app.use(AuthMiddleware);
app.use(express.static(join(__dirname, "./uploads")));

const server = new ApolloServer({
  typeDefs,
  resolvers,
  schemaDirectives,
  playground: IN_PROD,
  context: (req) => {
    let { isAuth, user } = req;
    return {
      req,
      isAuth,
      user,
      ...AppModels,
    };
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

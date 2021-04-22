import { ApolloError } from "apollo-server-errors";
import { hash, compare } from "bcryptjs";

import { issueJwtToken, serializeUser } from "../../functions";

export default {
  Query: {
    userInfo: () => "This is user resolver",
    authenticateUser: async (_, { username, password }, { User }) => {
      try {
        //Find user by username
        let user = await User.findOne({ username });
        if (!user) {
          throw new Error("Username not found!");
        }

        //check for the password
        let isMatch = await compare(password, user.password);
        if (!isMatch) {
          throw new Error("Incorrect Password!");
        }

        //serialize user
        user = await serializeUser(user.toObject());

        // Issue new Authentication token
        let token = await issueJwtToken(user);
        return { token, user };
      } catch (err) {
        throw new ApolloError(err.message, 403);
      }
    },
  },

  Mutation: {
    registerUser: async (_, { newUser }, { User }) => {
      try {
        let { username, email } = newUser;
        //First check if username is already taken
        let usernameExist = await User.findOne({ username });
        if (usernameExist) {
          throw new Error("Username is already taken");
        }
        let emailExit = await User.findOne({ email });
        if (emailExit) {
          throw new Error("Email is already registered.");
        }
        let user = new User(newUser);
        user.password = await hash(newUser.password, 10);
        let result = await user.save();
        result = result.toObject();
        // result.id = result._id;
        result = await serializeUser(result);

        let token = await issueJwtToken(result);
        return { token, user: result };
      } catch (err) {
        // throw new ApolloError(err.message, 400);
        return err;
      }
    },
  },
};

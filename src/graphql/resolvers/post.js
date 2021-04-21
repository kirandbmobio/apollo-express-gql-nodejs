export default {
  Query: {
    hello: () => "Hello from GraphQL.",
    getAllPosts: async (_, {}, { Post }) => {
      try {
        let result = await Post.find();
        return result;
      } catch (err) {
        return err;
      }
    },
  },
  Mutation: {
    createNewPost: async (_, { newPost }, { Post }) => {
      try {
        let result = await Post.create(newPost);
        return result;
      } catch {
        return err;
      }
    },
  },
};

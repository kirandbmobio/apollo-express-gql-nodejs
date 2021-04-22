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
    getPostById: async (_, { id }, { Post }) => {
      try {
        let result = await Post.findById(id);
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
    editPostById: async (_, { updatedPost, id }, { Post }) => {
      try {
        let result = await Post.findByIdAndUpdate(
          id,
          { ...updatedPost },
          { new: true }
        );
        return result;
      } catch (err) {
        return err;
      }
    },
    deletePostById: async (_, { id }, { Post }) => {
      try {
        let result = await Post.findByIdAndDelete(id);
        return {
          message: "Post is Deleted Successfully",
          success: true,
          id: result._id,
        };
      } catch (err) {
        return err;
      }
    },
  },
};

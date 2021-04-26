import { ApolloError } from "apollo-server-express";

import { NewPostValidationRules } from "../../validators";

const myCustomLabels = {
  totalDocs: "itemCount",
  docs: "itemsList",
  limit: "perPage",
  page: "currentPage",
  nextPage: "next",
  prevPage: "prev",
  totalPages: "pageCount",
  pagingCounter: "slNo",
  meta: "paginator",
};

export default {
  Query: {
    hello: () => "Hello from GraphQL.",
    getAllPosts: async (_, {}, { Post }) => {
      try {
        let result = await Post.find();
        await result.populate("author").execPopulate();
        return result;
      } catch (err) {
        return err;
      }
    },
    getPostById: async (_, { id }, { Post }) => {
      try {
        let result = await Post.findById(id);
        if (!result) {
          throw new Error("Post not found.");
        }
        await result.populate("author").execPopulate();
        return result;
      } catch (err) {
        throw new ApolloError(err.message, 403);
      }
    },
    getPostsByPageAndLimit: async (_, { page, limit }, { Post }) => {
      try {
        const options = {
          page: page || 1,
          limit: limit || 10,
          populate: "author",
          customLabels: myCustomLabels,
        };
        let posts = await Post.paginate({}, options);
        let payload = {
          posts: posts.itemsList,
          paginator: posts.paginator,
        };
        return payload;
      } catch (err) {
        return err;
      }
    },
  },

  Mutation: {
    createNewPost: async (
      _,
      { newPost },
      {
        Post,
        req: {
          req: { user },
        },
      }
    ) => {
      try {
        await NewPostValidationRules.validate(newPost, { abortEarly: false });
        let result = await Post.create({
          ...newPost,
          author: user._id.toString(),
        });
        await result.populate("author").execPopulate();
        return result;
      } catch (err) {
        console.log(err);
        return err;
      }
    },
    editPostById: async (
      _,
      { updatedPost, id },
      {
        Post,
        req: {
          req: { user },
        },
      }
    ) => {
      try {
        await NewPostValidationRules.validate(updatedPost, {
          abortEarly: false,
        });
        let result = await Post.findOneAndUpdate(
          { _id: id, author: user._id.toString() },
          { ...updatedPost },
          { new: true }
        );
        if (!result) {
          throw new Error("Unable to edit the post.");
        }

        await result.populate("author").execPopulate();
        return result;
      } catch (err) {
        throw new ApolloError(err.message, 403);
      }
    },
    deletePostById: async (
      _,
      { id },
      {
        Post,
        req: {
          req: { user },
        },
      }
    ) => {
      try {
        let result = await Post.findOneAndDelete({
          _id: id,
          author: user._id.toString(),
        });
        if (!result) {
          throw new Error("Unable to delete the post.");
        }
        return {
          message: "Post is Deleted Successfully",
          success: true,
          id: result._id,
        };
      } catch (err) {
        throw new ApolloError(err.message, 403);
      }
    },
  },
};

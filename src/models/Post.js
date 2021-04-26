import { model, Schema } from "mongoose";

const mongoosePaginate = require("mongoose-paginate-v2");

const PostSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
    },
    content: {
      type: String,
      required: true,
    },
    featuredImage: {
      type: String,
      required: false,
    },
    author: {
      type: Schema.Types.ObjectId,
      ref: "users",
    },
  },
  { timestamps: true }
);

PostSchema.plugin(mongoosePaginate);

const Post = model("posts", PostSchema);

export default Post;

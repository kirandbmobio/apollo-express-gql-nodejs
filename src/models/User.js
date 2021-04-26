import { Schema, model } from "mongoose";

const mongoosePaginate = require("mongoose-paginate-v2");

const userSchema = new Schema(
  {
    username: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    firstName: {
      type: String,
      required: true,
    },
    lastName: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    avatarImage: {
      type: String,
      default: "http://localhost:4000/kitchen-1619093144763.jpeg",
    },
  },

  { timestamps: true }
);

userSchema.plugin(mongoosePaginate);

const User = model("users", userSchema);

export default User;

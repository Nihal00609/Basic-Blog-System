import mongoose from "mongoose";

const postSchema = new mongoose.Schema({
  title: String,
  content: String,
  author: String,
  authorId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  comments: [
    {
      commenter: String,
      comment: String,
    },
  ],
});

export const Post = mongoose.model("Post", postSchema);

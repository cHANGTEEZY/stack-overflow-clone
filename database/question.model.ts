import { Schema, model, models, Types } from "mongoose";

interface IQuestion {
  title: string;
  views: number;
  answers: number;
  downvotes: number;
  tags: Types.ObjectId[];
  content: string;
  upvotes: number;
  author: Types.ObjectId;
}

const QuestionSchema = new Schema<IQuestion>(
  {
    title: {
      type: "string",
      required: true,
    },
    author: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    views: {
      type: "number",
      default: 0,
    },
    answers: {
      type: "number",
    },
    downvotes: {
      type: "number",
      default: 0,
    },
    tags: [{ type: Schema.Types.ObjectId, ref: "Tag" }],
    content: {
      type: "string",
    },
    upvotes: {
      type: "number",
      default: 0,
    },
  },
  {
    timestamps: true,
  }
);

const Question =
  models?.Question || model<IQuestion>("Question", QuestionSchema);

export default Question;

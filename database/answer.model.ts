import { Schema, model, models, Types } from "mongoose";

export interface IAnswer {
  author: Types.ObjectId;
  question: Types.ObjectId;
  content: string;
  upvotes: number;
  downvotes: number;
}

const AnswerSchema = new Schema(
  {
    Autor: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    question: {
      type: Schema.Types.ObjectId,
      ref: "Question",
      required: true,
    },
    content: {
      type: "string",
      required: true,
    },
    upvotes: {
      type: "number",
      default: 0,
    },
    downvotes: {
      type: "number",
      default: 0,
    },
  },
  {
    timestamps: true,
  }
);

const Answer = models?.Answer || model("Answer", AnswerSchema);

export default Answer;

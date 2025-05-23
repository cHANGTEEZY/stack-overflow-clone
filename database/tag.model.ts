import { Schema, model, models, Types } from "mongoose";

interface ITag {
  name: string;
  description: string;
  questions: number;
}

const TagSchema = new Schema<ITag>({
  name: {
    type: String,
    required: true,
  },
  questions: { type: Number, default: 0 },
});

const Tag = models?.Tag || model<ITag>("Tag", TagSchema);

export default Tag;

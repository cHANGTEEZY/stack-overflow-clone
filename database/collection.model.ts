import { Schema, model, models, Types } from "mongoose";

interface ICollection {
  author: Types.ObjectId;
  question: Types.ObjectId;
}

const CollectionSchema = new Schema<ICollection>({
  author: { type: Schema.Types.ObjectId, ref: "User", required: true },
  question: {
    type: Schema.Types.ObjectId,
    required: true,
    ref: "Question",
  },
});

const Collection =
  models?.Collection || model<ICollection>("Collection", CollectionSchema);

export default Collection;

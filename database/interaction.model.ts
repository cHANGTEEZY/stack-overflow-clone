import { Types, Schema, model, models } from "mongoose";

interface IInteraction {
  user: Types.ObjectId;
  action: string;
  actionId: Types.ObjectId;
  actionType: "question" | "answer";
}

const InteractionSchema = new Schema<IInteraction>({
  user: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  action: {
    type: String,
    required: true,
  },
  actionId: {
    type: Schema.Types.ObjectId,
    required: true,
  },
  actionType: {
    type: String,
    enum: ["question", "answer"],
    required: true,
  },
});

const Interaction =
  models?.Interaction || model<IInteraction>("Interaction", InteractionSchema);

export default Interaction;

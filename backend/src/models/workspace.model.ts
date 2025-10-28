import mongoose,{Document,Schema} from "mongoose";
import { generateInviteCode } from "../utils/uuid";

export interface WorkspaceDocument extends Document {
    name:string;
    description?:string;
    owner:mongoose.Types.ObjectId; //"owner" ek MongoDB ObjectId type ki value rakhega
    inviteCode:string;
    createdAt:Date;
    updatedAt:Date;
}

const workspaceSchema = new Schema<WorkspaceDocument>( //schema mongo ki class hai jo document ka structure define karta hai
  {
    name: { type: String, required: true, trim: true },
    description: { type: String, required: false },
    owner: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User", // Reference to User model (the workspace creator)
      required: true,
    },
    inviteCode: {
      type: String,
      required: true,
      unique: true,
      default: generateInviteCode,
    },
  },
  {
    timestamps: true, //har document me createdAt aur updatedAt fields automatically add kar de.
  }
);
// const userSchema = new Schema(
//   { ...schema fields... },
//   { ...schema options... }
// );

//method to reset invite code diya hai workspace schema ko
workspaceSchema.methods.resetInviteCode = function () {
  this.inviteCode = generateInviteCode();
};

const WorkspaceModel = mongoose.model<WorkspaceDocument>(
  "Workspace",
  workspaceSchema
);

export default WorkspaceModel;
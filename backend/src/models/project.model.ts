import mongoose, {Document,Schema,Model} from "mongoose";
//Schema class hai jo document ke structure ko define karta hai
//Model = interface jo mongoose model ke methods ko define karta hai

//Interface = “Rules / shape batata hai ki ek object ke andar kya hona chahiye.”
export interface ProjectDocument extends Document{
    name: string;
    description: string | null; // Optional description for the project
    emoji: string;
    workspace: mongoose.Types.ObjectId;
    createdBy: mongoose.Types.ObjectId;
    createdAt: Date;
    updatedAt: Date;
}// compile time pe type checking ke liye hai ye

const projectSchema= new Schema<ProjectDocument>(
      {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    emoji: {
      type: String,
      required: false,
      trim: true,
      default: "📊",
    },
    description: { type: String, required: false },
    workspace: {
      type: Schema.Types.ObjectId,
      ref: "Workspace",
      required: true,
    },
    createdBy: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
    {
    timestamps: true,
  }
)//runtime pe document ka structure define karta hai ye or validation bhi karta hai

// Code me spelling mistake bhi nahi pakdega
// Wrong data types pass kare to bhi compile ho jayega
// Runtime pe crash ho sakta hai (bina warning)

const projectModel = mongoose.model<ProjectDocument>("Project",projectSchema);//yaha Model replace nahi karsakte woh interface hai or mongoose.model method ko hi call karna hai

export default projectModel;
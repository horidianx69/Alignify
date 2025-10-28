import mongoose, { Document, Schema } from "mongoose";
import { compareValue, hashValue } from "../utils/bcrypt";


//“My User has these fields and it’s a Mongoose document (so it will also have _id, .save(), .toObject(), etc).”
//interface is “Any object that says it's a UserDocument must have these properties.” interface = jaise ek blueprint ya rule book.
export interface UserDocument extends Document {
  name: string;
  email: string;
  password?: string;
  profilePicture: string | null;
  isActive: boolean;
  lastLogin: Date | null;
  createdAt: Date;
  updatedAt: Date;
  currentWorkspace: mongoose.Types.ObjectId | null;
  comparePassword(value: string): Promise<boolean>;
  omitPassword(): Omit<UserDocument, "password">;
}

const userSchema = new Schema<UserDocument>(
  {
    name: {
      type: String,
      required: false,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      lowercase: true,
    },
    password: { type: String, select: true },
    profilePicture: {
      type: String,
      default: null,
    },
    currentWorkspace: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Workspace",
    },
    isActive: { type: Boolean, default: true },
    lastLogin: { type: Date, default: null },
  },
  {
    timestamps: true,
  }
);
//middleware to change password to hashed password before saving to database
userSchema.pre("save", async function (next) {
  if (this.isModified("password")) {
    if (this.password) {
      this.password = await hashValue(this.password);
    }
  }
  next();
});
//Ab agar tum chaho ki har document ke paas kuch custom methods (functions) ho —
// toh wo methods schema ke methods object me likhe jaate hain.
userSchema.methods.omitPassword = function (): Omit<UserDocument, "password"> {
  const userObject = this.toObject();
  delete userObject.password;
  return userObject;
};

userSchema.methods.comparePassword = async function (value: string) {
  return compareValue(value, this.password);
};

const UserModel = mongoose.model<UserDocument>("User", userSchema);
export default UserModel;

// const user = {
//   name: "Ayush",
//   email: "ayush@gmail.com",
// };

// type UserType = typeof user;

//ab UserType ka matlab hoga ek object jisme do properties hain
// {
//   name: string;
//   email: string;
// }

//I can use this UserType to type other objects
// const anotherUser: UserType = {
//   name: "Shukla",
//   email: "shukla@gmail.com",
// };



// Jab tu mongoose.model() banata hai,

// Tu chaahta hai TypeScript ko already pata ho ke “user ke andar kya kya fields hone chahiye”

// Without actually having an object yet..extends se combine kar sakta hai (e.g. extends Document)..Required, kyunki Document se inherit karna padta

// Agar tu typeof user use karega, to pehle ek sample user object banana padega — jo bekaar hai, aur runtime me kaam nahi aayega.


// In Mongoose, a Model is like the blueprint or controller for an entire MongoDB collection — it represents the whole table (e.g. all users) and lets you search, create, delete, or update records directly. Common model methods include: find(), findOne(), findById(), create(), updateOne(), findByIdAndUpdate(), deleteOne(), and deleteMany().
// A Document, on the other hand, is a single record (one row) created using that model — for example, one user fetched from the database. Each document has instance-level methods that act on that specific record, such as save(), remove(), deleteOne(), populate(), and toObject().
// In short: Model = full collection (find/create/update/delete), Document = single record (save/remove/populate) — model works at the “table” level, document works at the “row” level.


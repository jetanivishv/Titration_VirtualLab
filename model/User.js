import mongoose from "mongoose";
const { Schema } = mongoose;
import passportLocalMongoose from "passport-local-mongoose";

const userSchema = new Schema({
  google: {
    name: {
      type: String,
    },
    email: {
      type: String,
    },
  },
  email: {
    type: String,
    unique: true,
  },
  isValid: {
    type: Boolean,
    default: false,
  },
  uniqueString: {
    type: String,
  },
});

userSchema.plugin(passportLocalMongoose);

const User = mongoose.model("User", userSchema);
export default User;

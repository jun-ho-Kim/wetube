import mongoose from "mongoose";
import passportLocalMongoose from "passport-local-mongoose";

const UserSchema = new mongoose.Schema({
    name: String,
    email: String,
    avatarUrl: String,
    facebookId: Number,
    githubId: Number,
    comments: [
        {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Comment"
    }
],
    videos: [
        {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Video"
    }
]
});

UserSchema.plugin(passportLocalMongoose, {usernameField: "email"});
// ㄴ usernameFild 는 passportLocalMongoose Option 이다.
const model = mongoose.model("User", UserSchema);
export default model;
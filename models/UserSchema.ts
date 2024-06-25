import mongoose from "mongoose";


interface IUser {
    fName: string;
    lName: string;
    email: string;
    username: string;
    pass: string;
}


const UserSchema = new mongoose.Schema<IUser>(
    {
        fName: { type: String, required: true, maxlength: 20 },
        lName: { type: String, required: true, maxlength: 20 },
        email: { type: String, required: true, maxlength: 30, unique: true },
        username: { type: String, required: true, maxlength: 20, unique: true },
        pass: { type: String, required: true },
    }, { timestamps: true }
)


export const User = mongoose.models.Users || mongoose.model('Users', UserSchema)
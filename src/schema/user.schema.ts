import bcrypt from 'bcryptjs';
import mongoose, { Document } from 'mongoose';

export interface IUser extends Document {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  mobileNumber: string;
  isEmailVerified: boolean;
  isValidPassword: (password: string) => Promise<boolean>;
}

const userSchema = new mongoose.Schema<IUser>(
  {
    firstName: {
      type: String,
      trim: true,
      required: [true, 'First name is required'],
    },
    lastName: {
      type: String,
      trim: true,
      required: [true, 'Last name is required'],
    },
    email: {
      type: String,
      trim: true,
      index: true,
      unique: true,
      required: [true, 'Email is required'],
    },
    password: {
      type: String,
      select: false,
      required: [true, 'Password is required'],
    },
    mobileNumber: {
      type: String,
      required: [true, 'Mobile number is required'],
    },
    isEmailVerified: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

userSchema.pre<IUser>('save', async function (next) {
  if (this.isModified('password')) {
    this.password = await bcrypt.hash(this.password, 12);
  }

  next();
});

userSchema.methods.isValidPassword = async function (password: string) {
  return await bcrypt.compare(password, this.password);
};

const UserModel = mongoose.model<IUser>('User', userSchema);

export default UserModel;

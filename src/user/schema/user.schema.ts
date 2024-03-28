import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import {hash , compare} from "bcrypt"
import { mapToId } from "src/helper";

@Schema({
  timestamps: true,
  toJSON: {
    transform: function mapToId(doc, ret, _options) {
      ret.id = ret._id;
      delete ret._id;
      delete ret.__v;
      delete ret.password;
    },
  },
  toObject: {
    transform: mapToId,
  },
})
export class User {
    @Prop({
        required: true,
        unique: true,
      })
      email: string;
      @Prop({
        required: true,
      })
      address: string;
      @Prop({
        required: true,
      })
      mobile: string;
      @Prop({
        required: true,
      })
      name: string;
      @Prop({
        required: true,
      })
      password: string;
      isValidPassword:  (password: string) => boolean;
    }

    export type UserDocument = User & Document;
    export const UserSchema = SchemaFactory.createForClass(User);
    UserSchema.pre('save', async function () {
      if (this.password) {
        this.password = await hash(this.password, 10);
      }
    });
    
    UserSchema.method('isValidPassword', async function (password: string) {
      const user = this as User;
      const isValid = compare(password, user.password);
      return isValid;
    });

    export const USER_MODEL = User.name;




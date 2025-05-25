import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
import { hash } from 'bcrypt';

export type UserDocument = HydratedDocument<User>;

@Schema()
export class User {
    @Prop({ type: String, required: true, unique: true })
    username: string;

    @Prop({ type: String })
    email: string;

    @Prop({type: String})
    country: string;

    @Prop({type: String})
    phoneNumber: string;
    
    @Prop({ type: String })
    password: string;
}

export const UserSchema = SchemaFactory.createForClass(User);

UserSchema.pre('save', async function(next) {
    if(this.isModified('password')) {
        const hashedPassword = await hash(this.password, 10);

        this.password = hashedPassword;
    } 

    next();
})
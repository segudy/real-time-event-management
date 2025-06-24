import { Model } from 'mongoose';
import { User, UserDocument } from './schemas/user.schema';
export declare class AuthService {
    private userModel;
    constructor(userModel: Model<UserDocument>);
    login(loginData: any): {
        message: string;
        userId: string;
        token: string;
    };
    register(registerData: any): Promise<User>;
}

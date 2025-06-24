import { AuthService } from './auth.service';
export declare class AuthController {
    private readonly authService;
    constructor(authService: AuthService);
    login(loginDto: any): {
        message: string;
        userId: string;
        token: string;
    };
    register(registerDto: any): Promise<import("./schemas/user.schema").User>;
}

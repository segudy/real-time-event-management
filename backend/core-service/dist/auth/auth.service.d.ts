export declare class AuthService {
    login(loginData: any): {
        message: string;
        userId: string;
        token: string;
    };
    register(registerData: any): {
        message: string;
        userId: string;
    };
}

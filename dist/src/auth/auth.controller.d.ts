import { AuthService } from "./auth.service";
import { UserAuthDto } from "./dto/user-auth.dto";
import { RegisterDto } from "./dto/register.dto";
import { RefreshTokenDto } from "./dto/refresh-token.dto";
export declare class AuthController {
    private readonly authService;
    constructor(authService: AuthService);
    private jwtService;
    login(userAuthDto: UserAuthDto): Promise<{
        token: string;
        refreshToken: string;
    }>;
    register(registerDto: RegisterDto): Promise<{
        msg: string;
    }>;
    getUserInfo(user: any): Promise<{
        msg: string;
        data: {
            id: number;
            username: string;
            email: string | null;
            phone: string | null;
            avatar: string | null;
            nickname: string | null;
            gender: number | null;
            status: number | null;
            createdAt: Date | null;
            updatedAt: Date | null;
            deletedAt: Date | null;
        };
    }>;
    refresh(refreshTokenDto: RefreshTokenDto): Promise<{
        token: string;
        refresh_token: string;
    }>;
}

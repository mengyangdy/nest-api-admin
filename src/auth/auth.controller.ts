import { Controller, Post, Body, Inject, Get } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { UserAuthDto } from "./dto/user-auth.dto";
import { RegisterDto } from "./dto/register.dto";
import { JwtService } from "@nestjs/jwt";
import { Public } from "../login.guard";
import { CurrentUser } from "../decorators/current-user.decorator";
import { RefreshTokenDto } from "./dto/refresh-token.dto";

@Controller("auth")
export class AuthController {
  constructor(private readonly authService: AuthService) {}
  @Inject(JwtService)
  private jwtService: JwtService;

  @Public()
  @Post("/login")
  async login(@Body() userAuthDto: UserAuthDto) {
    const id = await this.authService.login(userAuthDto);
    const token = this.jwtService.sign(
      {
        userId: id,
      },
      {
        expiresIn: "1d",
      }
    );
    const refreshToken = this.jwtService.sign(
      {
        userId: id,
      },
      {
        expiresIn: "7d",
      }
    );

    return {
      token,
      refreshToken,
    };
  }

  @Public()
  @Post("/register")
  async register(@Body() registerDto: RegisterDto) {
    return this.authService.register(registerDto);
  }

  @Get("/getUserInfo")
  getUserInfo(@CurrentUser() user: any) {
    // 现在可以通过 user.userId 获取到 token 中的用户ID
    const id = user.userId;
    return this.authService.getUserInfo(id);
  }
  @Public()
  @Post("/refreshToken")
  refresh(@Body() refreshTokenDto: RefreshTokenDto) {
    return this.authService.refreshToken(refreshTokenDto.refreshToken);
  }
}

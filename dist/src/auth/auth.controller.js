"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthController = void 0;
const common_1 = require("@nestjs/common");
const auth_service_1 = require("./auth.service");
const user_auth_dto_1 = require("./dto/user-auth.dto");
const register_dto_1 = require("./dto/register.dto");
const jwt_1 = require("@nestjs/jwt");
const login_guard_1 = require("../login.guard");
const current_user_decorator_1 = require("../decorators/current-user.decorator");
const refresh_token_dto_1 = require("./dto/refresh-token.dto");
let AuthController = class AuthController {
    authService;
    constructor(authService) {
        this.authService = authService;
    }
    jwtService;
    async login(userAuthDto) {
        const id = await this.authService.login(userAuthDto);
        const token = this.jwtService.sign({
            userId: id,
        }, {
            expiresIn: "1d",
        });
        const refreshToken = this.jwtService.sign({
            userId: id,
        }, {
            expiresIn: "7d",
        });
        return {
            token,
            refreshToken,
        };
    }
    async register(registerDto) {
        return this.authService.register(registerDto);
    }
    getUserInfo(user) {
        const id = user.userId;
        return this.authService.getUserInfo(id);
    }
    refresh(refreshTokenDto) {
        return this.authService.refreshToken(refreshTokenDto.refreshToken);
    }
};
exports.AuthController = AuthController;
__decorate([
    (0, common_1.Inject)(jwt_1.JwtService),
    __metadata("design:type", jwt_1.JwtService)
], AuthController.prototype, "jwtService", void 0);
__decorate([
    (0, login_guard_1.Public)(),
    (0, common_1.Post)("/login"),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [user_auth_dto_1.UserAuthDto]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "login", null);
__decorate([
    (0, login_guard_1.Public)(),
    (0, common_1.Post)("/register"),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [register_dto_1.RegisterDto]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "register", null);
__decorate([
    (0, common_1.Get)("/getUserInfo"),
    __param(0, (0, current_user_decorator_1.CurrentUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], AuthController.prototype, "getUserInfo", null);
__decorate([
    (0, login_guard_1.Public)(),
    (0, common_1.Post)("/refreshToken"),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [refresh_token_dto_1.RefreshTokenDto]),
    __metadata("design:returntype", void 0)
], AuthController.prototype, "refresh", null);
exports.AuthController = AuthController = __decorate([
    (0, common_1.Controller)("auth"),
    __metadata("design:paramtypes", [auth_service_1.AuthService])
], AuthController);
//# sourceMappingURL=auth.controller.js.map
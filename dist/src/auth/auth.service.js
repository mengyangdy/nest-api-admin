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
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthService = void 0;
const common_1 = require("@nestjs/common");
const schema_1 = require("../../db/schema");
const db_1 = require("../../db");
const drizzle_orm_1 = require("drizzle-orm");
const jwt_1 = require("@nestjs/jwt");
const argon2 = require("argon2");
let AuthService = class AuthService {
    jwtService;
    async register(registerDto) {
        const existingUser = await db_1.db
            .select()
            .from(schema_1.users)
            .where((0, drizzle_orm_1.eq)(schema_1.users.username, registerDto.username));
        if (existingUser.length > 0) {
            throw new common_1.ConflictException("用户名已存在");
        }
        const hashedPassword = await argon2.hash(registerDto.password);
        await db_1.db.insert(schema_1.users).values({
            username: registerDto.username,
            password: hashedPassword,
            phone: registerDto.phone,
            email: registerDto.email,
            nickname: registerDto.nickname,
            avatar: registerDto.avatar,
        });
        return {
            msg: "注册成功",
        };
    }
    async login(userAuthDto) {
        const user = await db_1.db
            .select()
            .from(schema_1.users)
            .where((0, drizzle_orm_1.eq)(schema_1.users.username, userAuthDto.username))
            .limit(1);
        if (user.length === 0) {
            throw new common_1.UnauthorizedException("用户不存在");
        }
        let isPasswordValid = await argon2.verify(user[0].password, userAuthDto.password);
        if (!isPasswordValid) {
            throw new common_1.UnauthorizedException("用户名或密码错误");
        }
        return user[0].id;
    }
    async getUserInfo(id) {
        const user = await db_1.db.select().from(schema_1.users).where((0, drizzle_orm_1.eq)(schema_1.users.id, id)).limit(1);
        if (user.length === 0) {
            throw new common_1.UnauthorizedException("用户不存在");
        }
        const { password: _, ...userWithoutPassword } = user[0];
        return {
            msg: "登录成功",
            data: userWithoutPassword,
        };
    }
    async refreshToken(refreshToken) {
        try {
            const data = this.jwtService.verify(refreshToken);
            const userId = data.userId;
            const token = this.jwtService.sign({
                userId: userId,
            }, {
                expiresIn: "1m",
            });
            const refresh_token = this.jwtService.sign({
                userId: userId,
            }, {
                expiresIn: "7d",
            });
            return {
                token,
                refresh_token,
            };
        }
        catch {
            throw new common_1.UnauthorizedException("Refresh token 已过期，请重新登录");
        }
    }
};
exports.AuthService = AuthService;
__decorate([
    (0, common_1.Inject)(jwt_1.JwtService),
    __metadata("design:type", jwt_1.JwtService)
], AuthService.prototype, "jwtService", void 0);
exports.AuthService = AuthService = __decorate([
    (0, common_1.Injectable)()
], AuthService);
//# sourceMappingURL=auth.service.js.map
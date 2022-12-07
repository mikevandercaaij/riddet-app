/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./apps/riddet-api/src/app/app.controller.ts":
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


var _a;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.AppController = void 0;
const tslib_1 = __webpack_require__("tslib");
const common_1 = __webpack_require__("@nestjs/common");
const app_service_1 = __webpack_require__("./apps/riddet-api/src/app/app.service.ts");
let AppController = class AppController {
    constructor(appService) {
        this.appService = appService;
    }
    getData() {
        return this.appService.getData();
    }
};
tslib_1.__decorate([
    (0, common_1.Get)(),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", []),
    tslib_1.__metadata("design:returntype", void 0)
], AppController.prototype, "getData", null);
AppController = tslib_1.__decorate([
    (0, common_1.Controller)(),
    tslib_1.__metadata("design:paramtypes", [typeof (_a = typeof app_service_1.AppService !== "undefined" && app_service_1.AppService) === "function" ? _a : Object])
], AppController);
exports.AppController = AppController;


/***/ }),

/***/ "./apps/riddet-api/src/app/app.module.ts":
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.AppModule = void 0;
const tslib_1 = __webpack_require__("tslib");
const auth_module_1 = __webpack_require__("./apps/riddet-api/src/app/auth/auth.module.ts");
const common_1 = __webpack_require__("@nestjs/common");
const mongoose_1 = __webpack_require__("@nestjs/mongoose");
const core_1 = __webpack_require__("@nestjs/core");
const community_module_1 = __webpack_require__("./apps/riddet-api/src/app/community/community.module.ts");
const thread_module_1 = __webpack_require__("./apps/riddet-api/src/app/thread/thread.module.ts");
const environment_prod_1 = __webpack_require__("./apps/riddet-api/src/environments/environment.prod.ts");
const app_controller_1 = __webpack_require__("./apps/riddet-api/src/app/app.controller.ts");
const app_service_1 = __webpack_require__("./apps/riddet-api/src/app/app.service.ts");
const jwt_auth_guard_1 = __webpack_require__("./apps/riddet-api/src/app/auth/jwt-auth.guard.ts");
const roles_guard_1 = __webpack_require__("./apps/riddet-api/src/app/auth/roles.guard.ts");
const category_module_1 = __webpack_require__("./apps/riddet-api/src/app/category/category.module.ts");
const message_module_1 = __webpack_require__("./apps/riddet-api/src/app/message/message.module.ts");
const user_module_1 = __webpack_require__("./apps/riddet-api/src/app/user/user.module.ts");
let AppModule = class AppModule {
};
AppModule = tslib_1.__decorate([
    (0, common_1.Module)({
        imports: [
            mongoose_1.MongooseModule.forRoot(environment_prod_1.environment.DATABASE_CONNECTION),
            community_module_1.CommunityModule,
            thread_module_1.ThreadModule,
            user_module_1.UserModule,
            auth_module_1.AuthModule,
            category_module_1.CategoryModule,
            message_module_1.MessageModule,
        ],
        controllers: [app_controller_1.AppController],
        providers: [
            {
                provide: core_1.APP_GUARD,
                useClass: jwt_auth_guard_1.JwtAuthGuard,
            },
            {
                provide: core_1.APP_GUARD,
                useClass: roles_guard_1.RolesGuard,
            },
            app_service_1.AppService,
        ],
    })
], AppModule);
exports.AppModule = AppModule;


/***/ }),

/***/ "./apps/riddet-api/src/app/app.service.ts":
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.AppService = void 0;
const tslib_1 = __webpack_require__("tslib");
const common_1 = __webpack_require__("@nestjs/common");
let AppService = class AppService {
    getData() {
        return { message: 'Welcome to riddet-api!' };
    }
};
AppService = tslib_1.__decorate([
    (0, common_1.Injectable)()
], AppService);
exports.AppService = AppService;


/***/ }),

/***/ "./apps/riddet-api/src/app/auth/auth.controller.ts":
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


var _a, _b;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.AuthController = void 0;
const tslib_1 = __webpack_require__("tslib");
const common_1 = __webpack_require__("@nestjs/common");
const passport_1 = __webpack_require__("@nestjs/passport");
const user_dto_1 = __webpack_require__("./apps/riddet-api/src/app/user/user.dto.ts");
const auth_module_1 = __webpack_require__("./apps/riddet-api/src/app/auth/auth.module.ts");
const auth_service_1 = __webpack_require__("./apps/riddet-api/src/app/auth/auth.service.ts");
const role_enum_1 = __webpack_require__("./apps/riddet-api/src/app/auth/role.enum.ts");
let AuthController = class AuthController {
    constructor(authService) {
        this.authService = authService;
    }
    login(req) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            return this.authService.login(req.body);
        });
    }
    register(CreateUserDto) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            return this.authService.register(CreateUserDto);
        });
    }
    getProfile(req) {
        return req.user;
    }
};
tslib_1.__decorate([
    (0, auth_module_1.Public)(),
    (0, common_1.UseGuards)((0, passport_1.AuthGuard)('local')),
    (0, common_1.Post)('auth/login'),
    tslib_1.__param(0, (0, common_1.Request)()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Object]),
    tslib_1.__metadata("design:returntype", Promise)
], AuthController.prototype, "login", null);
tslib_1.__decorate([
    (0, auth_module_1.Public)(),
    (0, common_1.Post)('auth/register'),
    tslib_1.__param(0, (0, common_1.Body)()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [typeof (_b = typeof user_dto_1.CreateUserDto !== "undefined" && user_dto_1.CreateUserDto) === "function" ? _b : Object]),
    tslib_1.__metadata("design:returntype", Promise)
], AuthController.prototype, "register", null);
tslib_1.__decorate([
    (0, auth_module_1.Roles)(role_enum_1.Role.User),
    (0, common_1.Get)('profile'),
    tslib_1.__param(0, (0, common_1.Request)()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Object]),
    tslib_1.__metadata("design:returntype", void 0)
], AuthController.prototype, "getProfile", null);
AuthController = tslib_1.__decorate([
    (0, common_1.Controller)(),
    tslib_1.__metadata("design:paramtypes", [typeof (_a = typeof auth_service_1.AuthService !== "undefined" && auth_service_1.AuthService) === "function" ? _a : Object])
], AuthController);
exports.AuthController = AuthController;


/***/ }),

/***/ "./apps/riddet-api/src/app/auth/auth.module.ts":
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.AuthModule = exports.Roles = exports.ROLES_KEY = exports.Public = exports.IS_PUBLIC_KEY = void 0;
const tslib_1 = __webpack_require__("tslib");
exports.IS_PUBLIC_KEY = 'isPublic';
const Public = () => (0, common_1.SetMetadata)(exports.IS_PUBLIC_KEY, true);
exports.Public = Public;
exports.ROLES_KEY = 'roles';
const Roles = (...roles) => (0, common_1.SetMetadata)(exports.ROLES_KEY, roles);
exports.Roles = Roles;
const common_1 = __webpack_require__("@nestjs/common");
const jwt_1 = __webpack_require__("@nestjs/jwt");
const passport_1 = __webpack_require__("@nestjs/passport");
const user_module_1 = __webpack_require__("./apps/riddet-api/src/app/user/user.module.ts");
const auth_controller_1 = __webpack_require__("./apps/riddet-api/src/app/auth/auth.controller.ts");
const auth_service_1 = __webpack_require__("./apps/riddet-api/src/app/auth/auth.service.ts");
const constants_1 = __webpack_require__("./apps/riddet-api/src/app/auth/constants.ts");
const jwt_strategy_1 = __webpack_require__("./apps/riddet-api/src/app/auth/jwt.strategy.ts");
const local_strategy_1 = __webpack_require__("./apps/riddet-api/src/app/auth/local.strategy.ts");
let AuthModule = class AuthModule {
};
AuthModule = tslib_1.__decorate([
    (0, common_1.Module)({
        imports: [
            user_module_1.UserModule,
            passport_1.PassportModule,
            jwt_1.JwtModule.register({
                secret: constants_1.jwtConstants.secret,
                signOptions: { expiresIn: '2d' },
            }),
        ],
        providers: [auth_service_1.AuthService, local_strategy_1.LocalStrategy, jwt_strategy_1.JwtStrategy],
        exports: [auth_service_1.AuthService],
        controllers: [auth_controller_1.AuthController]
    })
], AuthModule);
exports.AuthModule = AuthModule;


/***/ }),

/***/ "./apps/riddet-api/src/app/auth/auth.service.ts":
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


var _a, _b;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.AuthService = void 0;
const tslib_1 = __webpack_require__("tslib");
const common_1 = __webpack_require__("@nestjs/common");
const jwt_1 = __webpack_require__("@nestjs/jwt");
const bcrypt = __webpack_require__("bcryptjs");
const user_service_1 = __webpack_require__("./apps/riddet-api/src/app/user/user.service.ts");
let AuthService = class AuthService {
    constructor(userService, jwtService) {
        this.userService = userService;
        this.jwtService = jwtService;
    }
    validateUser(username, pass) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const user = yield this.userService.findByUsernameOrEmail(username);
            if (user && (yield bcrypt.compareSync(pass, user.password))) {
                return user;
            }
            throw new common_1.HttpException(`Incorrect credentials!`, common_1.HttpStatus.BAD_REQUEST);
        });
    }
    register(createUserDto) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const user = yield this.userService.create(createUserDto);
            return this.login(user);
        });
    }
    login(user) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const payload = { username: user.username };
            const loggedInUser = yield this.userService.findByUsernameOrEmail(user.username);
            return {
                _id: loggedInUser._id,
                username: loggedInUser.username,
                firstname: loggedInUser.firstname,
                lastname: loggedInUser.lastname,
                email: loggedInUser.email,
                roles: loggedInUser.roles,
                userImageUrl: loggedInUser.userImageUrl,
                access_token: this.jwtService.sign(payload),
            };
        });
    }
};
AuthService = tslib_1.__decorate([
    (0, common_1.Injectable)(),
    tslib_1.__metadata("design:paramtypes", [typeof (_a = typeof user_service_1.UserService !== "undefined" && user_service_1.UserService) === "function" ? _a : Object, typeof (_b = typeof jwt_1.JwtService !== "undefined" && jwt_1.JwtService) === "function" ? _b : Object])
], AuthService);
exports.AuthService = AuthService;


/***/ }),

/***/ "./apps/riddet-api/src/app/auth/constants.ts":
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.jwtConstants = void 0;
exports.jwtConstants = {
    secret: 'secretKey',
};


/***/ }),

/***/ "./apps/riddet-api/src/app/auth/jwt-auth.guard.ts":
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


var _a;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.JwtAuthGuard = void 0;
const tslib_1 = __webpack_require__("tslib");
const common_1 = __webpack_require__("@nestjs/common");
const core_1 = __webpack_require__("@nestjs/core");
const passport_1 = __webpack_require__("@nestjs/passport");
const auth_module_1 = __webpack_require__("./apps/riddet-api/src/app/auth/auth.module.ts");
let JwtAuthGuard = class JwtAuthGuard extends (0, passport_1.AuthGuard)('jwt') {
    constructor(reflector) {
        super();
        this.reflector = reflector;
    }
    canActivate(context) {
        const isPublic = this.reflector.getAllAndOverride(auth_module_1.IS_PUBLIC_KEY, [
            context.getHandler(),
            context.getClass(),
        ]);
        if (isPublic) {
            return true;
        }
        return super.canActivate(context);
    }
};
JwtAuthGuard = tslib_1.__decorate([
    (0, common_1.Injectable)(),
    tslib_1.__metadata("design:paramtypes", [typeof (_a = typeof core_1.Reflector !== "undefined" && core_1.Reflector) === "function" ? _a : Object])
], JwtAuthGuard);
exports.JwtAuthGuard = JwtAuthGuard;


/***/ }),

/***/ "./apps/riddet-api/src/app/auth/jwt.strategy.ts":
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


var _a;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.JwtStrategy = void 0;
const tslib_1 = __webpack_require__("tslib");
const common_1 = __webpack_require__("@nestjs/common");
const passport_1 = __webpack_require__("@nestjs/passport");
const passport_jwt_1 = __webpack_require__("passport-jwt");
const user_service_1 = __webpack_require__("./apps/riddet-api/src/app/user/user.service.ts");
const constants_1 = __webpack_require__("./apps/riddet-api/src/app/auth/constants.ts");
let JwtStrategy = class JwtStrategy extends (0, passport_1.PassportStrategy)(passport_jwt_1.Strategy) {
    constructor(userService) {
        super({
            jwtFromRequest: passport_jwt_1.ExtractJwt.fromAuthHeaderAsBearerToken(),
            ignoreExpiration: false,
            secretOrKey: constants_1.jwtConstants.secret,
        });
        this.userService = userService;
    }
    validate(payload) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const user = yield this.userService.findByUsernameOrEmail(payload.username);
            if (user) {
                return { id: user._id, username: payload.username, email: user.email, name: user.firstname + ' ' + user.lastname, roles: user.roles };
            }
            else {
                throw new common_1.HttpException('Login has expired!', common_1.HttpStatus.UNAUTHORIZED);
            }
        });
    }
};
JwtStrategy = tslib_1.__decorate([
    (0, common_1.Injectable)(),
    tslib_1.__metadata("design:paramtypes", [typeof (_a = typeof user_service_1.UserService !== "undefined" && user_service_1.UserService) === "function" ? _a : Object])
], JwtStrategy);
exports.JwtStrategy = JwtStrategy;


/***/ }),

/***/ "./apps/riddet-api/src/app/auth/local.strategy.ts":
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


var _a;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.LocalStrategy = void 0;
const tslib_1 = __webpack_require__("tslib");
const common_1 = __webpack_require__("@nestjs/common");
const passport_1 = __webpack_require__("@nestjs/passport");
const passport_local_1 = __webpack_require__("passport-local");
const auth_service_1 = __webpack_require__("./apps/riddet-api/src/app/auth/auth.service.ts");
let LocalStrategy = class LocalStrategy extends (0, passport_1.PassportStrategy)(passport_local_1.Strategy) {
    constructor(authService) {
        super();
        this.authService = authService;
    }
    validate(username, password) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const user = yield this.authService.validateUser(username, password);
            if (!user) {
                throw new common_1.HttpException(`No user found with current username or email!`, common_1.HttpStatus.NOT_FOUND);
            }
            return user;
        });
    }
};
LocalStrategy = tslib_1.__decorate([
    (0, common_1.Injectable)(),
    tslib_1.__metadata("design:paramtypes", [typeof (_a = typeof auth_service_1.AuthService !== "undefined" && auth_service_1.AuthService) === "function" ? _a : Object])
], LocalStrategy);
exports.LocalStrategy = LocalStrategy;


/***/ }),

/***/ "./apps/riddet-api/src/app/auth/role.enum.ts":
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.Role = void 0;
var Role;
(function (Role) {
    Role["User"] = "user";
    Role["Admin"] = "admin";
})(Role = exports.Role || (exports.Role = {}));


/***/ }),

/***/ "./apps/riddet-api/src/app/auth/roles.guard.ts":
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


var _a;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.RolesGuard = void 0;
const tslib_1 = __webpack_require__("tslib");
const common_1 = __webpack_require__("@nestjs/common");
const core_1 = __webpack_require__("@nestjs/core");
const auth_module_1 = __webpack_require__("./apps/riddet-api/src/app/auth/auth.module.ts");
let RolesGuard = class RolesGuard {
    constructor(reflector) {
        this.reflector = reflector;
    }
    canActivate(context) {
        const requiredRoles = this.reflector.getAllAndOverride(auth_module_1.ROLES_KEY, [
            context.getHandler(),
            context.getClass(),
        ]);
        if (!requiredRoles) {
            return true;
        }
        const { user } = context.switchToHttp().getRequest();
        return requiredRoles.some((role) => { var _a; return (_a = user.roles) === null || _a === void 0 ? void 0 : _a.includes(role); });
    }
};
RolesGuard = tslib_1.__decorate([
    (0, common_1.Injectable)(),
    tslib_1.__metadata("design:paramtypes", [typeof (_a = typeof core_1.Reflector !== "undefined" && core_1.Reflector) === "function" ? _a : Object])
], RolesGuard);
exports.RolesGuard = RolesGuard;


/***/ }),

/***/ "./apps/riddet-api/src/app/category/category.controller.ts":
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


var _a, _b, _c, _d, _e, _f;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.CommunitiesController = void 0;
const tslib_1 = __webpack_require__("tslib");
const common_1 = __webpack_require__("@nestjs/common");
const auth_module_1 = __webpack_require__("./apps/riddet-api/src/app/auth/auth.module.ts");
const role_enum_1 = __webpack_require__("./apps/riddet-api/src/app/auth/role.enum.ts");
const ParseObjectIdPipe_1 = __webpack_require__("./apps/riddet-api/src/app/shared/pipes/ParseObjectIdPipe.ts");
const category_dto_1 = __webpack_require__("./apps/riddet-api/src/app/category/category.dto.ts");
const category_service_1 = __webpack_require__("./apps/riddet-api/src/app/category/category.service.ts");
let CommunitiesController = class CommunitiesController {
    constructor(categoryService) {
        this.categoryService = categoryService;
    }
    getById(id) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            common_1.Logger.log(`Getting category with id: ${id} (READ)`);
            return yield this.categoryService.getById(id);
        });
    }
    getAll() {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            common_1.Logger.log(`Getting all categories (READ)`);
            return this.categoryService.getAll();
        });
    }
    create(categoryDto) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            common_1.Logger.log(`Creating category (CREATE)`);
            return this.categoryService.create(categoryDto);
        });
    }
    delete(id) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            common_1.Logger.log(`Getting category with id: ${id} (DELETE)`);
            return this.categoryService.delete(id);
        });
    }
};
tslib_1.__decorate([
    (0, common_1.Get)(':id'),
    tslib_1.__param(0, (0, common_1.Param)('id', ParseObjectIdPipe_1.ParseObjectIdPipe)),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [String]),
    tslib_1.__metadata("design:returntype", typeof (_b = typeof Promise !== "undefined" && Promise) === "function" ? _b : Object)
], CommunitiesController.prototype, "getById", null);
tslib_1.__decorate([
    (0, common_1.Get)(),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", []),
    tslib_1.__metadata("design:returntype", typeof (_c = typeof Promise !== "undefined" && Promise) === "function" ? _c : Object)
], CommunitiesController.prototype, "getAll", null);
tslib_1.__decorate([
    (0, auth_module_1.Roles)(role_enum_1.Role.Admin),
    (0, common_1.Post)(),
    tslib_1.__param(0, (0, common_1.Body)()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [typeof (_d = typeof category_dto_1.CategoryDto !== "undefined" && category_dto_1.CategoryDto) === "function" ? _d : Object]),
    tslib_1.__metadata("design:returntype", typeof (_e = typeof Promise !== "undefined" && Promise) === "function" ? _e : Object)
], CommunitiesController.prototype, "create", null);
tslib_1.__decorate([
    (0, auth_module_1.Roles)(role_enum_1.Role.Admin),
    (0, common_1.Delete)(':id'),
    tslib_1.__param(0, (0, common_1.Param)('id', ParseObjectIdPipe_1.ParseObjectIdPipe)),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [String]),
    tslib_1.__metadata("design:returntype", typeof (_f = typeof Promise !== "undefined" && Promise) === "function" ? _f : Object)
], CommunitiesController.prototype, "delete", null);
CommunitiesController = tslib_1.__decorate([
    (0, common_1.Controller)('categories'),
    tslib_1.__metadata("design:paramtypes", [typeof (_a = typeof category_service_1.CategoryService !== "undefined" && category_service_1.CategoryService) === "function" ? _a : Object])
], CommunitiesController);
exports.CommunitiesController = CommunitiesController;


/***/ }),

/***/ "./apps/riddet-api/src/app/category/category.dto.ts":
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.CategoryDto = void 0;
const tslib_1 = __webpack_require__("tslib");
const class_validator_1 = __webpack_require__("class-validator");
class CategoryDto {
}
tslib_1.__decorate([
    (0, class_validator_1.IsString)({ message: 'Name must be a string!' }),
    (0, class_validator_1.IsDefined)({ message: 'Name is required!' }),
    (0, class_validator_1.IsNotEmpty)({ message: 'Name cannot be empty!' }),
    tslib_1.__metadata("design:type", String)
], CategoryDto.prototype, "name", void 0);
exports.CategoryDto = CategoryDto;


/***/ }),

/***/ "./apps/riddet-api/src/app/category/category.module.ts":
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.CategoryModule = void 0;
const tslib_1 = __webpack_require__("tslib");
const common_1 = __webpack_require__("@nestjs/common");
const mongoose_1 = __webpack_require__("@nestjs/mongoose");
const category_controller_1 = __webpack_require__("./apps/riddet-api/src/app/category/category.controller.ts");
const category_schema_1 = __webpack_require__("./apps/riddet-api/src/app/category/category.schema.ts");
const category_service_1 = __webpack_require__("./apps/riddet-api/src/app/category/category.service.ts");
let CategoryModule = class CategoryModule {
};
CategoryModule = tslib_1.__decorate([
    (0, common_1.Module)({
        imports: [
            mongoose_1.MongooseModule.forFeature([
                { name: category_schema_1.Category.name, schema: category_schema_1.CategorySchema },
            ]),
        ],
        controllers: [category_controller_1.CommunitiesController],
        providers: [category_service_1.CategoryService],
        exports: [category_service_1.CategoryService]
    })
], CategoryModule);
exports.CategoryModule = CategoryModule;


/***/ }),

/***/ "./apps/riddet-api/src/app/category/category.schema.ts":
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.CategorySchema = exports.Category = void 0;
const tslib_1 = __webpack_require__("tslib");
const mongoose_1 = __webpack_require__("@nestjs/mongoose");
const class_validator_1 = __webpack_require__("class-validator");
let Category = class Category {
};
tslib_1.__decorate([
    (0, class_validator_1.IsString)({ message: 'Name must be a string!' }),
    (0, class_validator_1.IsDefined)({ message: 'Name is required!' }),
    (0, class_validator_1.IsNotEmpty)({ message: 'Name cannot be empty!' }),
    (0, mongoose_1.Prop)(),
    tslib_1.__metadata("design:type", String)
], Category.prototype, "name", void 0);
Category = tslib_1.__decorate([
    (0, mongoose_1.Schema)()
], Category);
exports.Category = Category;
exports.CategorySchema = mongoose_1.SchemaFactory.createForClass(Category);


/***/ }),

/***/ "./apps/riddet-api/src/app/category/category.service.ts":
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


var _a;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.CategoryService = void 0;
const tslib_1 = __webpack_require__("tslib");
const common_1 = __webpack_require__("@nestjs/common");
const mongoose_1 = __webpack_require__("@nestjs/mongoose");
const mongoose_2 = __webpack_require__("mongoose");
const category_schema_1 = __webpack_require__("./apps/riddet-api/src/app/category/category.schema.ts");
let CategoryService = class CategoryService {
    constructor(categoryModel) {
        this.categoryModel = categoryModel;
    }
    getById(_id) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            yield this.doesExist(_id);
            return this.categoryModel.findOne({ _id });
        });
    }
    getAll() {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            return this.categoryModel.find({});
        });
    }
    create(categoryDto) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            yield this.validate(undefined, categoryDto.name);
            return this.categoryModel.create(categoryDto);
        });
    }
    delete(_id) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            yield this.doesExist(_id);
            return this.categoryModel.findOneAndDelete({ _id });
        });
    }
    validate(id, name) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            if ((yield this.categoryModel.find({ $and: [{ _id: { $ne: id } }, { name: name }] }).countDocuments()) > 0) {
                throw new common_1.HttpException(`Category with name of ${name} already exists!`, common_1.HttpStatus.BAD_REQUEST);
            }
        });
    }
    doesExist(id) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const category = yield this.categoryModel.findOne({ _id: id });
            if (!category) {
                throw new common_1.HttpException(`Category with id of ${id} doesn't exist!`, common_1.HttpStatus.BAD_REQUEST);
            }
        });
    }
};
CategoryService = tslib_1.__decorate([
    (0, common_1.Injectable)(),
    tslib_1.__param(0, (0, mongoose_1.InjectModel)(category_schema_1.Category.name)),
    tslib_1.__metadata("design:paramtypes", [typeof (_a = typeof mongoose_2.Model !== "undefined" && mongoose_2.Model) === "function" ? _a : Object])
], CategoryService);
exports.CategoryService = CategoryService;


/***/ }),

/***/ "./apps/riddet-api/src/app/community/community.controller.ts":
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.CommunitiesController = void 0;
const tslib_1 = __webpack_require__("tslib");
const common_1 = __webpack_require__("@nestjs/common");
const auth_module_1 = __webpack_require__("./apps/riddet-api/src/app/auth/auth.module.ts");
const ParseObjectIdPipe_1 = __webpack_require__("./apps/riddet-api/src/app/shared/pipes/ParseObjectIdPipe.ts");
const community_dto_1 = __webpack_require__("./apps/riddet-api/src/app/community/community.dto.ts");
const community_service_1 = __webpack_require__("./apps/riddet-api/src/app/community/community.service.ts");
let CommunitiesController = class CommunitiesController {
    constructor(communityService) {
        this.communityService = communityService;
    }
    getAll() {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            common_1.Logger.log(`Getting all communities (READ)`);
            return this.communityService.getAll();
        });
    }
    getAllJoinedCommunities(req) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            common_1.Logger.log(`Getting all communities user has joined (READ)`);
            return this.communityService.getAllJoinedCommunities(req);
        });
    }
    getAllCreatedCommunities(req) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            common_1.Logger.log(`Getting all communities user has created (READ)`);
            return this.communityService.getAllCreatedCommunities(req);
        });
    }
    getById(id) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            common_1.Logger.log(`Getting community with id: ${id} (READ)`);
            return yield this.communityService.getById(id);
        });
    }
    create(createCommunityDto, req) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            common_1.Logger.log(`Creating community (CREATE)`);
            return this.communityService.create(createCommunityDto, req);
        });
    }
    update(id, req, updateCommunityDto) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            common_1.Logger.log(`Getting community with id: ${id} (UPDATE)`);
            return this.communityService.update(id, updateCommunityDto, req);
        });
    }
    delete(id, req) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            common_1.Logger.log(`Getting community with id: ${id} (DELETE)`);
            return this.communityService.delete(id, req);
        });
    }
    //participation routes
    join(id, req) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            common_1.Logger.log(`Getting community with id: ${id} (DELETE)`);
            return this.communityService.join(id, req);
        });
    }
    leave(id, req) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            common_1.Logger.log(`Getting community with id: ${id} (DELETE)`);
            return this.communityService.leave(id, req);
        });
    }
};
tslib_1.__decorate([
    (0, auth_module_1.Public)(),
    (0, common_1.Get)(),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", []),
    tslib_1.__metadata("design:returntype", typeof (_b = typeof Promise !== "undefined" && Promise) === "function" ? _b : Object)
], CommunitiesController.prototype, "getAll", null);
tslib_1.__decorate([
    (0, common_1.Get)('/joined'),
    tslib_1.__param(0, (0, common_1.Req)()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Object]),
    tslib_1.__metadata("design:returntype", typeof (_c = typeof Promise !== "undefined" && Promise) === "function" ? _c : Object)
], CommunitiesController.prototype, "getAllJoinedCommunities", null);
tslib_1.__decorate([
    (0, common_1.Get)('/created'),
    tslib_1.__param(0, (0, common_1.Req)()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Object]),
    tslib_1.__metadata("design:returntype", typeof (_d = typeof Promise !== "undefined" && Promise) === "function" ? _d : Object)
], CommunitiesController.prototype, "getAllCreatedCommunities", null);
tslib_1.__decorate([
    (0, auth_module_1.Public)(),
    (0, common_1.Get)(':id'),
    tslib_1.__param(0, (0, common_1.Param)('id', ParseObjectIdPipe_1.ParseObjectIdPipe)),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [String]),
    tslib_1.__metadata("design:returntype", typeof (_e = typeof Promise !== "undefined" && Promise) === "function" ? _e : Object)
], CommunitiesController.prototype, "getById", null);
tslib_1.__decorate([
    (0, common_1.Post)(),
    tslib_1.__param(0, (0, common_1.Body)()),
    tslib_1.__param(1, (0, common_1.Req)()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [typeof (_f = typeof community_dto_1.CreateCommunityDto !== "undefined" && community_dto_1.CreateCommunityDto) === "function" ? _f : Object, Object]),
    tslib_1.__metadata("design:returntype", typeof (_g = typeof Promise !== "undefined" && Promise) === "function" ? _g : Object)
], CommunitiesController.prototype, "create", null);
tslib_1.__decorate([
    (0, common_1.Patch)(':id'),
    tslib_1.__param(0, (0, common_1.Param)('id', ParseObjectIdPipe_1.ParseObjectIdPipe)),
    tslib_1.__param(1, (0, common_1.Req)()),
    tslib_1.__param(2, (0, common_1.Body)()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [String, Object, typeof (_h = typeof community_dto_1.UpdateCommunityDto !== "undefined" && community_dto_1.UpdateCommunityDto) === "function" ? _h : Object]),
    tslib_1.__metadata("design:returntype", typeof (_j = typeof Promise !== "undefined" && Promise) === "function" ? _j : Object)
], CommunitiesController.prototype, "update", null);
tslib_1.__decorate([
    (0, common_1.Delete)(':id'),
    tslib_1.__param(0, (0, common_1.Param)('id', ParseObjectIdPipe_1.ParseObjectIdPipe)),
    tslib_1.__param(1, (0, common_1.Req)()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [String, Object]),
    tslib_1.__metadata("design:returntype", typeof (_k = typeof Promise !== "undefined" && Promise) === "function" ? _k : Object)
], CommunitiesController.prototype, "delete", null);
tslib_1.__decorate([
    (0, common_1.Post)(':id/join'),
    tslib_1.__param(0, (0, common_1.Param)('id', ParseObjectIdPipe_1.ParseObjectIdPipe)),
    tslib_1.__param(1, (0, common_1.Req)()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [String, Object]),
    tslib_1.__metadata("design:returntype", typeof (_l = typeof Promise !== "undefined" && Promise) === "function" ? _l : Object)
], CommunitiesController.prototype, "join", null);
tslib_1.__decorate([
    (0, common_1.Post)(':id/leave'),
    tslib_1.__param(0, (0, common_1.Param)('id', ParseObjectIdPipe_1.ParseObjectIdPipe)),
    tslib_1.__param(1, (0, common_1.Req)()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [String, Object]),
    tslib_1.__metadata("design:returntype", typeof (_m = typeof Promise !== "undefined" && Promise) === "function" ? _m : Object)
], CommunitiesController.prototype, "leave", null);
CommunitiesController = tslib_1.__decorate([
    (0, common_1.Controller)('communities'),
    tslib_1.__metadata("design:paramtypes", [typeof (_a = typeof community_service_1.CommunityService !== "undefined" && community_service_1.CommunityService) === "function" ? _a : Object])
], CommunitiesController);
exports.CommunitiesController = CommunitiesController;


/***/ }),

/***/ "./apps/riddet-api/src/app/community/community.dto.ts":
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.UpdateCommunityDto = exports.CreateCommunityDto = void 0;
const tslib_1 = __webpack_require__("tslib");
const class_validator_1 = __webpack_require__("class-validator");
class CreateCommunityDto {
}
tslib_1.__decorate([
    (0, class_validator_1.IsString)({ message: 'Name must be a string!' }),
    (0, class_validator_1.IsDefined)({ message: 'Name is required!' }),
    (0, class_validator_1.MinLength)(5, { message: 'Name must be at least 5 characters long!' }),
    tslib_1.__metadata("design:type", String)
], CreateCommunityDto.prototype, "name", void 0);
tslib_1.__decorate([
    (0, class_validator_1.IsString)({ message: 'Description must be a string!' }),
    (0, class_validator_1.IsDefined)({ message: 'Description is required!' }),
    (0, class_validator_1.IsNotEmpty)({ message: 'Description cannot be empty!' }),
    tslib_1.__metadata("design:type", String)
], CreateCommunityDto.prototype, "description", void 0);
tslib_1.__decorate([
    (0, class_validator_1.IsString)({ message: 'ImageUrl must be a string!' }),
    (0, class_validator_1.IsDefined)({ message: 'ImageUrl is required!' }),
    (0, class_validator_1.IsNotEmpty)({ message: 'ImageUrl cannot be empty!' }),
    tslib_1.__metadata("design:type", String)
], CreateCommunityDto.prototype, "imageUrl", void 0);
tslib_1.__decorate([
    (0, class_validator_1.IsBoolean)({ message: 'isPublic must be a boolean!' }),
    (0, class_validator_1.IsDefined)({ message: 'isPublic is required!' }),
    (0, class_validator_1.IsNotEmpty)({ message: 'isPublic cannot be empty!' }),
    tslib_1.__metadata("design:type", Boolean)
], CreateCommunityDto.prototype, "isPublic", void 0);
tslib_1.__decorate([
    (0, class_validator_1.ArrayNotEmpty)({ message: 'Categories cannot be empty!' }),
    (0, class_validator_1.IsDefined)({ message: 'Categories are required!' }),
    tslib_1.__metadata("design:type", Array)
], CreateCommunityDto.prototype, "categories", void 0);
exports.CreateCommunityDto = CreateCommunityDto;
class UpdateCommunityDto {
}
tslib_1.__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)({ message: 'Name must be a string!' }),
    (0, class_validator_1.IsDefined)({ message: 'Name is required!' }),
    (0, class_validator_1.MinLength)(5, { message: 'Name must be at least 5 characters long!' }),
    tslib_1.__metadata("design:type", String)
], UpdateCommunityDto.prototype, "name", void 0);
tslib_1.__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)({ message: 'Description must be a string!' }),
    (0, class_validator_1.IsDefined)({ message: 'Description is required!' }),
    (0, class_validator_1.IsNotEmpty)({ message: 'Description cannot be empty!' }),
    tslib_1.__metadata("design:type", String)
], UpdateCommunityDto.prototype, "description", void 0);
tslib_1.__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)({ message: 'ImageUrl must be a string!' }),
    (0, class_validator_1.IsDefined)({ message: 'ImageUrl is required!' }),
    (0, class_validator_1.IsNotEmpty)({ message: 'ImageUrl cannot be empty!' }),
    tslib_1.__metadata("design:type", String)
], UpdateCommunityDto.prototype, "imageUrl", void 0);
tslib_1.__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsBoolean)({ message: 'isPublic must be a boolean!' }),
    (0, class_validator_1.IsNotEmpty)({ message: 'isPublic cannot be empty!' }),
    tslib_1.__metadata("design:type", Boolean)
], UpdateCommunityDto.prototype, "isPublic", void 0);
tslib_1.__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.ArrayNotEmpty)({ message: 'Categories cannot be empty!' }),
    (0, class_validator_1.IsNotEmpty)({ message: 'Categories cannot be empty!' }),
    tslib_1.__metadata("design:type", Array)
], UpdateCommunityDto.prototype, "categories", void 0);
exports.UpdateCommunityDto = UpdateCommunityDto;


/***/ }),

/***/ "./apps/riddet-api/src/app/community/community.module.ts":
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.CommunityModule = void 0;
const tslib_1 = __webpack_require__("tslib");
const common_1 = __webpack_require__("@nestjs/common");
const mongoose_1 = __webpack_require__("@nestjs/mongoose");
const category_module_1 = __webpack_require__("./apps/riddet-api/src/app/category/category.module.ts");
const user_module_1 = __webpack_require__("./apps/riddet-api/src/app/user/user.module.ts");
const community_controller_1 = __webpack_require__("./apps/riddet-api/src/app/community/community.controller.ts");
const community_schema_1 = __webpack_require__("./apps/riddet-api/src/app/community/community.schema.ts");
const community_service_1 = __webpack_require__("./apps/riddet-api/src/app/community/community.service.ts");
let CommunityModule = class CommunityModule {
};
CommunityModule = tslib_1.__decorate([
    (0, common_1.Module)({
        imports: [
            mongoose_1.MongooseModule.forFeature([
                { name: community_schema_1.Community.name, schema: community_schema_1.CommunitySchema },
            ]), (0, common_1.forwardRef)(() => category_module_1.CategoryModule), (0, common_1.forwardRef)(() => user_module_1.UserModule),
        ],
        controllers: [community_controller_1.CommunitiesController],
        providers: [community_service_1.CommunityService],
        exports: [community_service_1.CommunityService, mongoose_1.MongooseModule]
    })
], CommunityModule);
exports.CommunityModule = CommunityModule;


/***/ }),

/***/ "./apps/riddet-api/src/app/community/community.schema.ts":
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


var _a, _b;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.CommunitySchema = exports.Community = void 0;
const tslib_1 = __webpack_require__("tslib");
const mongoose_1 = __webpack_require__("@nestjs/mongoose");
const class_validator_1 = __webpack_require__("class-validator");
const user_schema_1 = __webpack_require__("./apps/riddet-api/src/app/user/user.schema.ts");
let Community = class Community {
};
tslib_1.__decorate([
    (0, class_validator_1.IsString)({ message: 'Name must be a string!' }),
    (0, class_validator_1.IsDefined)({ message: 'Name is required!' }),
    (0, class_validator_1.MinLength)(5, { message: 'Name must be at least 5 characters long!' }),
    (0, mongoose_1.Prop)({ unique: true }),
    tslib_1.__metadata("design:type", String)
], Community.prototype, "name", void 0);
tslib_1.__decorate([
    (0, class_validator_1.IsString)({ message: 'Description must be a string!' }),
    (0, class_validator_1.IsDefined)({ message: 'Description is required!' }),
    (0, class_validator_1.IsNotEmpty)({ message: 'Description cannot be empty!' }),
    (0, mongoose_1.Prop)(),
    tslib_1.__metadata("design:type", String)
], Community.prototype, "description", void 0);
tslib_1.__decorate([
    (0, class_validator_1.IsDate)({ message: 'Creation date must be a date!' }),
    (0, mongoose_1.Prop)(),
    tslib_1.__metadata("design:type", typeof (_a = typeof Date !== "undefined" && Date) === "function" ? _a : Object)
], Community.prototype, "creationDate", void 0);
tslib_1.__decorate([
    (0, class_validator_1.IsString)({ message: 'Image must be a string!' }),
    (0, mongoose_1.Prop)(),
    tslib_1.__metadata("design:type", String)
], Community.prototype, "imageUrl", void 0);
tslib_1.__decorate([
    (0, mongoose_1.Prop)(),
    tslib_1.__metadata("design:type", Boolean)
], Community.prototype, "isPublic", void 0);
tslib_1.__decorate([
    (0, mongoose_1.Prop)({
        default: [],
    }),
    tslib_1.__metadata("design:type", Array)
], Community.prototype, "categories", void 0);
tslib_1.__decorate([
    (0, mongoose_1.Prop)({
        default: [],
        ref: 'User',
    }),
    tslib_1.__metadata("design:type", Array)
], Community.prototype, "participants", void 0);
tslib_1.__decorate([
    (0, mongoose_1.Prop)({
        default: [],
    }),
    tslib_1.__metadata("design:type", Array)
], Community.prototype, "threads", void 0);
tslib_1.__decorate([
    (0, mongoose_1.Prop)(),
    tslib_1.__metadata("design:type", typeof (_b = typeof user_schema_1.User !== "undefined" && user_schema_1.User) === "function" ? _b : Object)
], Community.prototype, "createdBy", void 0);
Community = tslib_1.__decorate([
    (0, mongoose_1.Schema)()
], Community);
exports.Community = Community;
exports.CommunitySchema = mongoose_1.SchemaFactory.createForClass(Community);


/***/ }),

/***/ "./apps/riddet-api/src/app/community/community.service.ts":
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


var _a, _b, _c;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.CommunityService = void 0;
const tslib_1 = __webpack_require__("tslib");
const common_1 = __webpack_require__("@nestjs/common");
const mongoose_1 = __webpack_require__("@nestjs/mongoose");
const mongoose_2 = __webpack_require__("mongoose");
const role_enum_1 = __webpack_require__("./apps/riddet-api/src/app/auth/role.enum.ts");
const category_service_1 = __webpack_require__("./apps/riddet-api/src/app/category/category.service.ts");
const ParseObjectIdPipe_1 = __webpack_require__("./apps/riddet-api/src/app/shared/pipes/ParseObjectIdPipe.ts");
const user_service_1 = __webpack_require__("./apps/riddet-api/src/app/user/user.service.ts");
const community_schema_1 = __webpack_require__("./apps/riddet-api/src/app/community/community.schema.ts");
let CommunityService = class CommunityService {
    constructor(communityModel, categoryService, userService) {
        this.communityModel = communityModel;
        this.categoryService = categoryService;
        this.userService = userService;
    }
    getById(_id) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            yield this.doesExist(_id);
            return yield this.communityModel.findOne({ _id });
        });
    }
    getAll() {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            return yield this.communityModel.find({});
        });
    }
    getAllJoinedCommunities(req) {
        var e_1, _a;
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const joinedCommunities = [];
            const user = yield this.userService.getById(req.user.id);
            try {
                for (var _b = tslib_1.__asyncValues(user.joinedCommunities), _c; _c = yield _b.next(), !_c.done;) {
                    const communityId = _c.value;
                    joinedCommunities.push(yield this.getById(communityId.toString()));
                }
            }
            catch (e_1_1) { e_1 = { error: e_1_1 }; }
            finally {
                try {
                    if (_c && !_c.done && (_a = _b.return)) yield _a.call(_b);
                }
                finally { if (e_1) throw e_1.error; }
            }
            return joinedCommunities;
        });
    }
    getAllCreatedCommunities(req) {
        var e_2, _a;
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const createdCommunities = [];
            const user = yield this.userService.getById(req.user.id);
            try {
                for (var _b = tslib_1.__asyncValues(user.createdCommunities), _c; _c = yield _b.next(), !_c.done;) {
                    const communityId = _c.value;
                    createdCommunities.push(yield this.getById(communityId.toString()));
                }
            }
            catch (e_2_1) { e_2 = { error: e_2_1 }; }
            finally {
                try {
                    if (_c && !_c.done && (_a = _b.return)) yield _a.call(_b);
                }
                finally { if (e_2) throw e_2.error; }
            }
            return createdCommunities;
        });
    }
    create(createCommunityDto, req) {
        var e_3, _a;
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            yield this.validate(createCommunityDto);
            const embedCategories = [];
            try {
                for (var _b = tslib_1.__asyncValues(createCommunityDto.categories), _c; _c = yield _b.next(), !_c.done;) {
                    const category = _c.value;
                    embedCategories.push(yield this.categoryService.getById(category));
                }
            }
            catch (e_3_1) { e_3 = { error: e_3_1 }; }
            finally {
                try {
                    if (_c && !_c.done && (_a = _b.return)) yield _a.call(_b);
                }
                finally { if (e_3) throw e_3.error; }
            }
            const creator = yield this.userService.getById(req.user.id);
            delete creator.password;
            const mergedCommunity = new this.communityModel(Object.assign(Object.assign({}, createCommunityDto), { creationDate: new Date(), categories: embedCategories, createdBy: creator }));
            const community = yield this.communityModel.create(mergedCommunity);
            yield this.userService.addCreatedCommunity(req.user.id, community._id);
            console.log(community.threads);
            return community;
        });
    }
    update(updateId, updateCommunityDto, req) {
        var e_4, _a;
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            yield this.doesExist(updateId);
            yield this.isAllowedToAlter(req.user.id, updateId, req);
            yield this.validate(updateCommunityDto, updateId);
            let updateObject = {};
            if (updateCommunityDto.categories) {
                const categories = [];
                try {
                    for (var _b = tslib_1.__asyncValues(updateCommunityDto.categories), _c; _c = yield _b.next(), !_c.done;) {
                        const category = _c.value;
                        categories.push(yield this.categoryService.getById(category));
                    }
                }
                catch (e_4_1) { e_4 = { error: e_4_1 }; }
                finally {
                    try {
                        if (_c && !_c.done && (_a = _b.return)) yield _a.call(_b);
                    }
                    finally { if (e_4) throw e_4.error; }
                }
                delete updateCommunityDto.categories;
                updateObject = { categories };
            }
            updateObject = Object.assign(Object.assign({}, updateCommunityDto), updateObject);
            return this.communityModel.findOneAndUpdate({ _id: updateId }, updateObject, { new: true });
        });
    }
    delete(_id, req) {
        var e_5, _a;
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            yield this.doesExist(_id);
            yield this.isAllowedToAlter(req.user.id, _id, req);
            const community = yield this.communityModel.findOne({ _id });
            const creator = yield this.userService.getById(community.createdBy._id.toString());
            yield this.userService.removeCreatedCommunity(creator._id.toString(), community._id);
            try {
                for (var _b = tslib_1.__asyncValues(community.participants), _c; _c = yield _b.next(), !_c.done;) {
                    const participantId = _c.value;
                    yield this.userService.removeJoinedCommunity(participantId.toString(), community._id);
                }
            }
            catch (e_5_1) { e_5 = { error: e_5_1 }; }
            finally {
                try {
                    if (_c && !_c.done && (_a = _b.return)) yield _a.call(_b);
                }
                finally { if (e_5) throw e_5.error; }
            }
            ;
            return yield this.communityModel.findOneAndDelete({ _id });
        });
    }
    //participating in communities
    join(communityId, req) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            yield this.doesExist(communityId);
            if ((yield this.communityModel.find({ $and: [{ _id: communityId }, { "createdBy._id": req.user.id }] })).length > 0) {
                throw new common_1.HttpException(`You cannot join your own community!`, common_1.HttpStatus.BAD_REQUEST);
            }
            else if ((yield (yield this.communityModel.find({ $and: [{ _id: communityId }, { participants: { $in: req.user.id } }] })).length) > 0) {
                throw new common_1.HttpException(`You are already a participant of this community!`, common_1.HttpStatus.BAD_REQUEST);
            }
            yield this.userService.addJoinedCommunity(req.user.id, communityId);
            return this.communityModel.findOneAndUpdate({ _id: communityId }, { $push: { participants: req.user.id } }, { new: true });
        });
    }
    leave(communityId, req) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            yield this.doesExist(communityId);
            console.log(communityId);
            if ((yield this.communityModel.find({ $and: [{ _id: communityId }, { "createdBy._id": req.user.id }] })).length > 0) {
                throw new common_1.HttpException(`You cannot leave your own community!`, common_1.HttpStatus.BAD_REQUEST);
            }
            else if ((yield (yield this.communityModel.find({ $and: [{ _id: communityId }, { participants: { $in: req.user.id } }] })).length) === 0) {
                throw new common_1.HttpException(`You are not a participant of this community!`, common_1.HttpStatus.BAD_REQUEST);
            }
            yield this.userService.removeJoinedCommunity(req.user.id, communityId);
            return this.communityModel.findOneAndUpdate({ _id: communityId }, { $pull: { participants: req.user.id } }, { new: true });
        });
    }
    //update creator
    updateCreator(creatorId, creator) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            yield this.communityModel.updateMany({ "createdBy._id": creatorId }, { $set: { createdBy: creator } });
        });
    }
    //validation
    validate(community, currentCommunityId) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            if (community.name) {
                if ((yield this.communityModel.find({ $and: [{ name: community.name }, { _id: { $ne: currentCommunityId } }] })).length > 0) {
                    throw new common_1.HttpException(`Community with the name of ${community.name} already exists!`, common_1.HttpStatus.BAD_REQUEST);
                }
            }
            if (community.categories) {
                if (!(yield this.areValidObjectIds(community.categories))) {
                    throw new common_1.HttpException(`Categories contains invalid data, all input must be of type ObjectId!`, common_1.HttpStatus.BAD_REQUEST);
                }
            }
        });
    }
    areValidObjectIds(value) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            return value.every((id) => ParseObjectIdPipe_1.ParseObjectIdPipe.isValidObjectId(id));
        });
    }
    isAllowedToAlter(currentUserId, communityId, req) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const community = yield this.communityModel.findOne({ _id: communityId });
            if (!(new mongoose_2.Types.ObjectId(currentUserId).equals(community.createdBy._id)) && !(req.user.roles.includes(role_enum_1.Role.Admin))) {
                throw new common_1.HttpException(`Only the creator can alter data of this community!`, common_1.HttpStatus.BAD_REQUEST);
            }
        });
    }
    doesExist(communityId) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const community = yield this.communityModel.findOne({ _id: communityId });
            if (!community) {
                throw new common_1.HttpException(`Community with id of ${communityId} doesn't exist!`, common_1.HttpStatus.BAD_REQUEST);
            }
        });
    }
};
CommunityService = tslib_1.__decorate([
    (0, common_1.Injectable)(),
    tslib_1.__param(0, (0, mongoose_1.InjectModel)(community_schema_1.Community.name)),
    tslib_1.__param(2, (0, common_1.Inject)((0, common_1.forwardRef)(() => user_service_1.UserService))),
    tslib_1.__metadata("design:paramtypes", [typeof (_a = typeof mongoose_2.Model !== "undefined" && mongoose_2.Model) === "function" ? _a : Object, typeof (_b = typeof category_service_1.CategoryService !== "undefined" && category_service_1.CategoryService) === "function" ? _b : Object, typeof (_c = typeof user_service_1.UserService !== "undefined" && user_service_1.UserService) === "function" ? _c : Object])
], CommunityService);
exports.CommunityService = CommunityService;


/***/ }),

/***/ "./apps/riddet-api/src/app/message/message.controller.ts":
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


var _a, _b, _c, _d, _e, _f, _g, _h, _j;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.MessageController = void 0;
const tslib_1 = __webpack_require__("tslib");
const common_1 = __webpack_require__("@nestjs/common");
const auth_module_1 = __webpack_require__("./apps/riddet-api/src/app/auth/auth.module.ts");
const ParseObjectIdPipe_1 = __webpack_require__("./apps/riddet-api/src/app/shared/pipes/ParseObjectIdPipe.ts");
const message_dto_1 = __webpack_require__("./apps/riddet-api/src/app/message/message.dto.ts");
const message_service_1 = __webpack_require__("./apps/riddet-api/src/app/message/message.service.ts");
let MessageController = class MessageController {
    constructor(messageService) {
        this.messageService = messageService;
    }
    getById(communityId, threadId, messageId) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            common_1.Logger.log(`Getting message with id: ${messageId} (READ)`);
            return yield this.messageService.getById(communityId, threadId, messageId);
        });
    }
    getAll(communityId, threadId) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            common_1.Logger.log(`Getting all messages (READ)`);
            return yield this.messageService.getAll(communityId, threadId);
        });
    }
    create(communityId, threadId, req, messageDto) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            common_1.Logger.log(`Getting all messages (READ)`);
            return yield this.messageService.create(communityId, threadId, req, messageDto);
        });
    }
    update(communityId, threadId, messageId, req, messageDto) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            common_1.Logger.log(`Getting thread with id: ${threadId} (UPDATE)`);
            return this.messageService.update(communityId, threadId, messageId, messageDto, req);
        });
    }
    delete(communityId, threadId, messageId, req) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            common_1.Logger.log(`Getting thread with id: ${threadId} from community with id: ${communityId} (DELETE)`);
            return this.messageService.delete(communityId, threadId, messageId, req);
        });
    }
    like(communityId, threadId, messageId, req) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            common_1.Logger.log(`Getting thread with id: ${threadId} (LIKE)`);
            return this.messageService.like(communityId, threadId, messageId, req);
        });
    }
};
tslib_1.__decorate([
    (0, auth_module_1.Public)(),
    (0, common_1.Get)('communities/:communityId/threads/:threadId/messages/:messageId'),
    tslib_1.__param(0, (0, common_1.Param)('communityId', ParseObjectIdPipe_1.ParseObjectIdPipe)),
    tslib_1.__param(1, (0, common_1.Param)('threadId', ParseObjectIdPipe_1.ParseObjectIdPipe)),
    tslib_1.__param(2, (0, common_1.Param)('messageId', ParseObjectIdPipe_1.ParseObjectIdPipe)),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [String, String, String]),
    tslib_1.__metadata("design:returntype", typeof (_b = typeof Promise !== "undefined" && Promise) === "function" ? _b : Object)
], MessageController.prototype, "getById", null);
tslib_1.__decorate([
    (0, auth_module_1.Public)(),
    (0, common_1.Get)('communities/:communityId/threads/:threadId/messages'),
    tslib_1.__param(0, (0, common_1.Param)('communityId', ParseObjectIdPipe_1.ParseObjectIdPipe)),
    tslib_1.__param(1, (0, common_1.Param)('threadId', ParseObjectIdPipe_1.ParseObjectIdPipe)),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [String, String]),
    tslib_1.__metadata("design:returntype", typeof (_c = typeof Promise !== "undefined" && Promise) === "function" ? _c : Object)
], MessageController.prototype, "getAll", null);
tslib_1.__decorate([
    (0, common_1.Post)('communities/:communityId/threads/:threadId/messages'),
    tslib_1.__param(0, (0, common_1.Param)('communityId', ParseObjectIdPipe_1.ParseObjectIdPipe)),
    tslib_1.__param(1, (0, common_1.Param)('threadId', ParseObjectIdPipe_1.ParseObjectIdPipe)),
    tslib_1.__param(2, (0, common_1.Req)()),
    tslib_1.__param(3, (0, common_1.Body)()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [String, String, Object, typeof (_d = typeof message_dto_1.MessageDto !== "undefined" && message_dto_1.MessageDto) === "function" ? _d : Object]),
    tslib_1.__metadata("design:returntype", typeof (_e = typeof Promise !== "undefined" && Promise) === "function" ? _e : Object)
], MessageController.prototype, "create", null);
tslib_1.__decorate([
    (0, common_1.Patch)('communities/:communityId/threads/:threadId/messages/:messageId'),
    tslib_1.__param(0, (0, common_1.Param)('communityId', ParseObjectIdPipe_1.ParseObjectIdPipe)),
    tslib_1.__param(1, (0, common_1.Param)('threadId', ParseObjectIdPipe_1.ParseObjectIdPipe)),
    tslib_1.__param(2, (0, common_1.Param)('messageId', ParseObjectIdPipe_1.ParseObjectIdPipe)),
    tslib_1.__param(3, (0, common_1.Req)()),
    tslib_1.__param(4, (0, common_1.Body)()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [String, String, String, Object, typeof (_f = typeof message_dto_1.MessageDto !== "undefined" && message_dto_1.MessageDto) === "function" ? _f : Object]),
    tslib_1.__metadata("design:returntype", typeof (_g = typeof Promise !== "undefined" && Promise) === "function" ? _g : Object)
], MessageController.prototype, "update", null);
tslib_1.__decorate([
    (0, common_1.Delete)('communities/:communityId/threads/:threadId/messages/:messageId'),
    tslib_1.__param(0, (0, common_1.Param)('communityId', ParseObjectIdPipe_1.ParseObjectIdPipe)),
    tslib_1.__param(1, (0, common_1.Param)('threadId', ParseObjectIdPipe_1.ParseObjectIdPipe)),
    tslib_1.__param(2, (0, common_1.Param)('messageId', ParseObjectIdPipe_1.ParseObjectIdPipe)),
    tslib_1.__param(3, (0, common_1.Req)()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [String, String, String, Object]),
    tslib_1.__metadata("design:returntype", typeof (_h = typeof Promise !== "undefined" && Promise) === "function" ? _h : Object)
], MessageController.prototype, "delete", null);
tslib_1.__decorate([
    (0, common_1.Post)('communities/:communityId/threads/:threadId/messages/:messageId/like'),
    tslib_1.__param(0, (0, common_1.Param)('communityId', ParseObjectIdPipe_1.ParseObjectIdPipe)),
    tslib_1.__param(1, (0, common_1.Param)('threadId', ParseObjectIdPipe_1.ParseObjectIdPipe)),
    tslib_1.__param(2, (0, common_1.Param)('messageId', ParseObjectIdPipe_1.ParseObjectIdPipe)),
    tslib_1.__param(3, (0, common_1.Req)()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [String, String, String, Object]),
    tslib_1.__metadata("design:returntype", typeof (_j = typeof Promise !== "undefined" && Promise) === "function" ? _j : Object)
], MessageController.prototype, "like", null);
MessageController = tslib_1.__decorate([
    (0, common_1.Controller)(),
    tslib_1.__metadata("design:paramtypes", [typeof (_a = typeof message_service_1.MessageService !== "undefined" && message_service_1.MessageService) === "function" ? _a : Object])
], MessageController);
exports.MessageController = MessageController;


/***/ }),

/***/ "./apps/riddet-api/src/app/message/message.dto.ts":
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.MessageDto = void 0;
const tslib_1 = __webpack_require__("tslib");
const class_validator_1 = __webpack_require__("class-validator");
class MessageDto {
}
tslib_1.__decorate([
    (0, class_validator_1.IsString)({ message: 'Text must be a string!' }),
    (0, class_validator_1.IsDefined)({ message: 'Text is required!' }),
    tslib_1.__metadata("design:type", String)
], MessageDto.prototype, "text", void 0);
exports.MessageDto = MessageDto;


/***/ }),

/***/ "./apps/riddet-api/src/app/message/message.module.ts":
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.MessageModule = void 0;
const tslib_1 = __webpack_require__("tslib");
const common_1 = __webpack_require__("@nestjs/common");
const mongoose_1 = __webpack_require__("@nestjs/mongoose");
const community_module_1 = __webpack_require__("./apps/riddet-api/src/app/community/community.module.ts");
const message_controller_1 = __webpack_require__("./apps/riddet-api/src/app/message/message.controller.ts");
const message_schema_1 = __webpack_require__("./apps/riddet-api/src/app/message/message.schema.ts");
const message_service_1 = __webpack_require__("./apps/riddet-api/src/app/message/message.service.ts");
let MessageModule = class MessageModule {
};
MessageModule = tslib_1.__decorate([
    (0, common_1.Module)({
        imports: [
            mongoose_1.MongooseModule.forFeature([
                { name: message_schema_1.Message.name, schema: message_schema_1.MessageSchema },
            ]), community_module_1.CommunityModule
        ],
        providers: [message_service_1.MessageService],
        controllers: [message_controller_1.MessageController],
        exports: [message_service_1.MessageService]
    })
], MessageModule);
exports.MessageModule = MessageModule;


/***/ }),

/***/ "./apps/riddet-api/src/app/message/message.schema.ts":
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


var _a, _b;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.MessageSchema = exports.Message = void 0;
const tslib_1 = __webpack_require__("tslib");
const mongoose_1 = __webpack_require__("@nestjs/mongoose");
const class_validator_1 = __webpack_require__("class-validator");
const mongoose_2 = __webpack_require__("mongoose");
let Message = class Message {
};
tslib_1.__decorate([
    (0, class_validator_1.IsString)({ message: 'Text must be a string!' }),
    (0, class_validator_1.IsDefined)({ message: 'Text is required!' }),
    (0, mongoose_1.Prop)({ unique: true }),
    tslib_1.__metadata("design:type", String)
], Message.prototype, "text", void 0);
tslib_1.__decorate([
    (0, mongoose_1.Prop)({
        dedfault: [],
        ref: 'User',
    }),
    tslib_1.__metadata("design:type", Array)
], Message.prototype, "likes", void 0);
tslib_1.__decorate([
    (0, class_validator_1.IsDate)({ message: 'Creation date must be a date!' }),
    (0, mongoose_1.Prop)(),
    tslib_1.__metadata("design:type", typeof (_a = typeof Date !== "undefined" && Date) === "function" ? _a : Object)
], Message.prototype, "publicationDate", void 0);
tslib_1.__decorate([
    (0, mongoose_1.Prop)({
        ref: 'User',
    }),
    tslib_1.__metadata("design:type", typeof (_b = typeof mongoose_2.ObjectId !== "undefined" && mongoose_2.ObjectId) === "function" ? _b : Object)
], Message.prototype, "createdBy", void 0);
Message = tslib_1.__decorate([
    (0, mongoose_1.Schema)()
], Message);
exports.Message = Message;
exports.MessageSchema = mongoose_1.SchemaFactory.createForClass(Message);


/***/ }),

/***/ "./apps/riddet-api/src/app/message/message.service.ts":
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


var _a, _b;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.MessageService = void 0;
const tslib_1 = __webpack_require__("tslib");
const common_1 = __webpack_require__("@nestjs/common");
const mongoose_1 = __webpack_require__("@nestjs/mongoose");
const mongoose_2 = __webpack_require__("mongoose");
const role_enum_1 = __webpack_require__("./apps/riddet-api/src/app/auth/role.enum.ts");
const community_schema_1 = __webpack_require__("./apps/riddet-api/src/app/community/community.schema.ts");
const message_schema_1 = __webpack_require__("./apps/riddet-api/src/app/message/message.schema.ts");
let MessageService = class MessageService {
    constructor(communityModel, messageModel) {
        this.communityModel = communityModel;
        this.messageModel = messageModel;
    }
    getById(communityId, threadId, messageId) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            yield this.doesExist(communityId, threadId, messageId);
            const thread = (yield this.communityModel.aggregate([
                { $match: { _id: new mongoose_2.Types.ObjectId(communityId) } },
                { $unwind: { path: "$participants", preserveNullAndEmptyArrays: true } },
                { $project: {
                        _id: 0,
                        "threads": {
                            $filter: {
                                input: "$threads",
                                as: "thread",
                                cond: true
                            }
                        }
                    }
                },
                { $unwind: { path: "$threads", preserveNullAndEmptyArrays: false } },
                { $unwind: { path: "$threads.createdBy", preserveNullAndEmptyArrays: true } },
                { $lookup: {
                        from: "users",
                        localField: "threads.createdBy",
                        foreignField: "_id",
                        as: "threads.createdBy"
                    } },
                { $unwind: { path: "$threads.messages", preserveNullAndEmptyArrays: true } },
                { $lookup: {
                        from: "users",
                        localField: "threads.messages.createdBy",
                        foreignField: "_id",
                        as: "threads.messages.createdBy"
                    } },
                { $set: {
                        "threads.messages.createdBy": "$threads.messages.createdBy"
                    } },
                { $group: {
                        _id: "$threads._id",
                        messages: {
                            $push: "$threads.messages"
                        },
                    } },
                { $unset: ["messages.createdBy.password", "messages.createdBy.__v"] },
            ]))[0].messages.filter(message => new mongoose_2.Types.ObjectId(message._id).equals(new mongoose_2.Types.ObjectId(messageId)))[0];
            return Object.assign(Object.assign({}, thread), { createdBy: thread.createdBy[0] });
        });
    }
    getAll(communityId, threadId) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            yield this.doesExist(communityId, threadId);
            return (yield this.communityModel.aggregate([
                { $match: { _id: new mongoose_2.Types.ObjectId(communityId) } },
                { $unwind: { path: "$participants", preserveNullAndEmptyArrays: true } },
                { $project: {
                        _id: 0,
                        "threads": {
                            $filter: {
                                input: "$threads",
                                as: "thread",
                                cond: true
                            }
                        }
                    }
                },
                { $unwind: { path: "$threads", preserveNullAndEmptyArrays: false } },
                { $unwind: { path: "$threads.createdBy", preserveNullAndEmptyArrays: true } },
                { $lookup: {
                        from: "users",
                        localField: "threads.createdBy",
                        foreignField: "_id",
                        as: "threads.createdBy"
                    } },
                { $unwind: { path: "$threads.messages", preserveNullAndEmptyArrays: true } },
                { $lookup: {
                        from: "users",
                        localField: "threads.messages.createdBy",
                        foreignField: "_id",
                        as: "threads.messages.createdBy"
                    } },
                { $set: {
                        "threads.messages.createdBy": "$threads.messages.createdBy"
                    } },
                { $group: {
                        _id: "$threads._id",
                        messages: {
                            $push: "$threads.messages"
                        },
                    } },
                { $unset: ["messages.createdBy.password", "messages.createdBy.__v"] },
            ]))[0].messages.map(message => { return Object.assign(Object.assign({}, message), { createdBy: message.createdBy[0] }); });
        });
    }
    create(communityId, threadId, req, messageDto) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            yield this.doesExist(communityId, threadId);
            const community = yield this.communityModel.findOne({ _id: communityId });
            if (!((yield this.communityModel.find({ $and: [{ _id: communityId }, { participants: { $in: [req.user.id] } }] })).length > 0)
                && !(community.createdBy._id.equals(new mongoose_2.Types.ObjectId(req.user.id)))
                && !(req.user.roles.includes(role_enum_1.Role.Admin))) {
                throw new common_1.HttpException(`You are not a member of this community!`, common_1.HttpStatus.BAD_REQUEST);
            }
            const mergedMessage = new this.messageModel(Object.assign(Object.assign({}, messageDto), { publicationDate: new Date(), createdBy: req.user.id }));
            const result = yield this.communityModel.findOneAndUpdate({ _id: communityId }, { $push: { "threads.$[thread].messages": mergedMessage } }, { arrayFilters: [{ "thread._id": new mongoose_2.Types.ObjectId(threadId) }], new: true });
            return result.threads.filter(thread => thread._id.equals(new mongoose_2.Types.ObjectId(threadId)))[0].messages.filter(message => message._id.equals(mergedMessage._id))[0];
        });
    }
    update(communityId, threadId, messageId, messageDto, req) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            yield this.doesExist(communityId, threadId, messageId);
            const oldMessage = yield this.getById(communityId, threadId, messageId);
            const message = Object.assign(Object.assign({}, oldMessage), messageDto);
            if (!(yield this.isMyData(message.createdBy.toString(), req.user.id)) && !(req.user.roles.includes(role_enum_1.Role.Admin))) {
                throw new common_1.HttpException(`You cannot alter data that isn't yours!`, common_1.HttpStatus.BAD_REQUEST);
            }
            return (yield this.communityModel.findOneAndUpdate({ _id: new mongoose_2.Types.ObjectId(communityId), "threads._id": new mongoose_2.Types.ObjectId(threadId) }, { $push: { "threads.$.messages": Object.assign(Object.assign({}, message), messageDto) } }, { new: true })).threads.filter(thread => thread._id.equals(new mongoose_2.Types.ObjectId(threadId)))[0].messages.filter(message => message._id.equals(new mongoose_2.Types.ObjectId(messageId)))[0];
        });
    }
    delete(communityId, threadId, messageId, req) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            yield this.doesExist(communityId, threadId, messageId);
            const message = yield this.getById(communityId, threadId, messageId);
            if (!(yield this.isMyData(message.createdBy.toString(), req.user.id)) && !(req.user.roles.includes(role_enum_1.Role.Admin))) {
                throw new common_1.HttpException(`You cannot alter data that isn't yours!`, common_1.HttpStatus.BAD_REQUEST);
            }
            return (yield this.communityModel.findOneAndUpdate({ _id: new mongoose_2.Types.ObjectId(communityId), "threads._id": new mongoose_2.Types.ObjectId(threadId) }, { $pull: { "threads.$.messages": message } }, { new: true })).threads.filter(thread => thread._id.equals(new mongoose_2.Types.ObjectId(threadId)))[0];
        });
    }
    like(communityId, threadId, messageId, req) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            yield this.doesExist(communityId, threadId, messageId);
            let community;
            if ((yield this.communityModel.find({ $and: [{ _id: communityId }, { threads: { $elemMatch: { _id: threadId, messages: { $elemMatch: { _id: messageId, likes: { $in: [req.user.id] } } } } } }] })).length === 0) {
                community = (yield this.communityModel.findOneAndUpdate({ _id: new mongoose_2.Types.ObjectId(communityId), "threads._id": new mongoose_2.Types.ObjectId(threadId) }, { $push: { "threads.$.messages.$[message].likes": req.user.id } }, { arrayFilters: [{ "message._id": new mongoose_2.Types.ObjectId(messageId) }], new: true }));
            }
            else {
                community = (yield this.communityModel.findOneAndUpdate({ _id: new mongoose_2.Types.ObjectId(communityId), "threads._id": new mongoose_2.Types.ObjectId(threadId) }, { $pull: { "threads.$.messages.$[message].likes": req.user.id } }, { arrayFilters: [{ "message._id": new mongoose_2.Types.ObjectId(messageId) }], new: true }));
            }
            return community.threads.filter(thread => thread._id.equals(new mongoose_2.Types.ObjectId(threadId)))[0].messages.filter(message => message._id.equals(new mongoose_2.Types.ObjectId(messageId)))[0];
        });
    }
    isMyData(currentUserId, targetUserId) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            return new mongoose_2.Types.ObjectId(currentUserId).equals(new mongoose_2.Types.ObjectId(targetUserId));
        });
    }
    doesExist(communityId, threadId, messageId) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const community = yield this.communityModel.findOne({ _id: communityId });
            let threads;
            if (!community) {
                throw new common_1.HttpException(`Community with id of ${communityId} doesn't exist!`, common_1.HttpStatus.BAD_REQUEST);
            }
            if (threadId) {
                threads = yield community.threads.filter(thread => thread._id.equals(new mongoose_2.Types.ObjectId(threadId)));
                if (!(threads.length > 0)) {
                    throw new common_1.HttpException(`Thread with id of ${threadId} doesn't exist in the community with id of ${communityId}!`, common_1.HttpStatus.BAD_REQUEST);
                }
            }
            if (threadId && messageId) {
                if (!(threads[0].messages.filter(message => message._id.equals(new mongoose_2.Types.ObjectId(messageId))).length > 0)) {
                    throw new common_1.HttpException(`Message with id of ${messageId} doesn't exist in the thread with id of ${threadId}!`, common_1.HttpStatus.BAD_REQUEST);
                }
            }
        });
    }
};
MessageService = tslib_1.__decorate([
    (0, common_1.Injectable)(),
    tslib_1.__param(0, (0, mongoose_1.InjectModel)(community_schema_1.Community.name)),
    tslib_1.__param(1, (0, mongoose_1.InjectModel)(message_schema_1.Message.name)),
    tslib_1.__metadata("design:paramtypes", [typeof (_a = typeof mongoose_2.Model !== "undefined" && mongoose_2.Model) === "function" ? _a : Object, typeof (_b = typeof mongoose_2.Model !== "undefined" && mongoose_2.Model) === "function" ? _b : Object])
], MessageService);
exports.MessageService = MessageService;


/***/ }),

/***/ "./apps/riddet-api/src/app/shared/filters/validation.exception.ts":
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.ValidationException = void 0;
const common_1 = __webpack_require__("@nestjs/common");
class ValidationException extends common_1.BadRequestException {
    constructor(validationErrors) {
        super();
        this.validationErrors = validationErrors;
    }
}
exports.ValidationException = ValidationException;


/***/ }),

/***/ "./apps/riddet-api/src/app/shared/filters/validation.filter.ts":
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.ValidationFilter = void 0;
const tslib_1 = __webpack_require__("tslib");
const common_1 = __webpack_require__("@nestjs/common");
const validation_exception_1 = __webpack_require__("./apps/riddet-api/src/app/shared/filters/validation.exception.ts");
let ValidationFilter = class ValidationFilter {
    catch(exception, host) {
        const ctx = host.switchToHttp();
        const response = ctx.getResponse();
        return response.status(400).json({
            statusCode: 400,
            timestamp: new Date().toISOString(),
            errors: exception.validationErrors
        });
    }
};
ValidationFilter = tslib_1.__decorate([
    (0, common_1.Catch)(validation_exception_1.ValidationException)
], ValidationFilter);
exports.ValidationFilter = ValidationFilter;


/***/ }),

/***/ "./apps/riddet-api/src/app/shared/pipes/ParseObjectIdPipe.ts":
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.ParseObjectIdPipe = void 0;
const tslib_1 = __webpack_require__("tslib");
const common_1 = __webpack_require__("@nestjs/common");
const mongodb_1 = __webpack_require__("mongodb");
const validation_exception_1 = __webpack_require__("./apps/riddet-api/src/app/shared/filters/validation.exception.ts");
let ParseObjectIdPipe = class ParseObjectIdPipe {
    transform(value) {
        try {
            const transformedObjectId = mongodb_1.ObjectId.createFromHexString(value);
            return transformedObjectId;
        }
        catch (error) {
            throw new validation_exception_1.ValidationException([`ObjectId has wrong value: ${value}, ObjectId is not valid!`]);
        }
    }
    static isValidObjectId(value) {
        try {
            mongodb_1.ObjectId.createFromHexString(value);
            return true;
        }
        catch (error) {
            return false;
        }
    }
};
ParseObjectIdPipe = tslib_1.__decorate([
    (0, common_1.Injectable)()
], ParseObjectIdPipe);
exports.ParseObjectIdPipe = ParseObjectIdPipe;


/***/ }),

/***/ "./apps/riddet-api/src/app/thread/thread-dto.ts":
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.UpdateThreadDto = exports.CreateThreadDto = void 0;
const tslib_1 = __webpack_require__("tslib");
const class_validator_1 = __webpack_require__("class-validator");
class CreateThreadDto {
}
tslib_1.__decorate([
    (0, class_validator_1.IsString)({ message: 'Title must be a string!' }),
    (0, class_validator_1.IsDefined)({ message: 'Title is required!' }),
    (0, class_validator_1.MinLength)(5, { message: 'Title must be at least 5 characters long!' }),
    tslib_1.__metadata("design:type", String)
], CreateThreadDto.prototype, "title", void 0);
tslib_1.__decorate([
    (0, class_validator_1.IsString)({ message: 'Content must be a string!' }),
    (0, class_validator_1.IsDefined)({ message: 'Content is required!' }),
    tslib_1.__metadata("design:type", String)
], CreateThreadDto.prototype, "content", void 0);
tslib_1.__decorate([
    (0, class_validator_1.IsString)({ message: 'ImageUrl must be a string!' }),
    (0, class_validator_1.IsDefined)({ message: 'ImageUrl is required!' }),
    tslib_1.__metadata("design:type", String)
], CreateThreadDto.prototype, "imageUrl", void 0);
tslib_1.__decorate([
    (0, class_validator_1.IsString)({ message: 'ExternLink must be a string!' }),
    (0, class_validator_1.IsDefined)({ message: 'ExternLink is required!' }),
    tslib_1.__metadata("design:type", String)
], CreateThreadDto.prototype, "externLink", void 0);
exports.CreateThreadDto = CreateThreadDto;
class UpdateThreadDto {
}
tslib_1.__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)({ message: 'Title must be a string!' }),
    (0, class_validator_1.IsDefined)({ message: 'Title is required!' }),
    (0, class_validator_1.MinLength)(5, { message: 'Title must be at least 5 characters long!' }),
    tslib_1.__metadata("design:type", String)
], UpdateThreadDto.prototype, "title", void 0);
tslib_1.__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)({ message: 'Content must be a string!' }),
    (0, class_validator_1.IsDefined)({ message: 'Content is required!' }),
    tslib_1.__metadata("design:type", String)
], UpdateThreadDto.prototype, "content", void 0);
tslib_1.__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)({ message: 'ImageUrl must be a string!' }),
    (0, class_validator_1.IsDefined)({ message: 'ImageUrl is required!' }),
    tslib_1.__metadata("design:type", String)
], UpdateThreadDto.prototype, "imageUrl", void 0);
tslib_1.__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)({ message: 'ExternLink must be a string!' }),
    (0, class_validator_1.IsDefined)({ message: 'ExternLink is required!' }),
    tslib_1.__metadata("design:type", String)
], UpdateThreadDto.prototype, "externLink", void 0);
exports.UpdateThreadDto = UpdateThreadDto;


/***/ }),

/***/ "./apps/riddet-api/src/app/thread/thread.controller.ts":
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


var _a, _b, _c, _d, _e, _f, _g, _h, _j;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.ThreadController = void 0;
const tslib_1 = __webpack_require__("tslib");
const common_1 = __webpack_require__("@nestjs/common");
const auth_module_1 = __webpack_require__("./apps/riddet-api/src/app/auth/auth.module.ts");
const ParseObjectIdPipe_1 = __webpack_require__("./apps/riddet-api/src/app/shared/pipes/ParseObjectIdPipe.ts");
const thread_dto_1 = __webpack_require__("./apps/riddet-api/src/app/thread/thread-dto.ts");
const thread_service_1 = __webpack_require__("./apps/riddet-api/src/app/thread/thread.service.ts");
let ThreadController = class ThreadController {
    constructor(threadService) {
        this.threadService = threadService;
    }
    getById(communityId, threadId) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            common_1.Logger.log(`Getting thread with id: ${threadId} from community with id of ${communityId} (READ)`);
            return yield this.threadService.getById(communityId, threadId);
        });
    }
    getAll(communityId) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            common_1.Logger.log(`Getting all threads from community with an id of: ${communityId} (READ)`);
            return this.threadService.getAll(communityId);
        });
    }
    create(communityId, req, createThreadDto) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            common_1.Logger.log(`Creating thread (CREATE)`);
            return this.threadService.create(createThreadDto, communityId, req);
        });
    }
    update(communityId, threadId, req, updateThreadDto) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            common_1.Logger.log(`Getting thread with id: ${threadId} (UPDATE)`);
            return this.threadService.update(communityId, threadId, req, updateThreadDto);
        });
    }
    delete(communityId, threadId, req) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            common_1.Logger.log(`Getting thread with id: ${threadId} from community with id: ${communityId} (DELETE)`);
            return this.threadService.delete(communityId, threadId, req);
        });
    }
    upvote(communityId, threadId, req) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            common_1.Logger.log(`Creating thread (CREATE)`);
            return this.threadService.upvote(communityId, threadId, req);
        });
    }
};
tslib_1.__decorate([
    (0, auth_module_1.Public)(),
    (0, common_1.Get)('communities/:communityId/threads/:threadId'),
    tslib_1.__param(0, (0, common_1.Param)('communityId', ParseObjectIdPipe_1.ParseObjectIdPipe)),
    tslib_1.__param(1, (0, common_1.Param)('threadId', ParseObjectIdPipe_1.ParseObjectIdPipe)),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [String, String]),
    tslib_1.__metadata("design:returntype", typeof (_b = typeof Promise !== "undefined" && Promise) === "function" ? _b : Object)
], ThreadController.prototype, "getById", null);
tslib_1.__decorate([
    (0, auth_module_1.Public)(),
    (0, common_1.Get)('communities/:communityId/threads'),
    tslib_1.__param(0, (0, common_1.Param)('communityId', ParseObjectIdPipe_1.ParseObjectIdPipe)),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [String]),
    tslib_1.__metadata("design:returntype", typeof (_c = typeof Promise !== "undefined" && Promise) === "function" ? _c : Object)
], ThreadController.prototype, "getAll", null);
tslib_1.__decorate([
    (0, common_1.Post)('communities/:communityId/threads'),
    tslib_1.__param(0, (0, common_1.Param)('communityId', ParseObjectIdPipe_1.ParseObjectIdPipe)),
    tslib_1.__param(1, (0, common_1.Req)()),
    tslib_1.__param(2, (0, common_1.Body)()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [String, Object, typeof (_d = typeof thread_dto_1.CreateThreadDto !== "undefined" && thread_dto_1.CreateThreadDto) === "function" ? _d : Object]),
    tslib_1.__metadata("design:returntype", typeof (_e = typeof Promise !== "undefined" && Promise) === "function" ? _e : Object)
], ThreadController.prototype, "create", null);
tslib_1.__decorate([
    (0, common_1.Patch)('communities/:communityId/threads/:threadId'),
    tslib_1.__param(0, (0, common_1.Param)('communityId', ParseObjectIdPipe_1.ParseObjectIdPipe)),
    tslib_1.__param(1, (0, common_1.Param)('threadId', ParseObjectIdPipe_1.ParseObjectIdPipe)),
    tslib_1.__param(2, (0, common_1.Req)()),
    tslib_1.__param(3, (0, common_1.Body)()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [String, String, Object, typeof (_f = typeof thread_dto_1.UpdateThreadDto !== "undefined" && thread_dto_1.UpdateThreadDto) === "function" ? _f : Object]),
    tslib_1.__metadata("design:returntype", typeof (_g = typeof Promise !== "undefined" && Promise) === "function" ? _g : Object)
], ThreadController.prototype, "update", null);
tslib_1.__decorate([
    (0, common_1.Delete)('communities/:communityId/threads/:threadId'),
    tslib_1.__param(0, (0, common_1.Param)('communityId', ParseObjectIdPipe_1.ParseObjectIdPipe)),
    tslib_1.__param(1, (0, common_1.Param)('threadId', ParseObjectIdPipe_1.ParseObjectIdPipe)),
    tslib_1.__param(2, (0, common_1.Req)()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [String, String, Object]),
    tslib_1.__metadata("design:returntype", typeof (_h = typeof Promise !== "undefined" && Promise) === "function" ? _h : Object)
], ThreadController.prototype, "delete", null);
tslib_1.__decorate([
    (0, common_1.Post)('communities/:communityId/threads/:threadId/upvote'),
    tslib_1.__param(0, (0, common_1.Param)('communityId', ParseObjectIdPipe_1.ParseObjectIdPipe)),
    tslib_1.__param(1, (0, common_1.Param)('threadId', ParseObjectIdPipe_1.ParseObjectIdPipe)),
    tslib_1.__param(2, (0, common_1.Req)()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [String, String, Object]),
    tslib_1.__metadata("design:returntype", typeof (_j = typeof Promise !== "undefined" && Promise) === "function" ? _j : Object)
], ThreadController.prototype, "upvote", null);
ThreadController = tslib_1.__decorate([
    (0, common_1.Controller)(),
    tslib_1.__metadata("design:paramtypes", [typeof (_a = typeof thread_service_1.ThreadService !== "undefined" && thread_service_1.ThreadService) === "function" ? _a : Object])
], ThreadController);
exports.ThreadController = ThreadController;


/***/ }),

/***/ "./apps/riddet-api/src/app/thread/thread.module.ts":
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.ThreadModule = void 0;
const tslib_1 = __webpack_require__("tslib");
const common_1 = __webpack_require__("@nestjs/common");
const mongoose_1 = __webpack_require__("@nestjs/mongoose");
const community_module_1 = __webpack_require__("./apps/riddet-api/src/app/community/community.module.ts");
const user_module_1 = __webpack_require__("./apps/riddet-api/src/app/user/user.module.ts");
const thread_controller_1 = __webpack_require__("./apps/riddet-api/src/app/thread/thread.controller.ts");
const thread_schema_1 = __webpack_require__("./apps/riddet-api/src/app/thread/thread.schema.ts");
const thread_service_1 = __webpack_require__("./apps/riddet-api/src/app/thread/thread.service.ts");
let ThreadModule = class ThreadModule {
};
ThreadModule = tslib_1.__decorate([
    (0, common_1.Module)({
        imports: [
            mongoose_1.MongooseModule.forFeature([
                { name: thread_schema_1.Thread.name, schema: thread_schema_1.ThreadSchema },
            ]), community_module_1.CommunityModule, user_module_1.UserModule
        ],
        controllers: [thread_controller_1.ThreadController],
        providers: [thread_service_1.ThreadService, mongoose_1.MongooseModule],
    })
], ThreadModule);
exports.ThreadModule = ThreadModule;


/***/ }),

/***/ "./apps/riddet-api/src/app/thread/thread.schema.ts":
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


var _a, _b;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.ThreadSchema = exports.Thread = void 0;
const tslib_1 = __webpack_require__("tslib");
const mongoose_1 = __webpack_require__("@nestjs/mongoose");
const class_validator_1 = __webpack_require__("class-validator");
const mongoose_2 = __webpack_require__("mongoose");
let Thread = class Thread {
};
tslib_1.__decorate([
    (0, class_validator_1.IsString)({ message: 'Name must be a string!' }),
    (0, class_validator_1.IsDefined)({ message: 'Name is required!' }),
    (0, class_validator_1.MinLength)(5, { message: 'Name must be at least 5 characters long!' }),
    (0, mongoose_1.Prop)(),
    tslib_1.__metadata("design:type", String)
], Thread.prototype, "title", void 0);
tslib_1.__decorate([
    (0, mongoose_1.Prop)(),
    tslib_1.__metadata("design:type", String)
], Thread.prototype, "content", void 0);
tslib_1.__decorate([
    (0, class_validator_1.IsString)({ message: 'Image URL must be a string!' }),
    (0, mongoose_1.Prop)(),
    tslib_1.__metadata("design:type", String)
], Thread.prototype, "imageUrl", void 0);
tslib_1.__decorate([
    (0, class_validator_1.IsString)({ message: 'ExternLink must be a string!' }),
    (0, mongoose_1.Prop)(),
    tslib_1.__metadata("design:type", String)
], Thread.prototype, "externLink", void 0);
tslib_1.__decorate([
    (0, mongoose_1.Prop)(),
    tslib_1.__metadata("design:type", Number)
], Thread.prototype, "views", void 0);
tslib_1.__decorate([
    (0, mongoose_1.Prop)({
        default: [],
        ref: 'User',
    }),
    tslib_1.__metadata("design:type", Array)
], Thread.prototype, "upvotes", void 0);
tslib_1.__decorate([
    (0, class_validator_1.IsDate)({ message: 'Publication date must be a date!' }),
    (0, mongoose_1.Prop)(),
    tslib_1.__metadata("design:type", typeof (_a = typeof Date !== "undefined" && Date) === "function" ? _a : Object)
], Thread.prototype, "publicationDate", void 0);
tslib_1.__decorate([
    (0, mongoose_1.Prop)({
        default: [],
    }),
    tslib_1.__metadata("design:type", Array)
], Thread.prototype, "messages", void 0);
tslib_1.__decorate([
    (0, mongoose_1.Prop)({
        ref: 'User',
    }),
    tslib_1.__metadata("design:type", typeof (_b = typeof mongoose_2.ObjectId !== "undefined" && mongoose_2.ObjectId) === "function" ? _b : Object)
], Thread.prototype, "createdBy", void 0);
Thread = tslib_1.__decorate([
    (0, mongoose_1.Schema)()
], Thread);
exports.Thread = Thread;
exports.ThreadSchema = mongoose_1.SchemaFactory.createForClass(Thread);


/***/ }),

/***/ "./apps/riddet-api/src/app/thread/thread.service.ts":
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


var _a, _b;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.ThreadService = void 0;
const tslib_1 = __webpack_require__("tslib");
const common_1 = __webpack_require__("@nestjs/common");
const mongoose_1 = __webpack_require__("@nestjs/mongoose");
const mongoose_2 = __webpack_require__("mongoose");
const role_enum_1 = __webpack_require__("./apps/riddet-api/src/app/auth/role.enum.ts");
const community_schema_1 = __webpack_require__("./apps/riddet-api/src/app/community/community.schema.ts");
const user_service_1 = __webpack_require__("./apps/riddet-api/src/app/user/user.service.ts");
let ThreadService = class ThreadService {
    constructor(communityModel, userService) {
        this.communityModel = communityModel;
        this.userService = userService;
    }
    getById(communityId, threadId) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            yield this.doesExist(communityId, threadId);
            yield this.communityModel.findOneAndUpdate({ _id: new mongoose_2.Types.ObjectId(communityId), "threads._id": new mongoose_2.Types.ObjectId(threadId) }, { $inc: { "threads.$.views": 1 } });
            const thread = (yield this.communityModel.aggregate([
                { $match: { _id: new mongoose_2.Types.ObjectId(communityId) } },
                { $match: { "threads._id": new mongoose_2.Types.ObjectId(threadId) } },
                { $unwind: { path: "$participants", preserveNullAndEmptyArrays: true } },
                { $project: {
                        _id: 0,
                        "threads": {
                            $filter: {
                                input: "$threads",
                                as: "thread",
                                cond: { $eq: ["$$thread._id", new mongoose_2.Types.ObjectId(threadId)] }
                            }
                        }
                    }
                },
                { $unwind: { path: "$threads", preserveNullAndEmptyArrays: true } },
                { $lookup: {
                        from: "users",
                        localField: "threads.createdBy",
                        foreignField: "_id",
                        as: "threads.createdBy"
                    } },
                { $unwind: { path: "$threads.messages", preserveNullAndEmptyArrays: true } },
                { $lookup: {
                        from: "users",
                        localField: "threads.messages.createdBy",
                        foreignField: "_id",
                        as: "threads.messages.createdBy"
                    } },
                { $set: {
                        "threads.messages.createdBy": "$threads.messages.createdBy"
                    } },
                { $group: {
                        _id: "$threads._id",
                        title: {
                            $first: "$threads.title"
                        },
                        content: {
                            $first: "$threads.content"
                        },
                        externLink: {
                            $first: "$threads.externLink"
                        },
                        views: {
                            $first: "$threads.views"
                        },
                        imageUrl: {
                            $first: "$threads.imageUrl"
                        },
                        upvotes: {
                            $first: "$threads.upvotes"
                        },
                        messages: {
                            $push: "$threads.messages"
                        },
                        publicationDate: {
                            $first: "$threads.publicationDate"
                        },
                        createdBy: {
                            $first: "$threads.createdBy"
                        }
                    } },
                { $unset: ["createdBy.password", "createdBy.__v", "messages.createdBy.password", "messages.createdBy.__v"] },
            ]))[0];
            return Object.assign(Object.assign({}, thread), { createdBy: thread.createdBy[0], messages: thread.messages.map(message => (Object.assign(Object.assign({}, message), { createdBy: message.createdBy[0] }))) });
        });
    }
    getAll(communityId) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            yield this.doesExist(communityId);
            return (yield this.communityModel.aggregate([
                { $match: { _id: new mongoose_2.Types.ObjectId(communityId) } },
                { $unwind: { path: "$participants", preserveNullAndEmptyArrays: true } },
                { $project: {
                        _id: 0,
                        "threads": {
                            $filter: {
                                input: "$threads",
                                as: "thread",
                                cond: true
                            }
                        }
                    }
                },
                { $unwind: { path: "$threads", preserveNullAndEmptyArrays: false } },
                { $unwind: { path: "$threads.createdBy", preserveNullAndEmptyArrays: true } },
                { $lookup: {
                        from: "users",
                        localField: "threads.createdBy",
                        foreignField: "_id",
                        as: "threads.createdBy"
                    } },
                { $unwind: { path: "$threads.messages", preserveNullAndEmptyArrays: true } },
                { $lookup: {
                        from: "users",
                        localField: "threads.messages.createdBy",
                        foreignField: "_id",
                        as: "threads.messages.createdBy"
                    } },
                { $set: {
                        "threads.messages.createdBy": "$threads.messages.createdBy"
                    } },
                { $group: {
                        _id: "$threads._id",
                        title: {
                            $first: "$threads.title"
                        },
                        content: {
                            $first: "$threads.content"
                        },
                        externLink: {
                            $first: "$threads.externLink"
                        },
                        views: {
                            $first: "$threads.views"
                        },
                        imageUrl: {
                            $first: "$threads.imageUrl"
                        },
                        upvotes: {
                            $first: "$threads.upvotes"
                        },
                        messages: {
                            $push: "$threads.messages"
                        },
                        publicationDate: {
                            $first: "$threads.publicationDate"
                        },
                        createdBy: {
                            $first: "$threads.createdBy"
                        }
                    } },
                { $unset: ["createdBy.password", "createdBy.__v", "messages.createdBy.password", "messages.createdBy.__v"] },
            ])).map(thread => thread = Object.assign(Object.assign({}, thread), { createdBy: thread.createdBy[0], messages: thread.messages.map(message => message = Object.assign(Object.assign({}, message), { createdBy: message.createdBy[0] })) }));
        });
    }
    create(createThreadDto, communityId, req) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            yield this.doesExist(communityId);
            const community = yield this.communityModel.findOne({ _id: communityId });
            if (!((yield this.communityModel.find({ $and: [{ _id: communityId }, { participants: { $in: [req.user.id] } }] })).length > 0)
                && !(community.createdBy._id.equals(new mongoose_2.Types.ObjectId(req.user.id)))
                && !(req.user.roles.includes(role_enum_1.Role.Admin))) {
                throw new common_1.HttpException(`You are not a member of this community`, common_1.HttpStatus.BAD_REQUEST);
            }
            const mergedthread = Object.assign(Object.assign({ _id: new mongoose_2.Types.ObjectId() }, createThreadDto), { views: 0, upvotes: [], publicationDate: new Date(), messages: [], createdBy: req.user.id });
            return yield this.communityModel.findOneAndUpdate({ _id: communityId }, { $push: { threads: mergedthread } }, { new: true });
        });
    }
    update(communityId, threadId, req, updateThreadDto) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            yield this.doesExist(communityId, threadId);
            const thread = (yield this.communityModel.findOne({ _id: communityId }, { threads: { $elemMatch: { _id: threadId } } }))
                .threads.filter((thread) => tslib_1.__awaiter(this, void 0, void 0, function* () { return thread._id === new mongoose_2.Types.ObjectId(threadId); }))[0];
            if (!(yield this.isMyData(thread.createdBy.toString(), req.user.id)) && !(req.user.roles.includes(role_enum_1.Role.Admin))) {
                throw new common_1.HttpException(`You cannot alter data that isn't yours!`, common_1.HttpStatus.BAD_REQUEST);
            }
            return yield this.communityModel.findOneAndUpdate({ _id: communityId, "threads._id": threadId }, { $set: { "threads.$": Object.assign(Object.assign({}, thread), updateThreadDto) } }, { new: true });
        });
    }
    delete(communityId, threadId, req) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            yield this.doesExist(communityId, threadId);
            const thread = (yield this.communityModel.findOne({ _id: communityId }, { threads: { $elemMatch: { _id: threadId } } }))
                .threads.filter((thread) => tslib_1.__awaiter(this, void 0, void 0, function* () { return thread._id === new mongoose_2.Types.ObjectId(threadId); }))[0];
            if (!(yield this.isMyData(thread.createdBy.toString(), req.user.id)) && !(req.user.roles.includes(role_enum_1.Role.Admin))) {
                throw new common_1.HttpException(`You cannot alter data that isn't yours!`, common_1.HttpStatus.BAD_REQUEST);
            }
            return (yield this.communityModel.findOneAndUpdate({ _id: new mongoose_2.Types.ObjectId(communityId) }, { $pull: { threads: { _id: new mongoose_2.Types.ObjectId(threadId) } } }, { new: true }));
        });
    }
    upvote(communityId, threadId, req) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            yield this.doesExist(communityId, threadId);
            let community;
            if ((yield this.communityModel.find({ $and: [{ _id: communityId }, { threads: { $elemMatch: { _id: threadId, upvotes: { $in: [req.user.id] } } } }] })).length === 0) {
                community = yield this.communityModel.findOneAndUpdate({ _id: communityId, "threads._id": threadId }, { $push: { "threads.$.upvotes": req.user.id } }, { new: true });
            }
            else {
                community = yield this.communityModel.findOneAndUpdate({ _id: communityId, "threads._id": threadId }, { $pull: { "threads.$.upvotes": req.user.id } }, { new: true });
            }
            return community.threads.filter((thread) => tslib_1.__awaiter(this, void 0, void 0, function* () { return thread._id === new mongoose_2.Types.ObjectId(threadId); }))[0];
        });
    }
    //validation
    isMyData(currentUserId, targetUserId) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            return new mongoose_2.Types.ObjectId(currentUserId).equals(new mongoose_2.Types.ObjectId(targetUserId));
        });
    }
    doesExist(communityId, threadId) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const community = yield this.communityModel.findOne({ _id: communityId });
            if (!community) {
                throw new common_1.HttpException(`Community with id of ${communityId} doesn't exist!`, common_1.HttpStatus.BAD_REQUEST);
            }
            if (threadId) {
                if (!(community.threads.filter(thread => thread._id.equals(new mongoose_2.Types.ObjectId(threadId))).length > 0)) {
                    throw new common_1.HttpException(`Thread with id of ${threadId} doesn't exist in the community with id of ${communityId}!`, common_1.HttpStatus.BAD_REQUEST);
                }
            }
        });
    }
};
ThreadService = tslib_1.__decorate([
    (0, common_1.Injectable)(),
    tslib_1.__param(0, (0, mongoose_1.InjectModel)(community_schema_1.Community.name)),
    tslib_1.__metadata("design:paramtypes", [typeof (_a = typeof mongoose_2.Model !== "undefined" && mongoose_2.Model) === "function" ? _a : Object, typeof (_b = typeof user_service_1.UserService !== "undefined" && user_service_1.UserService) === "function" ? _b : Object])
], ThreadService);
exports.ThreadService = ThreadService;


/***/ }),

/***/ "./apps/riddet-api/src/app/user/user.controller.ts":
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


var _a, _b, _c, _d, _e, _f, _g, _h;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.UserController = void 0;
const tslib_1 = __webpack_require__("tslib");
const common_1 = __webpack_require__("@nestjs/common");
const auth_module_1 = __webpack_require__("./apps/riddet-api/src/app/auth/auth.module.ts");
const role_enum_1 = __webpack_require__("./apps/riddet-api/src/app/auth/role.enum.ts");
const ParseObjectIdPipe_1 = __webpack_require__("./apps/riddet-api/src/app/shared/pipes/ParseObjectIdPipe.ts");
const user_dto_1 = __webpack_require__("./apps/riddet-api/src/app/user/user.dto.ts");
const user_service_1 = __webpack_require__("./apps/riddet-api/src/app/user/user.service.ts");
let UserController = class UserController {
    constructor(userService) {
        this.userService = userService;
    }
    getById(id) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            common_1.Logger.log(`Getting user with id: ${id} (READ)`);
            return yield this.userService.getById(id);
        });
    }
    getAll() {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            common_1.Logger.log(`Getting all users (READ)`);
            return this.userService.getAll();
        });
    }
    create(createUserDto) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            common_1.Logger.log(`Creating community (CREATE)`);
            return this.userService.create(createUserDto);
        });
    }
    update(req, id, updateUserDto) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            common_1.Logger.log(`Getting user with id: ${id} (UPDATE)`);
            return this.userService.update(id, updateUserDto, req);
        });
    }
    //Follow
    follow(req, id) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            common_1.Logger.log(`Getting user with id: ${id} (READ)`);
            return this.userService.follow(id, req);
        });
    }
    unfollow(req, id) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            common_1.Logger.log(`Getting user with id: ${id} (READ)`);
            return this.userService.unfollow(id, req);
        });
    }
};
tslib_1.__decorate([
    (0, common_1.Get)('users/:id'),
    tslib_1.__param(0, (0, common_1.Param)('id', ParseObjectIdPipe_1.ParseObjectIdPipe)),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [String]),
    tslib_1.__metadata("design:returntype", typeof (_b = typeof Promise !== "undefined" && Promise) === "function" ? _b : Object)
], UserController.prototype, "getById", null);
tslib_1.__decorate([
    (0, common_1.Get)('users'),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", []),
    tslib_1.__metadata("design:returntype", typeof (_c = typeof Promise !== "undefined" && Promise) === "function" ? _c : Object)
], UserController.prototype, "getAll", null);
tslib_1.__decorate([
    (0, auth_module_1.Roles)(role_enum_1.Role.Admin),
    (0, common_1.Post)('users'),
    tslib_1.__param(0, (0, common_1.Body)()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [typeof (_d = typeof user_dto_1.CreateUserDto !== "undefined" && user_dto_1.CreateUserDto) === "function" ? _d : Object]),
    tslib_1.__metadata("design:returntype", typeof (_e = typeof Promise !== "undefined" && Promise) === "function" ? _e : Object)
], UserController.prototype, "create", null);
tslib_1.__decorate([
    (0, common_1.Patch)('users/:id'),
    tslib_1.__param(0, (0, common_1.Req)()),
    tslib_1.__param(1, (0, common_1.Param)('id', ParseObjectIdPipe_1.ParseObjectIdPipe)),
    tslib_1.__param(2, (0, common_1.Body)()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Object, String, typeof (_f = typeof user_dto_1.UpdateUserDto !== "undefined" && user_dto_1.UpdateUserDto) === "function" ? _f : Object]),
    tslib_1.__metadata("design:returntype", typeof (_g = typeof Promise !== "undefined" && Promise) === "function" ? _g : Object)
], UserController.prototype, "update", null);
tslib_1.__decorate([
    (0, common_1.Post)('users/:id/follow'),
    tslib_1.__param(0, (0, common_1.Req)()),
    tslib_1.__param(1, (0, common_1.Param)('id', ParseObjectIdPipe_1.ParseObjectIdPipe)),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Object, String]),
    tslib_1.__metadata("design:returntype", typeof (_h = typeof Promise !== "undefined" && Promise) === "function" ? _h : Object)
], UserController.prototype, "follow", null);
tslib_1.__decorate([
    (0, common_1.Post)('users/:id/unfollow'),
    tslib_1.__param(0, (0, common_1.Req)()),
    tslib_1.__param(1, (0, common_1.Param)('id', ParseObjectIdPipe_1.ParseObjectIdPipe)),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Object, String]),
    tslib_1.__metadata("design:returntype", Promise)
], UserController.prototype, "unfollow", null);
UserController = tslib_1.__decorate([
    (0, common_1.Controller)(),
    tslib_1.__metadata("design:paramtypes", [typeof (_a = typeof user_service_1.UserService !== "undefined" && user_service_1.UserService) === "function" ? _a : Object])
], UserController);
exports.UserController = UserController;


/***/ }),

/***/ "./apps/riddet-api/src/app/user/user.dto.ts":
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


var _a, _b;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.UpdateUserDto = exports.CreateUserDto = void 0;
const tslib_1 = __webpack_require__("tslib");
const class_validator_1 = __webpack_require__("class-validator");
class CreateUserDto {
}
tslib_1.__decorate([
    (0, class_validator_1.IsString)({ message: 'Username must be a string!' }),
    (0, class_validator_1.IsDefined)({ message: 'Username is required!' }),
    (0, class_validator_1.MinLength)(5, { message: 'Username must be at least 5 characters long!' }),
    tslib_1.__metadata("design:type", String)
], CreateUserDto.prototype, "username", void 0);
tslib_1.__decorate([
    (0, class_validator_1.IsString)({ message: 'Firstname must be a string!' }),
    (0, class_validator_1.IsDefined)({ message: 'Firstname is required!' }),
    tslib_1.__metadata("design:type", String)
], CreateUserDto.prototype, "firstname", void 0);
tslib_1.__decorate([
    (0, class_validator_1.IsString)({ message: 'Firstname must be a string!' }),
    (0, class_validator_1.IsDefined)({ message: 'Firstname is required!' }),
    tslib_1.__metadata("design:type", String)
], CreateUserDto.prototype, "lastname", void 0);
tslib_1.__decorate([
    (0, class_validator_1.IsEmail)({ message: 'Email must be a valid email!' }),
    (0, class_validator_1.IsString)({ message: 'Email must be a string!' }),
    (0, class_validator_1.IsDefined)({ message: 'Email is required!' }),
    tslib_1.__metadata("design:type", String)
], CreateUserDto.prototype, "email", void 0);
tslib_1.__decorate([
    (0, class_validator_1.Matches)(/^\d{4}[./-]\d{2}[./-]\d{2}$/, { message: 'Date of birth must be a valid date! (YYYY-MM-DD)' }),
    (0, class_validator_1.IsDefined)({ message: 'Date of birth is required!' }),
    tslib_1.__metadata("design:type", typeof (_a = typeof Date !== "undefined" && Date) === "function" ? _a : Object)
], CreateUserDto.prototype, "dateOfBirth", void 0);
tslib_1.__decorate([
    (0, class_validator_1.IsString)({ message: 'Password must be a string!' }),
    (0, class_validator_1.IsDefined)({ message: 'Password is required!' }),
    (0, class_validator_1.MinLength)(8, { message: 'Password must be at least 8 characters long!' }),
    tslib_1.__metadata("design:type", String)
], CreateUserDto.prototype, "password", void 0);
tslib_1.__decorate([
    (0, class_validator_1.IsString)({ message: 'UserImageUrl must be a string!' }),
    (0, class_validator_1.IsDefined)({ message: 'UserImageUrl is required!' }),
    tslib_1.__metadata("design:type", String)
], CreateUserDto.prototype, "userImageUrl", void 0);
exports.CreateUserDto = CreateUserDto;
class UpdateUserDto {
}
tslib_1.__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)({ message: 'Username must be a string!' }),
    (0, class_validator_1.IsDefined)({ message: 'Username is required!' }),
    (0, class_validator_1.MinLength)(5, { message: 'Username must be at least 5 characters long!' }),
    tslib_1.__metadata("design:type", String)
], UpdateUserDto.prototype, "username", void 0);
tslib_1.__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)({ message: 'Firstname must be a string!' }),
    (0, class_validator_1.IsDefined)({ message: 'Firstname is required!' }),
    tslib_1.__metadata("design:type", String)
], UpdateUserDto.prototype, "firstname", void 0);
tslib_1.__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)({ message: 'Firstname must be a string!' }),
    (0, class_validator_1.IsDefined)({ message: 'Firstname is required!' }),
    tslib_1.__metadata("design:type", String)
], UpdateUserDto.prototype, "lastname", void 0);
tslib_1.__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsEmail)({ message: 'Email must be a valid email!' }),
    (0, class_validator_1.IsString)({ message: 'Email must be a string!' }),
    (0, class_validator_1.IsDefined)({ message: 'Email is required!' }),
    tslib_1.__metadata("design:type", String)
], UpdateUserDto.prototype, "email", void 0);
tslib_1.__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.Matches)(/^\d{4}[./-]\d{2}[./-]\d{2}$/, { message: 'Date of birth must be a valid date! (YYYY-MM-DD)' }),
    (0, class_validator_1.IsDefined)({ message: 'Date of birth is required!' }),
    tslib_1.__metadata("design:type", typeof (_b = typeof Date !== "undefined" && Date) === "function" ? _b : Object)
], UpdateUserDto.prototype, "dateOfBirth", void 0);
tslib_1.__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)({ message: 'Password must be a string!' }),
    (0, class_validator_1.IsDefined)({ message: 'Password is required!' }),
    (0, class_validator_1.MinLength)(8, { message: 'Password must be at least 8 characters long!' }),
    tslib_1.__metadata("design:type", String)
], UpdateUserDto.prototype, "password", void 0);
tslib_1.__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)({ message: 'UserImageUrl must be a string!' }),
    (0, class_validator_1.IsDefined)({ message: 'UserImageUrl is required!' }),
    tslib_1.__metadata("design:type", String)
], UpdateUserDto.prototype, "userImageUrl", void 0);
exports.UpdateUserDto = UpdateUserDto;


/***/ }),

/***/ "./apps/riddet-api/src/app/user/user.module.ts":
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.UserModule = void 0;
const tslib_1 = __webpack_require__("tslib");
const common_1 = __webpack_require__("@nestjs/common");
const mongoose_1 = __webpack_require__("@nestjs/mongoose");
const community_module_1 = __webpack_require__("./apps/riddet-api/src/app/community/community.module.ts");
// import { Neo4jModule } from '../neo4j/neo4j.module';
const user_controller_1 = __webpack_require__("./apps/riddet-api/src/app/user/user.controller.ts");
const user_schema_1 = __webpack_require__("./apps/riddet-api/src/app/user/user.schema.ts");
const user_service_1 = __webpack_require__("./apps/riddet-api/src/app/user/user.service.ts");
let UserModule = class UserModule {
};
UserModule = tslib_1.__decorate([
    (0, common_1.Module)({
        imports: [
            // Neo4jModule.forRoot({
            //   scheme: 'bolt',
            //   host: '127.0.0.1',
            //   port: 7687,
            //   username: 'neo4j',
            //   password: 'neo',
            // }),
            mongoose_1.MongooseModule.forFeature([
                { name: user_schema_1.User.name, schema: user_schema_1.UserSchema },
            ]), (0, common_1.forwardRef)(() => community_module_1.CommunityModule)
        ],
        providers: [user_service_1.UserService],
        controllers: [user_controller_1.UserController],
        exports: [user_service_1.UserService],
    })
], UserModule);
exports.UserModule = UserModule;


/***/ }),

/***/ "./apps/riddet-api/src/app/user/user.schema.ts":
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


var _a, _b;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.UserSchema = exports.User = void 0;
const tslib_1 = __webpack_require__("tslib");
const mongoose_1 = __webpack_require__("@nestjs/mongoose");
const class_validator_1 = __webpack_require__("class-validator");
let User = class User {
};
tslib_1.__decorate([
    (0, class_validator_1.IsString)({ message: 'Username must be a string!' }),
    (0, class_validator_1.IsDefined)({ message: 'Username is required!' }),
    (0, class_validator_1.MinLength)(5, { message: 'Username must be at least 5 characters long!' }),
    (0, mongoose_1.Prop)(),
    tslib_1.__metadata("design:type", String)
], User.prototype, "username", void 0);
tslib_1.__decorate([
    (0, class_validator_1.IsString)({ message: 'Firstname must be a string!' }),
    (0, class_validator_1.IsDefined)({ message: 'Firstname is required!' }),
    (0, mongoose_1.Prop)(),
    tslib_1.__metadata("design:type", String)
], User.prototype, "firstname", void 0);
tslib_1.__decorate([
    (0, class_validator_1.IsString)({ message: 'Lastname must be a string!' }),
    (0, class_validator_1.IsDefined)({ message: 'Lastname is required!' }),
    (0, mongoose_1.Prop)(),
    tslib_1.__metadata("design:type", String)
], User.prototype, "lastname", void 0);
tslib_1.__decorate([
    (0, class_validator_1.IsEmail)({ message: 'Email must be a valid email!' }),
    (0, class_validator_1.IsString)({ message: 'Email must be a string!' }),
    (0, class_validator_1.IsDefined)({ message: 'Email is required!' }),
    (0, mongoose_1.Prop)(),
    tslib_1.__metadata("design:type", String)
], User.prototype, "email", void 0);
tslib_1.__decorate([
    (0, class_validator_1.Matches)(/^\d{4}[./-]\d{2}[./-]\d{2}$/, { message: 'Date of birth must be a valid date! (YYYY-MM-DD)' }),
    (0, class_validator_1.IsDefined)({ message: 'Date of birth is required!' }),
    (0, mongoose_1.Prop)(),
    tslib_1.__metadata("design:type", typeof (_a = typeof Date !== "undefined" && Date) === "function" ? _a : Object)
], User.prototype, "dateOfBirth", void 0);
tslib_1.__decorate([
    (0, class_validator_1.IsString)({ message: 'Password must be a string!' }),
    (0, class_validator_1.IsDefined)({ message: 'Password is required!' }),
    (0, class_validator_1.MinLength)(8, { message: 'Password must be at least 8 characters long!' }),
    (0, mongoose_1.Prop)(),
    tslib_1.__metadata("design:type", String)
], User.prototype, "password", void 0);
tslib_1.__decorate([
    (0, class_validator_1.IsString)({ message: 'UserImageUrl must be a string!' }),
    (0, class_validator_1.IsDefined)({ message: 'UserImageUrl is required!' }),
    (0, mongoose_1.Prop)(),
    tslib_1.__metadata("design:type", String)
], User.prototype, "userImageUrl", void 0);
tslib_1.__decorate([
    (0, class_validator_1.IsDate)({ message: 'Creation date must be a date!' }),
    (0, mongoose_1.Prop)(),
    tslib_1.__metadata("design:type", typeof (_b = typeof Date !== "undefined" && Date) === "function" ? _b : Object)
], User.prototype, "creationDate", void 0);
tslib_1.__decorate([
    (0, class_validator_1.IsBoolean)({ message: 'isActive must be a boolean!' }),
    (0, mongoose_1.Prop)(),
    tslib_1.__metadata("design:type", Boolean)
], User.prototype, "isActive", void 0);
tslib_1.__decorate([
    (0, mongoose_1.Prop)(),
    tslib_1.__metadata("design:type", Array)
], User.prototype, "roles", void 0);
tslib_1.__decorate([
    (0, mongoose_1.Prop)({
        default: [],
        ref: 'Community',
    }),
    tslib_1.__metadata("design:type", Array)
], User.prototype, "joinedCommunities", void 0);
tslib_1.__decorate([
    (0, mongoose_1.Prop)({
        default: [],
        ref: 'Community',
    }),
    tslib_1.__metadata("design:type", Array)
], User.prototype, "createdCommunities", void 0);
tslib_1.__decorate([
    (0, mongoose_1.Prop)({
        default: [],
        ref: 'User',
    }),
    tslib_1.__metadata("design:type", Array)
], User.prototype, "following", void 0);
tslib_1.__decorate([
    (0, mongoose_1.Prop)({
        default: [],
        ref: 'User',
    }),
    tslib_1.__metadata("design:type", Array)
], User.prototype, "followers", void 0);
User = tslib_1.__decorate([
    (0, mongoose_1.Schema)()
], User);
exports.User = User;
exports.UserSchema = mongoose_1.SchemaFactory.createForClass(User);


/***/ }),

/***/ "./apps/riddet-api/src/app/user/user.service.ts":
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


var _a, _b, _c;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.UserService = void 0;
const tslib_1 = __webpack_require__("tslib");
const common_1 = __webpack_require__("@nestjs/common");
const mongoose_1 = __webpack_require__("@nestjs/mongoose");
const bcrypt = __webpack_require__("bcryptjs");
const mongoose_2 = __webpack_require__("mongoose");
const role_enum_1 = __webpack_require__("./apps/riddet-api/src/app/auth/role.enum.ts");
const community_schema_1 = __webpack_require__("./apps/riddet-api/src/app/community/community.schema.ts");
const community_service_1 = __webpack_require__("./apps/riddet-api/src/app/community/community.service.ts");
const validation_exception_1 = __webpack_require__("./apps/riddet-api/src/app/shared/filters/validation.exception.ts");
const user_schema_1 = __webpack_require__("./apps/riddet-api/src/app/user/user.schema.ts");
let UserService = class UserService {
    constructor(userModel, communityModel, communityService) {
        this.userModel = userModel;
        this.communityModel = communityModel;
        this.communityService = communityService;
    }
    findByUsernameOrEmail(username) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            return yield this.userModel.findOne({ $or: [{ username }, { email: username }] });
        });
    }
    getById(_id) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            yield this.doesExist(_id);
            return (yield this.userModel.aggregate([
                { $match: { "_id": new mongoose_2.Types.ObjectId(_id) } },
                { $lookup: {
                        from: "users",
                        localField: "following",
                        foreignField: "_id",
                        as: "following"
                    } },
                { $lookup: {
                        from: "users",
                        localField: "followers",
                        foreignField: "_id",
                        as: "followers"
                    } },
                { $unset: ["password", "__v"] }
            ]))[0];
        });
    }
    getAll() {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            return yield this.userModel.aggregate([
                { $lookup: {
                        from: "users",
                        localField: "following",
                        foreignField: "_id",
                        as: "following"
                    } },
                { $lookup: {
                        from: "users",
                        localField: "followers",
                        foreignField: "_id",
                        as: "followers"
                    } },
                { $unset: ["password", "__v"] }
            ]);
        });
    }
    create(createUserDto) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            yield this.validate(createUserDto);
            createUserDto.dateOfBirth = new Date(createUserDto.dateOfBirth);
            createUserDto.dateOfBirth.setHours(createUserDto.dateOfBirth.getHours() + 1);
            const mergedUser = Object.assign(Object.assign({}, createUserDto), { creationDate: new Date(), isActive: true, roles: [role_enum_1.Role.User], password: yield bcrypt.hashSync(createUserDto.password, 10) });
            const user = yield new this.userModel(mergedUser).save();
            //TODO: add to neo4j
            //   await this.neo4jService.write(`
            //   CREATE
            //   (n:User {
            //   id: '${user._id.toString()}',
            //   username: '${user.username}', 
            //   dateOfBirth: '${user.dateOfBirth.toISOString()}'
            //  })`,
            // {});
            return user;
        });
    }
    update(updateUserId, user, req) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            yield this.doesExist(updateUserId);
            const currentUser = req.user;
            if ((yield this.isMyData(updateUserId, currentUser.id)) || currentUser.roles.includes(role_enum_1.Role.Admin)) {
                yield this.validate(user, currentUser.id, updateUserId);
                if (user.dateOfBirth) {
                    user.dateOfBirth = new Date(user.dateOfBirth);
                    user.dateOfBirth.setHours(user.dateOfBirth.getHours() + 1);
                }
                if (user.password) {
                    user.password = yield bcrypt.hashSync(user.password, 10);
                }
                //update embedded users
                yield this.communityService.updateCreator(updateUserId, Object.assign(Object.assign({}, (yield this.userModel.findOne({ _id: updateUserId })).toObject()), user));
                return this.userModel.findOneAndUpdate({ _id: updateUserId }, user, { new: true });
            }
            throw new validation_exception_1.ValidationException([`You cannot update other users!`]);
        });
    }
    //following related methods
    follow(followUserId, req) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            yield this.doesExist(followUserId);
            if (yield this.isMyData(followUserId, req.user.id)) {
                throw new validation_exception_1.ValidationException([`You cannot follow yourself!`]);
            }
            if ((yield (yield this.userModel.find({ $and: [{ _id: req.user.id }, { following: { $in: followUserId } }] })).length) > 0) {
                throw new validation_exception_1.ValidationException([`You already follow this person!`]);
            }
            const user = yield this.userModel.findOneAndUpdate({ _id: req.user.id }, { $push: { following: followUserId } }, { new: true });
            const otherUser = yield this.userModel.findOneAndUpdate({ _id: followUserId }, { $push: { followers: req.user.id } }, { new: true });
            return [user, otherUser];
        });
    }
    unfollow(followUserId, req) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            yield this.doesExist(followUserId);
            if (yield this.isMyData(followUserId, req.user.id)) {
                throw new validation_exception_1.ValidationException([`You cannot unfollow yourself!`]);
            }
            if ((yield (yield this.userModel.find({ $and: [{ _id: req.user.id }, { following: { $in: followUserId } }] })).length) === 0) {
                throw new validation_exception_1.ValidationException([`You don't follow this person!`]);
            }
            const user = yield this.userModel.findOneAndUpdate({ _id: req.user.id }, { $pull: { following: followUserId } }, { new: true });
            const otherUser = yield this.userModel.findOneAndUpdate({ _id: followUserId }, { $pull: { followers: req.user.id } }, { new: true });
            return [user, otherUser];
        });
    }
    //community arrays
    addJoinedCommunity(userId, communityId) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            yield this.doesExist(userId);
            return yield this.userModel.findOneAndUpdate({ _id: userId }, { $push: { joinedCommunities: communityId } }, { new: true });
        });
    }
    removeJoinedCommunity(userId, communityId) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            yield this.doesExist(userId);
            return yield this.userModel.findOneAndUpdate({ _id: userId }, { $pull: { joinedCommunities: communityId } }, { new: true });
        });
    }
    //community array fillers
    addCreatedCommunity(userId, communityId) {
        var e_1, _a;
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            yield this.doesExist(userId);
            const user = yield this.userModel.findOne({ _id: userId });
            try {
                for (var _b = tslib_1.__asyncValues(user.createdCommunities), _c; _c = yield _b.next(), !_c.done;) {
                    const createdCommunityId = _c.value;
                    yield this.communityModel.updateMany({ _id: createdCommunityId, "createdBy._id": new mongoose_2.Types.ObjectId(userId) }, { $push: { "createdBy.$[_id]createdCommunities": communityId } });
                }
            }
            catch (e_1_1) { e_1 = { error: e_1_1 }; }
            finally {
                try {
                    if (_c && !_c.done && (_a = _b.return)) yield _a.call(_b);
                }
                finally { if (e_1) throw e_1.error; }
            }
            return yield this.userModel.findOneAndUpdate({ _id: userId }, { $push: { createdCommunities: communityId } }, { new: true });
        });
    }
    removeCreatedCommunity(userId, communityId) {
        var e_2, _a;
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            yield this.doesExist(userId);
            const user = yield this.userModel.findOne({ _id: userId });
            try {
                for (var _b = tslib_1.__asyncValues(user.createdCommunities), _c; _c = yield _b.next(), !_c.done;) {
                    const createdCommunityId = _c.value;
                    yield this.communityModel.updateMany({ _id: createdCommunityId, "createdBy._id": new mongoose_2.Types.ObjectId(userId) }, { $pull: { "createdBy.$[_id]createdCommunities": communityId } });
                }
            }
            catch (e_2_1) { e_2 = { error: e_2_1 }; }
            finally {
                try {
                    if (_c && !_c.done && (_a = _b.return)) yield _a.call(_b);
                }
                finally { if (e_2) throw e_2.error; }
            }
            return yield this.userModel.findOneAndUpdate({ _id: userId }, { $pull: { createdCommunities: communityId } }, { new: true });
        });
    }
    //validation
    validate(user, currentUserId, updateUserId) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            if ((yield this.userModel.find({
                $or: [
                    { username: user.username },
                    { email: user.email }
                ]
            })).length > 0 && !(yield this.isMyData(currentUserId, updateUserId))) {
                throw new common_1.HttpException(`Username or email is already in use!`, common_1.HttpStatus.BAD_REQUEST);
            }
            if (new Date(user.dateOfBirth) > new Date()) {
                throw new common_1.HttpException(`Date of birth cannot be in the future!`, common_1.HttpStatus.BAD_REQUEST);
            }
        });
    }
    isMyData(currentUserId, targetUserId) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            return new mongoose_2.Types.ObjectId(currentUserId).equals(new mongoose_2.Types.ObjectId(targetUserId));
        });
    }
    doesExist(userId) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const user = yield this.userModel.findOne({ _id: userId });
            if (!user) {
                throw new common_1.HttpException(`User with id of ${userId} doesn't exist!`, common_1.HttpStatus.BAD_REQUEST);
            }
        });
    }
};
UserService = tslib_1.__decorate([
    (0, common_1.Injectable)(),
    tslib_1.__param(0, (0, mongoose_1.InjectModel)(user_schema_1.User.name)),
    tslib_1.__param(1, (0, mongoose_1.InjectModel)(community_schema_1.Community.name)),
    tslib_1.__param(2, (0, common_1.Inject)((0, common_1.forwardRef)(() => community_service_1.CommunityService))),
    tslib_1.__metadata("design:paramtypes", [typeof (_a = typeof mongoose_2.Model !== "undefined" && mongoose_2.Model) === "function" ? _a : Object, typeof (_b = typeof mongoose_2.Model !== "undefined" && mongoose_2.Model) === "function" ? _b : Object, typeof (_c = typeof community_service_1.CommunityService !== "undefined" && community_service_1.CommunityService) === "function" ? _c : Object])
], UserService);
exports.UserService = UserService;


/***/ }),

/***/ "./apps/riddet-api/src/environments/environment.prod.ts":
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.environment = void 0;
exports.environment = {
    production: true,
    //DIT IS LOKAAL
    // DATABASE_CONNECTION: 'mongodb://127.0.0.1:27017/riddet',
    DATABASE_CONNECTION: 'mongodb://mvdc2000:jhbhaAO95BxY4anP@ac-i23cy8u-shard-00-00.ryvfhc9.mongodb.net:27017,ac-i23cy8u-shard-00-01.ryvfhc9.mongodb.net:27017,ac-i23cy8u-shard-00-02.ryvfhc9.mongodb.net:27017/?ssl=true&replicaSet=atlas-zx8v9h-shard-0&authSource=admin&retryWrites=true&w=majority',
    //NEO4J
    NEO4J_HOST: 'localhost',
    NEO4J_PORT: 7687,
    NEO4J_USERNAME: 'neo4j',
    NEO4J_PASSWORD: 'neo',
};


/***/ }),

/***/ "@nestjs/common":
/***/ ((module) => {

module.exports = require("@nestjs/common");

/***/ }),

/***/ "@nestjs/core":
/***/ ((module) => {

module.exports = require("@nestjs/core");

/***/ }),

/***/ "@nestjs/jwt":
/***/ ((module) => {

module.exports = require("@nestjs/jwt");

/***/ }),

/***/ "@nestjs/mongoose":
/***/ ((module) => {

module.exports = require("@nestjs/mongoose");

/***/ }),

/***/ "@nestjs/passport":
/***/ ((module) => {

module.exports = require("@nestjs/passport");

/***/ }),

/***/ "bcryptjs":
/***/ ((module) => {

module.exports = require("bcryptjs");

/***/ }),

/***/ "class-validator":
/***/ ((module) => {

module.exports = require("class-validator");

/***/ }),

/***/ "mongodb":
/***/ ((module) => {

module.exports = require("mongodb");

/***/ }),

/***/ "mongoose":
/***/ ((module) => {

module.exports = require("mongoose");

/***/ }),

/***/ "passport-jwt":
/***/ ((module) => {

module.exports = require("passport-jwt");

/***/ }),

/***/ "passport-local":
/***/ ((module) => {

module.exports = require("passport-local");

/***/ }),

/***/ "tslib":
/***/ ((module) => {

module.exports = require("tslib");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
(() => {
var exports = __webpack_exports__;

Object.defineProperty(exports, "__esModule", ({ value: true }));
const tslib_1 = __webpack_require__("tslib");
const common_1 = __webpack_require__("@nestjs/common");
const core_1 = __webpack_require__("@nestjs/core");
const app_module_1 = __webpack_require__("./apps/riddet-api/src/app/app.module.ts");
const validation_exception_1 = __webpack_require__("./apps/riddet-api/src/app/shared/filters/validation.exception.ts");
const validation_filter_1 = __webpack_require__("./apps/riddet-api/src/app/shared/filters/validation.filter.ts");
function bootstrap() {
    return tslib_1.__awaiter(this, void 0, void 0, function* () {
        const app = yield core_1.NestFactory.create(app_module_1.AppModule);
        const globalPrefix = 'api';
        app.setGlobalPrefix(globalPrefix);
        app.enableCors();
        const port = process.env.PORT || 9000;
        app.useGlobalFilters(new validation_filter_1.ValidationFilter());
        app.useGlobalPipes(new common_1.ValidationPipe({
            skipMissingProperties: true,
            exceptionFactory: (errors) => {
                const messages = errors.map(error => `${error.property} has wrong value: ${error.value}, ${Object.values(error.constraints).join(', ')}`);
                return new validation_exception_1.ValidationException(messages);
            }
        }));
        yield app.listen(port);
        common_1.Logger.log(`🚀 Application is running on: http://localhost:${port}/${globalPrefix}`);
    });
}
bootstrap();

})();

var __webpack_export_target__ = exports;
for(var i in __webpack_exports__) __webpack_export_target__[i] = __webpack_exports__[i];
if(__webpack_exports__.__esModule) Object.defineProperty(__webpack_export_target__, "__esModule", { value: true });
/******/ })()
;
//# sourceMappingURL=main.js.map
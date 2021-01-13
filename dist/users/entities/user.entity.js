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
exports.User = void 0;
const typeorm_1 = require("typeorm");
const core_entity_1 = require("../../common/entities/core.entity");
const graphql_1 = require("@nestjs/graphql");
const bcrypt = require("bcrypt");
const common_1 = require("@nestjs/common");
const class_validator_1 = require("class-validator");
var UserRole;
(function (UserRole) {
    UserRole[UserRole["Host"] = 0] = "Host";
    UserRole[UserRole["Listener"] = 1] = "Listener";
})(UserRole || (UserRole = {}));
graphql_1.registerEnumType(UserRole, { name: "UserRole" });
let User = class User extends core_entity_1.CoreEntity {
    async hashPassword() {
        if (this.password) {
            try {
                this.password = await bcrypt.hash(this.password, 10);
            }
            catch (e) {
                console.log(e);
                throw new common_1.InternalServerErrorException();
            }
        }
    }
    async checkPassword(aPassword) {
        try {
            const ok = await bcrypt.compare(aPassword, this.password);
            return ok;
        }
        catch (e) {
            console.log(e);
            throw new common_1.InternalServerErrorException();
        }
    }
};
__decorate([
    typeorm_1.Column(),
    graphql_1.Field(type => String),
    __metadata("design:type", String)
], User.prototype, "email", void 0);
__decorate([
    typeorm_1.Column({ select: false }),
    graphql_1.Field(type => String),
    __metadata("design:type", String)
], User.prototype, "password", void 0);
__decorate([
    typeorm_1.Column({ type: 'simple-enum', enum: UserRole }),
    graphql_1.Field(type => UserRole),
    class_validator_1.IsEnum(UserRole),
    __metadata("design:type", Number)
], User.prototype, "role", void 0);
__decorate([
    typeorm_1.Column({ default: false }),
    graphql_1.Field(type => Boolean),
    __metadata("design:type", Boolean)
], User.prototype, "verified", void 0);
__decorate([
    typeorm_1.BeforeInsert(),
    typeorm_1.BeforeUpdate(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], User.prototype, "hashPassword", null);
User = __decorate([
    graphql_1.InputType({ isAbstract: true }),
    graphql_1.ObjectType(),
    typeorm_1.Entity()
], User);
exports.User = User;
//# sourceMappingURL=user.entity.js.map
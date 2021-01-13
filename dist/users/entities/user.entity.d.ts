import { CoreEntity } from "../../common/entities/core.entity";
declare enum UserRole {
    Host = 0,
    Listener = 1
}
export declare class User extends CoreEntity {
    email: string;
    password: string;
    role: UserRole;
    verified: boolean;
    hashPassword(): Promise<void>;
    checkPassword(aPassword: string): Promise<boolean>;
}
export {};

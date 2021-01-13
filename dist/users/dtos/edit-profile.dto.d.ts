import { CoreOutput } from "../../common/dtos/output.dto";
import { User } from "../entities/user.entity";
export declare class EditProfileOutput extends CoreOutput {
}
declare const EditProfileInput_base: import("@nestjs/common").Type<Partial<Pick<User, "id" | "createAt" | "updateAt" | "email" | "password" | "role" | "verified" | "hashPassword" | "checkPassword">>>;
export declare class EditProfileInput extends EditProfileInput_base {
}
export {};
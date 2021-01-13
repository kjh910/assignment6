import { User } from "./entities/user.entity";
import { UsersService } from "./users.service";
import { CreateAccountOutput, CreateAccountInput } from "./dtos/create-account-dto";
import { LoginInput, LoginOutput } from "./dtos/login.dto";
import { UserProfileInput, UserProfileOutput } from "./dtos/user-profile.dto";
import { EditProfileOutput, EditProfileInput } from "./dtos/edit-profile.dto";
import { VerifyEmailOutput, VerifyEmailInput } from "./dtos/verify-email.dto";
export declare class UsersResolver {
    private readonly usersService;
    constructor(usersService: UsersService);
    createAccount(createAccountInput: CreateAccountInput): Promise<CreateAccountOutput>;
    login(loginInput: LoginInput): Promise<LoginOutput>;
    me(authUser: User): User;
    seeProfile(userProfileInput: UserProfileInput): Promise<UserProfileOutput>;
    editProfile(authUser: User, editProfileInput: EditProfileInput): Promise<EditProfileOutput>;
    verifyEmail({ code }: VerifyEmailInput): Promise<VerifyEmailOutput>;
}

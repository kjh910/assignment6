import { NestMiddleware } from "@nestjs/common";
import { NextFunction, Request, Response } from "express";
import { JwtService } from "./jwt.service";
import { UsersService } from "src/users/users.service";
export declare class JwtMiddleware implements NestMiddleware {
    private readonly jwtService;
    private readonly usersService;
    constructor(jwtService: JwtService, usersService: UsersService);
    use(req: Request, res: Response, next: NextFunction): Promise<void>;
}

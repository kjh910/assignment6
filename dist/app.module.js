"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppModule = void 0;
const common_1 = require("@nestjs/common");
const app_controller_1 = require("./app.controller");
const app_service_1 = require("./app.service");
const Joi = require("joi");
const config_1 = require("@nestjs/config");
const graphql_1 = require("@nestjs/graphql");
const podcasts_module_1 = require("./podcast/podcasts.module");
const typeorm_1 = require("@nestjs/typeorm");
const podcast_entity_1 = require("./podcast/entities/podcast.entity");
const episode_entity_1 = require("./podcast/entities/episode.entity");
const user_entity_1 = require("./users/entities/user.entity");
const verification_entity_1 = require("./users/entities/verification.entity");
const users_module_1 = require("./users/users.module");
const jwt_module_1 = require("./jwt/jwt.module");
const jwt_middleware_1 = require("./jwt/jwt.middleware");
let AppModule = class AppModule {
    configure(consumer) {
        consumer.apply(jwt_middleware_1.JwtMiddleware).forRoutes({
            path: "/graphql",
            method: common_1.RequestMethod.ALL,
        });
    }
};
AppModule = __decorate([
    common_1.Module({
        imports: [
            config_1.ConfigModule.forRoot({
                isGlobal: true,
                envFilePath: process.env.NODE_ENV === 'dev' ? '.dev.env' : '.test.env',
                ignoreEnvFile: process.env.NODE_ENV === 'prod',
                validationSchema: Joi.object({
                    NODE_ENV: Joi.string().valid('dev', 'prod').required(),
                    PRIVATE_KEY: Joi.string().required(),
                })
            }),
            typeorm_1.TypeOrmModule.forRoot({
                type: 'sqlite',
                database: 'db.sqlite3',
                synchronize: true,
                logging: true,
                entities: [podcast_entity_1.Podcast, episode_entity_1.Episode, user_entity_1.User, verification_entity_1.Verification],
            }),
            graphql_1.GraphQLModule.forRoot({
                autoSchemaFile: true,
                context: ({ req }) => ({ user: req['user'] })
            }),
            podcasts_module_1.PodcastsModule,
            users_module_1.UsersModule,
            jwt_module_1.JwtModule.forRoot({
                privateKey: process.env.PRIVATE_KEY,
            }),
        ],
        controllers: [app_controller_1.AppController],
        providers: [app_service_1.AppService],
    })
], AppModule);
exports.AppModule = AppModule;
//# sourceMappingURL=app.module.js.map
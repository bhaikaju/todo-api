import { PassportStrategy } from "@nestjs/passport";
import { ExtractJwt, Strategy } from "passport-jwt";
import { InjectRepository } from "@nestjs/typeorm";
import { UserEntity } from "../Entity/user.entity";
import { Repository } from "typeorm";
import { UnauthorizedException } from "@nestjs/common";

export class JwtCustomStrategy extends PassportStrategy(Strategy) {
  constructor(@InjectRepository(UserEntity) private repo: Repository<UserEntity>) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: 'LOijtrkljdklsufidsui12jkj43k21l4'
    });
  }

  async validate(payload: {username: string}) {
    const {username} = payload;
    const user = await this.repo.findOne({username});

    if (!user) {
      throw new UnauthorizedException();
    }
    return user;
  }
}

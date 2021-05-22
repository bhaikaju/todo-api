import { Module } from "@nestjs/common";
import { TodoController } from "./todo.controller";
import { TodoService } from "./todo.service";
import { TypeOrmModule } from "@nestjs/typeorm";
import { TodoEntity } from "../Entity/todo.entity";
import { AuthModule } from "../auth/auth.module";

@Module({
  imports: [
    TypeOrmModule.forFeature([TodoEntity]),
    AuthModule
  ],
  controllers: [TodoController],
  providers: [TodoService]
})
export class TodoModule {
}

import { Body, Controller, Delete, Get, Param, Patch, Post, UseGuards, ValidationPipe } from "@nestjs/common";
import { TodoService } from "./todo.service";
import { CreateTodoDto } from "../DTO/create-todo.dto";
import { TodoStatus } from "../Entity/todo.entity";
import { TodoStatusValidationPipe } from "../pipes/TodoStatusValidation.pipe";
import { AuthGuard } from "@nestjs/passport";
import { User } from "../auth/user.decorator";
import { UserEntity } from "../Entity/user.entity";

// http://localhost:3000/api/todos
@Controller("todos")
@UseGuards(AuthGuard())
export class TodoController {
  constructor(private todoService: TodoService) {
  }

  // http GET verb
  @Get()
  getAllTodos(
    @User() user: UserEntity
  ) {
    // console.log(this.todoService.getAllTodos());

    return this.todoService.getAllTodos(user);
  }

  // http POST verb
  @Post()
  createNewTodo(@Body(ValidationPipe) data: CreateTodoDto,
                @User() user: UserEntity
  ) {

    return this.todoService.createTodo(data, user);
  }

  @Patch(":id")
  updateTodo(
    @Body("status", TodoStatusValidationPipe) status: TodoStatus,
    @Param("id") id: number,
    @User() user: UserEntity
  ) {
    return this.todoService.update(id, status, user);
  }

  @Delete(":id")
  deleteTodo(@Param("id") id: number,
             @User() user: UserEntity) {
    return this.todoService.delete(id, user);
  }

}

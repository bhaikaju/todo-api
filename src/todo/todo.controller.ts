import {
  Body, ClassSerializerInterceptor,
  Controller, Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  UseInterceptors,
  ValidationPipe
} from "@nestjs/common";
import { TodoService } from "./todo.service";
import { CreateTodoDto } from "../DTO/create-todo.dto";
import { TodoStatus } from "../Entity/todo.entity";
import { stat } from "fs";
import { TodoStatusValidationPipe } from "../pipes/TodoStatusValidation.pipe";

// http://localhost:3000/api/todos
@UseInterceptors(ClassSerializerInterceptor)
@Controller("todos")
export class TodoController {
  constructor(private todoService: TodoService) {
  }

  // http GET verb
  @Get()
  getAllTodos() {
    // console.log(this.todoService.getAllTodos());
    return this.todoService.getAllTodos();
  }

  // http POST verb
  @Post()
  createNewTodo(@Body(ValidationPipe) data: CreateTodoDto) {

    return this.todoService.createTodo(data);
  }

  @Patch(':id')
  updateTodo(
    @Body('status', TodoStatusValidationPipe) status: TodoStatus,
    @Param('id') id: number
  ) {
      return this.todoService.update(id, status);
  }

  @Delete(':id')
  deleteTodo(@Param('id') id: number) {
    return this.todoService.delete(id);
  }

}

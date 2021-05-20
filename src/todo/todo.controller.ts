import { Body, Controller, Get, Post, ValidationPipe } from "@nestjs/common";
import { TodoService } from "./todo.service";
import { CreateTodoDto } from "../DTO/create-todo.dto";

// http://localhost:3000/api/todos
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

}

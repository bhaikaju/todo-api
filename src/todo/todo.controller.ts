import { Body, Controller, Get, Post } from "@nestjs/common";
import { TodoService } from "./todo.service";

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

  @Post()
  createNewTodo(@Body() data) {
    const {title, description} = data;

    return this.todoService.createTodo(title, description);
  }

}

import { Injectable, InternalServerErrorException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { TodoEntity, TodoStatus } from "../Entity/todo.entity";
import { Repository } from "typeorm";
import { CreateTodoDto } from "../DTO/create-todo.dto";

@Injectable()
export class TodoService {

  constructor(@InjectRepository(TodoEntity) private repo: Repository<TodoEntity>) {
  }


  async getAllTodos() {
    return await this.repo.find();
  }

  async createTodo(createTodoDTO: CreateTodoDto){
    const todo = new TodoEntity();
    const {title, description} = createTodoDTO;
    todo.title = title;
    todo.description = description;
    todo.status = TodoStatus.OPEN;

    this.repo.create(todo);
    try {
      return await this.repo.save(todo);
    } catch (err) {
      throw new InternalServerErrorException('Something went wrong, todo not created');
    }

  }


  async update(id: number, status: TodoStatus) {
    try {
      await this.repo.update({id}, {status});
      return this.repo.findOne({id});
    } catch (err) {
      throw new InternalServerErrorException('Something went wrong');
    }

  }

  async delete(id: number) {
    try {
      return await this.repo.delete({id});
    } catch (err) {
      throw new InternalServerErrorException('Something went wrong');
    }


  }
}

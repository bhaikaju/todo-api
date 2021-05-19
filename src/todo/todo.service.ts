import { Injectable } from '@nestjs/common';

@Injectable()
export class TodoService {

  getAllTodos() {
    return ['Todo1', 'Todo2'];
  }

}

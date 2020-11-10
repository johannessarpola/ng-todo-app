import { Component, OnInit } from '@angular/core';
import { Todo, TodoApiService } from 'todo-api';
import { Observable, Subject } from 'rxjs';
import { map, tap } from 'rxjs/operators';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  todos: Observable<Todo[]>;
  newTodos: Subject<Todo>;
  savedTodos: Subject<Todo>;

  title = 'todo-app';

  constructor(private todoService: TodoApiService) {}

  ngOnInit(): void {
    this.todos = this.todoService.searchTodos('', 0, 0);

    this.newTodos.subscribe(e => {
      const id: Observable<string> = this.todoService.createTodo(e);
      id.pipe(
        map((id) => {
          e.id = id;
          return e;
        }),
        tap(t => this.savedTodos.next(t) )
       );

    });


  }

  newTodo(): void {
    const todo = {
      title: "title created",
      description: "created description",
      done: false
    } as Todo;
    this.newTodos.next(todo);
  }
}

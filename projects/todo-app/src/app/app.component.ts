import { Component, OnInit } from '@angular/core';
import { Todo, TodoApiService } from 'todo-api';
import { Observable, Subject } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  todos: Observable<Todo[]>;
  newTodos: Subject<Todo> = new Subject<Todo>();
  savedTodos: Subject<Todo> = new Subject<Todo>();

  title = 'todo-app';

  constructor(private todoService: TodoApiService) { }

  ngOnInit(): void {
    this.todos = this.todoService.searchTodos('', 0, 0);

    this.newTodos.subscribe({
      next: (e) => {
        console.log("next");
        console.log(e);
        const id: Observable<string[]> = this.todoService.createTodo(e as Todo);
        id.pipe(
          tap(e => console.log(e)),
          map((id) => {
            e.id = id[0]; // TODO ???
            return e;
          }),
          tap(t => this.savedTodos.next(t)),
          catchError(err => {
            console.log(err);
            return [];
          })
        );
      }
    });
  }

  newTodo(): void {
    console.log("newTodo")
    const todo = {
      title: "title created",
      description: "created description",
      done: false
    } as Todo;
    this.newTodos.next(todo);
  }
}

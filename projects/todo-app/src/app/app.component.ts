import { Component } from '@angular/core';
import { Todo, TodoApiService } from 'todo-api';
import { Observable } from 'rxjs';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  todos: Observable<Todo[]>;
  title = 'todo-app';

  constructor(private todoService: TodoApiService) {}


  ngOnInit(): void {
    this.todos = this.todoService.searchTodos('', 0, 0);
    console.log("ngOnInit");
  }
}
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { Todo, TodoApiServiceConfiguration } from './todo-api-models';

@Injectable()
export class TodoApiService {

  address: string

  constructor(private http: HttpClient, private todoConf: TodoApiServiceConfiguration) {
    this.address = `http://${this.todoConf.host}:${this.todoConf.port}/`
  }

  public searchTodos(query: string, pageSize: number, page: number): Observable<Todo[]> {
    return this.http.get<Todo[]>(`${this.address}/todo/list`).pipe(
      catchError( (e) => {
        console.error(e);
        return [];
      })
    );

  }

  public createTodos(todo: Todo){
    this.http.post<Todo>(`${this.address}/todo/create`).pipe(
      catchError((e) => {
        console.error(e);
        return {} // TODO?
      })
    )
  }
}

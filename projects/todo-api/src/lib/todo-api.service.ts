import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { Todo, TodoApiServiceConfiguration } from './todo-api-models';

@Injectable()
export class TodoApiService {

  constructor(private http: HttpClient, private todoConf: TodoApiServiceConfiguration) {}

  public searchTodos(query: string, pageSize: number, page: number): Observable<Todo[]> {
    return this.http.get<Todo[]>(`http://${this.todoConf.host}:${this.todoConf.port}/todo/list`).pipe(
      catchError( (e) => { 
        console.error(e);
        return [];
      })
    );

  }
}

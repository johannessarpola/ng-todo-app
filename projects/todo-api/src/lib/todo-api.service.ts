import { Injectable } from '@angular/core';
import { Observable, from } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import * as request from 'superagent';
import { Todo, TodoApiServiceConfiguration } from './todo-api-models';

@Injectable()
export class TodoApiService {

  constructor(private http: HttpClient, private todoConf: TodoApiServiceConfiguration) {
    console.log("TodoApiService.constructor");
  }

  public searchTodos(query: string, pageSize: number, page: number): Observable<Todo[]> {
    console.log("searchTodos");
    console.log(`${this.todoConf.host}:${this.todoConf.port}/todo/list`);
    // const response = request.get(`http://${this.todoConf.host}:${this.todoConf.port}/todo/list`)
    //   .withCredentials()
    //   .then((res) => {
    //     return res.body as Todo[];
    //   });
    return this.http.get<Todo[]>(`http://${this.todoConf.host}:${this.todoConf.port}/todo/list`).pipe(
      tap((e) => console.log(e)),
      catchError( (e) => { 
        console.error(e);
        return [];
      })
    );

  }
}

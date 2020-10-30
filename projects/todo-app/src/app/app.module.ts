import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { TodoApiServiceConfiguration, TodoApiService } from 'todo-api';
import { environment } from '../environments/environment';
import { HttpClientModule } from '@angular/common/http';
import { TodoUiComponentsModule } from 'projects/todo-ui-components/src/public-api';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    TodoUiComponentsModule
  ],
  providers: [
    {
      provide: TodoApiServiceConfiguration,
      useFactory: getTodoApiConfiguration,
    },
    TodoApiService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

export function getTodoApiConfiguration(): TodoApiServiceConfiguration {
  return new TodoApiServiceConfiguration(environment.todoApiUrl, environment.todoApiPort);
};

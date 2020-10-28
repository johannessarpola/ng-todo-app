import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TodoApiComponent } from './todo-api.component';

describe('TodoApiComponent', () => {
  let component: TodoApiComponent;
  let fixture: ComponentFixture<TodoApiComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TodoApiComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TodoApiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

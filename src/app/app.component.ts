import { Component, OnInit } from '@angular/core';

export interface Task {
  id: number;
  taskLabel: string;
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  private __storageKey: string = 'tasks';

  taskInput: string = '';
  tasks: Task[] = [];

  constructor() { }

  isNullEmptyStr(str: string): boolean {
    return str === undefined || str == null || str == '';
  }

  ngOnInit() {
    const storage = window.localStorage;
    let itemsStr: string = storage.getItem(this.__storageKey);
    if (!this.isNullEmptyStr(itemsStr)) {
      try {
        this.tasks = JSON.parse(itemsStr);
      } catch (e) {
        this.tasks = [];
      }
    }
  }

  generateRandomId(): number {
    return new Date().getTime();
  }

  persistList(): void {
    const storage = window.localStorage;
    storage.setItem(this.__storageKey, JSON.stringify(this.tasks));
  }

  addTask(): void {
    if (!this.isNullEmptyStr(this.taskInput)) {
      this.tasks.push({ id: this.generateRandomId(), taskLabel: this.taskInput });
      this.taskInput = '';
      this.persistList();
    }
  }

  deleteTask(id: number): void {
    this.tasks.forEach((task: Task, index: number, arr: Task[]) => {
      if (task.id == id) {
        arr.splice(index, 1);
      }
    });
    this.persistList();
  }

}

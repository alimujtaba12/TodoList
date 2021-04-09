import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.scss']
})
export class TodoListComponent implements OnInit {

  constructor() { }

  public items: Task[] = [];
  public newTask: string;
  public taskLeft: number = 0;

  ngOnInit(): void {
    if (JSON.parse(localStorage.getItem('task'))) {
      this.items = JSON.parse(localStorage.getItem('task'));
      this.taskLeft = this.items?.length;
      this.items.forEach((item) => {
        if (item.status) {
          this.taskLeft--
        }
      })
    }
  }

  public addToList() {
    if (this.newTask == '') {
    }
    else {
      this.items.push({ task: this.newTask, status: false });
      this.newTask = '';
      localStorage.setItem('task', JSON.stringify(this.items))
      this.taskLeft = this.items.length;
    }
  }
  public removeTask(index) {
    this.taskLeft--;
    this.items.splice(index, 1);
    localStorage.setItem('task', JSON.stringify(this.items));
  }
  public clearAll() {
    // this.items.forEach((item, index) => {
    //   if (item.status) {
    //     console.log(item, index)
    //     this.items.splice(index, 1)
    //   }
    // })
    for (var i = this.items.length - 1; i >= 0; i--) {
      if (this.items[i].status == true) {
        this.items.splice(this.items.indexOf(this.items[i]), 1);
      }
    }
    localStorage.setItem('task', JSON.stringify(this.items));
  }
  public checked(item) {
    if (item == true) {
      this.taskLeft--;
    } else {
      this.taskLeft++;
    }
    localStorage.setItem('task', JSON.stringify(this.items));
  }
}

export interface Task {
  task: string,
  status: boolean
}

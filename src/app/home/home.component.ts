import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Tasks } from '../models/tasks';
import { TasksService } from '../services/tasks.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.sass']
})
export class HomeComponent implements OnInit {

  task = {} as Tasks;
  taskList:any=[];

  constructor(public taskservice:TasksService) {}

  async ngOnInit(){
    await this.getAllTasks();
  }

  async getAllTasks(){
    await this.taskservice.getTasks().subscribe((tasks: Tasks[]) => {this.taskList = tasks; console.log(tasks);
    });
  }
  deleteTask(task: Tasks) {
    this.taskservice.deleteCar(task).subscribe(() => {
      this.getAllTasks();
    });
  }
  saveTask(form: NgForm) {
    if (this.task.id !== undefined) {
      this.taskservice.updateTask(this.task).subscribe(() => {
        this.cleanForm(form);
      });
    } else {
      console.log(this.task.taskDate);
      this.taskservice.saveTask(this.task).subscribe(() => {
        this.cleanForm(form);
      });
    }
  }
  cleanForm(form: NgForm) {
    this.getAllTasks();
    form.resetForm();
    this.task = {} as Tasks;
  }
  editTask(task: Tasks) {
    this.task = { ...task };
  }


}
